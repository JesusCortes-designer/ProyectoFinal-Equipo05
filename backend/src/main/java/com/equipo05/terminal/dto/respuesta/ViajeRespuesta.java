package com.equipo05.terminal.dto.respuesta;

import com.equipo05.terminal.modelo.Viaje;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ViajeRespuesta(
        Long id,
        LocalDateTime fechaSalida,
        LocalDateTime fechaLlegada,
        String estado,
        Long autobusId,
        String autobusPlaca,
        Integer capacidad,
        Long choferId,
        String choferNombre,
        Long rutaId,
        String origen,
        String destino,
        BigDecimal precio) {

    public static ViajeRespuesta de(Viaje v) {
        return new ViajeRespuesta(v.getId(), v.getFechaSalida(), v.getFechaLlegada(), v.getEstado(),
                v.getAutobus().getId(), v.getAutobus().getPlaca(), v.getAutobus().getCapacidad(),
                v.getChofer().getId(), v.getChofer().getNombre() + " " + v.getChofer().getApellido(),
                v.getRuta().getId(), v.getRuta().getOrigen(), v.getRuta().getDestino(),
                v.getRuta().getPrecioBase());
    }
}
