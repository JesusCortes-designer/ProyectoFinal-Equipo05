package com.equipo05.terminal.dto.respuesta;

public record LoginRespuesta(
        String token,
        String tipo,
        UsuarioRespuesta usuario) {
}
