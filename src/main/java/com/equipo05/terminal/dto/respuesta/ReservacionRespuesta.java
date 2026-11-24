package com.equipo05.terminal.dto.respuesta;

import com.equipo05.terminal.modelo.Reservacion;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record ReservacionRespuesta(
        Long id,
        LocalDateTime fechaReservacion,
        String estado,
        BigDecimal total,
        Long clienteId,
        String clienteNombre,
        List<BoletoRespuesta> boletos) {

    public static ReservacionRespuesta de(Reservacion r) {
        return new ReservacionRespuesta(r.getId(), r.getFechaReservacion(), r.getEstado(), r.getTotal(),
                r.getCliente().getId(),
                r.getCliente().getUsuario().getNombre() + " " + r.getCliente().getUsuario().getApellido(),
                r.getBoletos().stream().map(BoletoRespuesta::de).toList());
    }
}
