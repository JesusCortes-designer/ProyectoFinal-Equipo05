package com.equipo05.terminal.dto.respuesta;

import com.equipo05.terminal.modelo.Terminal;

public record TerminalRespuesta(
        Long id,
        String nombre,
        String ciudad,
        String direccion,
        Long administradorId,
        String administradorNombre) {

    public static TerminalRespuesta de(Terminal t) {
        return new TerminalRespuesta(t.getId(), t.getNombre(), t.getCiudad(), t.getDireccion(),
                t.getAdministrador().getId(),
                t.getAdministrador().getNombre() + " " + t.getAdministrador().getApellido());
    }
}
