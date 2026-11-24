package com.equipo05.terminal.servicio;

import com.equipo05.terminal.dto.peticion.BoletoPeticion;
import com.equipo05.terminal.dto.respuesta.BoletoRespuesta;
import com.equipo05.terminal.dto.respuesta.PaginaRespuesta;
import com.equipo05.terminal.excepcion.AccesoDenegadoExcepcion;
import com.equipo05.terminal.excepcion.DatosInvalidosExcepcion;
import com.equipo05.terminal.excepcion.RecursoNoEncontradoExcepcion;
import com.equipo05.terminal.modelo.Boleto;
import com.equipo05.terminal.modelo.Taquillero;
import com.equipo05.terminal.modelo.Viaje;
import com.equipo05.terminal.repositorio.BoletoRepositorio;
import com.equipo05.terminal.repositorio.TaquilleroRepositorio;
import com.equipo05.terminal.util.Texto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BoletoServicio {

    private final BoletoRepositorio boletoRepositorio;
    private final TaquilleroRepositorio taquilleroRepositorio;
    private final ViajeServicio viajeServicio;

    // lista para admin y taquillero
    @Transactional(readOnly = true)
    public PaginaRespuesta<BoletoRespuesta> listar(String buscar, String estado, int pagina, int tamano) {
        return PaginaRespuesta.de(
                boletoRepositorio.buscar(Texto.limpiar(buscar), Texto.limpiar(estado),
                        PaginaRespuesta.pedir(pagina, tamano, Sort.by("id").descending())),
                BoletoRespuesta::de);
    }

    // lista para el cliente, solo ve los suyos
    @Transactional(readOnly = true)
    public PaginaRespuesta<BoletoRespuesta> misBoletos(String correo, int pagina, int tamano) {
        return PaginaRespuesta.de(
                boletoRepositorio.buscarDeCliente(correo,
                        PaginaRespuesta.pedir(pagina, tamano, Sort.by("id").descending())),
                BoletoRespuesta::de);
    }

    // aqui el taquillero vende un boleto directo en ventanilla
    @Transactional
    public BoletoRespuesta venderEnTaquilla(BoletoPeticion peticion, String correoTaquillero) {
        Taquillero taquillero = taquilleroRepositorio.findByUsuarioCorreo(correoTaquillero)
                .orElseThrow(() -> new AccesoDenegadoExcepcion("Solo los taquilleros pueden vender en ventanilla"));
        Viaje viaje = viajeServicio.obtenerEntidad(peticion.viajeId());

        Boleto boleto = armarBoleto(viaje, peticion.numeroAsiento());
        boleto.setTaquillero(taquillero);
        return BoletoRespuesta.de(boletoRepositorio.save(boleto));
    }

    // aqui se cancela un boleto (el cliente solo puede cancelar los suyos)
    @Transactional
    public BoletoRespuesta cancelar(Long id, String correo, boolean esPersonal) {
        Boleto boleto = boletoRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Boleto no encontrado"));

        if (!esPersonal) {
            boolean esSuyo = boleto.getReservacion() != null
                    && boleto.getReservacion().getCliente().getUsuario().getCorreo().equals(correo);
            if (!esSuyo) {
                throw new AccesoDenegadoExcepcion("Ese boleto no es tuyo");
            }
        }
        if ("CANCELADO".equals(boleto.getEstado())) {
            throw new DatosInvalidosExcepcion("El boleto ya estaba cancelado");
        }
        boleto.setEstado("CANCELADO");
        return BoletoRespuesta.de(boleto);
    }

    // aqui se crea el boleto en memoria despues de validar el asiento (lo usa tambien la reservacion)
    public Boleto armarBoleto(Viaje viaje, Integer asiento) {
        viajeServicio.validarAsientoLibre(viaje, asiento);

        Boleto boleto = new Boleto();
        boleto.setCodigo("BOL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        boleto.setNumeroAsiento(asiento);
        boleto.setPrecio(viaje.getRuta().getPrecioBase());
        boleto.setEstado("ACTIVO");
        boleto.setViaje(viaje);
        return boleto;
    }
}
