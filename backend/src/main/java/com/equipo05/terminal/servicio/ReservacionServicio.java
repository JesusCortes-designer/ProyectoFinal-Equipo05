package com.equipo05.terminal.servicio;

import com.equipo05.terminal.dto.peticion.ReservacionPeticion;
import com.equipo05.terminal.dto.respuesta.PaginaRespuesta;
import com.equipo05.terminal.dto.respuesta.ReservacionRespuesta;
import com.equipo05.terminal.excepcion.AccesoDenegadoExcepcion;
import com.equipo05.terminal.excepcion.DatosInvalidosExcepcion;
import com.equipo05.terminal.excepcion.RecursoNoEncontradoExcepcion;
import com.equipo05.terminal.modelo.Boleto;
import com.equipo05.terminal.modelo.Cliente;
import com.equipo05.terminal.modelo.Reservacion;
import com.equipo05.terminal.modelo.Viaje;
import com.equipo05.terminal.repositorio.ClienteRepositorio;
import com.equipo05.terminal.repositorio.ReservacionRepositorio;
import com.equipo05.terminal.util.Texto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.LinkedHashMap;
import java.util.Map;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.LinkedHashMap;

@Service
@RequiredArgsConstructor
public class ReservacionServicio {

    private final ReservacionRepositorio reservacionRepositorio;
    private final ClienteRepositorio clienteRepositorio;
    private final ViajeServicio viajeServicio;
    private final BoletoServicio boletoServicio;
    private final CorreoServicio correoServicio;
    private final SmsServicio smsServicio;
    private final WhatsappServicio whatsappServicio;

    // lista para el admin
    @Transactional(readOnly = true)
    public PaginaRespuesta<ReservacionRespuesta> listar(String estado, int pagina, int tamano) {
        return PaginaRespuesta.de(
                reservacionRepositorio.buscar(Texto.limpiar(estado),
                        PaginaRespuesta.pedir(pagina, tamano, Sort.by("id").descending())),
                ReservacionRespuesta::de);
    }

    // lista para el cliente, solo ve las suyas
    @Transactional(readOnly = true)
    public PaginaRespuesta<ReservacionRespuesta> misReservaciones(String correo, int pagina, int tamano) {
        return PaginaRespuesta.de(
                reservacionRepositorio.buscarDeCliente(correo,
                        PaginaRespuesta.pedir(pagina, tamano, Sort.by("id").descending())),
                ReservacionRespuesta::de);
    }

    // aqui el cliente reserva y se le avisa por correo, sms y whatsapp
    @Transactional
    public ReservacionRespuesta crear(ReservacionPeticion peticion, String correo) {
        Cliente cliente = clienteRepositorio.findByUsuarioCorreo(correo)
                .orElseThrow(() -> new AccesoDenegadoExcepcion("Solo los clientes pueden reservar"));
        Viaje viaje = viajeServicio.obtenerEntidad(peticion.viajeId());

        if (new HashSet<>(peticion.asientos()).size() != peticion.asientos().size()) {
            throw new DatosInvalidosExcepcion("Hay asientos repetidos en la reservación");
        }

        Reservacion reservacion = new Reservacion();
        reservacion.setFechaReservacion(LocalDateTime.now());
        reservacion.setEstado("CONFIRMADA");
        reservacion.setCliente(cliente);

        for (Integer asiento : peticion.asientos()) {
            Boleto boleto = boletoServicio.armarBoleto(viaje, asiento);
            boleto.setReservacion(reservacion);
            reservacion.getBoletos().add(boleto);
        }
        reservacion.setTotal(viaje.getRuta().getPrecioBase()
                .multiply(BigDecimal.valueOf(peticion.asientos().size())));
        reservacionRepositorio.save(reservacion);

        avisarAlCliente(cliente, viaje, reservacion);
        return ReservacionRespuesta.de(reservacion);
    }

    // aqui se cancela la reservacion y todos sus boletos
    @Transactional
    public ReservacionRespuesta cancelar(Long id, String correo, boolean esAdministrador) {
        Reservacion reservacion = reservacionRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Reservación no encontrada"));

        if (!esAdministrador && !reservacion.getCliente().getUsuario().getCorreo().equals(correo)) {
            throw new AccesoDenegadoExcepcion("Esa reservación no es tuya");
        }
        if ("CANCELADA".equals(reservacion.getEstado())) {
            throw new DatosInvalidosExcepcion("La reservación ya estaba cancelada");
        }
        reservacion.setEstado("CANCELADA");
        reservacion.getBoletos().forEach(b -> b.setEstado("CANCELADO"));
        return ReservacionRespuesta.de(reservacion);
    }

    // aqui se manda el mismo aviso por los 3 canales
    // aqui se manda el mismo aviso por los 3 canales
private void avisarAlCliente(Cliente cliente, Viaje viaje, Reservacion reservacion) {
    String asientos = reservacion.getBoletos().stream()
            .map(b -> String.valueOf(b.getNumeroAsiento())).reduce((a, b) -> a + ", " + b).orElse("");
    String resumen = "Reservación #" + reservacion.getId() + " confirmada: "
            + viaje.getRuta().getOrigen() + " a " + viaje.getRuta().getDestino()
            + ", sale el " + viaje.getFechaSalida().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"))
            + ", asientos " + asientos + ", total $" + reservacion.getTotal();

    String correo = cliente.getUsuario().getCorreo();
    String nombre = cliente.getUsuario().getNombre();
    String telefono = cliente.getTelefono();

    correoServicio.enviar(correo, "Reservación confirmada", "Hola " + nombre + ",\n" + resumen);
    smsServicio.enviar(telefono, resumen);

    Map<String, String> variables = new LinkedHashMap<>();
    variables.put("1", nombre);
    variables.put("2", String.valueOf(reservacion.getId()));
    variables.put("3", viaje.getRuta().getOrigen() + " a " + viaje.getRuta().getDestino());
    variables.put("4", viaje.getFechaSalida().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));
    variables.put("5", asientos);
    variables.put("6", String.valueOf(reservacion.getTotal()));
    whatsappServicio.enviar(telefono, resumen, variables);
}
}
