package com.equipo05.terminal.dto.respuesta;

import com.equipo05.terminal.modelo.Chofer;

public record ChoferRespuesta(
        Long id,
        String nombre,
        String apellido,
        String licencia,
        String telefono,
        Long terminalId,
        String terminalNombre) {

    public static ChoferRespuesta de(Chofer c) {
        return new ChoferRespuesta(c.getId(), c.getNombre(), c.getApellido(), c.getLicencia(), c.getTelefono(),
                c.getTerminal().getId(), c.getTerminal().getNombre());
    }
}
