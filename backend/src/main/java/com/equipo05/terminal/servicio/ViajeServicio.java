package com.equipo05.terminal.servicio;

import com.equipo05.terminal.dto.peticion.ViajePeticion;
import com.equipo05.terminal.dto.respuesta.PaginaRespuesta;
import com.equipo05.terminal.dto.respuesta.ViajeRespuesta;
import com.equipo05.terminal.excepcion.DatosInvalidosExcepcion;
import com.equipo05.terminal.excepcion.RecursoNoEncontradoExcepcion;
import com.equipo05.terminal.modelo.Viaje;
import com.equipo05.terminal.repositorio.AutobusRepositorio;
import com.equipo05.terminal.repositorio.BoletoRepositorio;
import com.equipo05.terminal.repositorio.ChoferRepositorio;
import com.equipo05.terminal.repositorio.RutaRepositorio;
import com.equipo05.terminal.repositorio.ViajeRepositorio;
import com.equipo05.terminal.util.Texto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ViajeServicio {

    private final ViajeRepositorio viajeRepositorio;
    private final AutobusRepositorio autobusRepositorio;
    private final ChoferRepositorio choferRepositorio;
    private final RutaRepositorio rutaRepositorio;
    private final BoletoRepositorio boletoRepositorio;

    @Transactional(readOnly = true)
    public PaginaRespuesta<ViajeRespuesta> listar(String origen, String destino, String estado,
                                                  int pagina, int tamano) {
        return PaginaRespuesta.de(
                viajeRepositorio.buscar(Texto.limpiar(origen), Texto.limpiar(destino), Texto.limpiar(estado),
                        PaginaRespuesta.pedir(pagina, tamano, Sort.by("fechaSalida").ascending())),
                ViajeRespuesta::de);
    }

    @Transactional(readOnly = true)
    public ViajeRespuesta obtener(Long id) {
        return ViajeRespuesta.de(obtenerEntidad(id));
    }

    // aqui se regresan los asientos que ya estan tomados para pintar el mapa de asientos
    @Transactional(readOnly = true)
    public List<Integer> asientosOcupados(Long id) {
        obtenerEntidad(id);
        return boletoRepositorio.asientosOcupados(id);
    }

    @Transactional
    public ViajeRespuesta crear(ViajePeticion peticion) {
        Viaje viaje = new Viaje();
        copiarDatos(viaje, peticion);
        return ViajeRespuesta.de(viajeRepositorio.save(viaje));
    }

    @Transactional
    public ViajeRespuesta actualizar(Long id, ViajePeticion peticion) {
        Viaje viaje = obtenerEntidad(id);
        copiarDatos(viaje, peticion);
        return ViajeRespuesta.de(viaje);
    }

    @Transactional
    public void eliminar(Long id) {
        viajeRepositorio.delete(obtenerEntidad(id));
        viajeRepositorio.flush();
    }

    public Viaje obtenerEntidad(Long id) {
        return viajeRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Viaje no encontrado"));
    }

    // aqui se revisa que el viaje se pueda vender y que el asiento exista y este libre
    public void validarAsientoLibre(Viaje viaje, Integer asiento) {
        if (!"PROGRAMADO".equals(viaje.getEstado())) {
            throw new DatosInvalidosExcepcion("El viaje ya no está disponible para venta");
        }
        if (asiento > viaje.getAutobus().getCapacidad()) {
            throw new DatosInvalidosExcepcion("El asiento " + asiento + " no existe en este autobús");
        }
        if (boletoRepositorio.existsByViajeIdAndNumeroAsientoAndEstadoNot(viaje.getId(), asiento, "CANCELADO")) {
            throw new DatosInvalidosExcepcion("El asiento " + asiento + " ya está ocupado");
        }
    }

    private void copiarDatos(Viaje viaje, ViajePeticion peticion) {
        if (!peticion.fechaLlegada().isAfter(peticion.fechaSalida())) {
            throw new DatosInvalidosExcepcion("La llegada debe ser posterior a la salida");
        }
        viaje.setFechaSalida(peticion.fechaSalida());
        viaje.setFechaLlegada(peticion.fechaLlegada());
        viaje.setEstado(peticion.estado());
        viaje.setAutobus(autobusRepositorio.findById(peticion.autobusId())
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Autobús no encontrado")));
        viaje.setChofer(choferRepositorio.findById(peticion.choferId())
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Chofer no encontrado")));
        viaje.setRuta(rutaRepositorio.findById(peticion.rutaId())
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Ruta no encontrada")));
    }
}
