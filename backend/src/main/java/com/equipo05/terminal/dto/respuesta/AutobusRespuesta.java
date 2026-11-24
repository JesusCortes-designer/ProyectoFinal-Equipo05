package com.equipo05.terminal.dto.respuesta;

import com.equipo05.terminal.modelo.Autobus;

public record AutobusRespuesta(
        Long id,
        String placa,
        String modelo,
        Integer capacidad,
        String estado,
        Long terminalId,
        String terminalNombre) {

    public static AutobusRespuesta de(Autobus a) {
        return new AutobusRespuesta(a.getId(), a.getPlaca(), a.getModelo(), a.getCapacidad(), a.getEstado(),
                a.getTerminal().getId(), a.getTerminal().getNombre());
    }
}
