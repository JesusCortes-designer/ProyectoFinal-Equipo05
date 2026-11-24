package com.equipo05.terminal.dto.respuesta;

import com.equipo05.terminal.modelo.Boleto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record BoletoRespuesta(
        Long id,
        String codigo,
        Integer numeroAsiento,
        BigDecimal precio,
        String estado,
        Long viajeId,
        String origen,
        String destino,
        LocalDateTime fechaSalida,
        boolean vendidoEnTaquilla) {

    public static BoletoRespuesta de(Boleto b) {
        return new BoletoRespuesta(b.getId(), b.getCodigo(), b.getNumeroAsiento(), b.getPrecio(), b.getEstado(),
                b.getViaje().getId(), b.getViaje().getRuta().getOrigen(), b.getViaje().getRuta().getDestino(),
                b.getViaje().getFechaSalida(), b.getReservacion() == null);
    }
}
