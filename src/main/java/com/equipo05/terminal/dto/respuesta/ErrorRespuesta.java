package com.equipo05.terminal.dto.respuesta;

import java.time.LocalDateTime;
import java.util.Map;

// aqui se arma el json de error que regresa la api
public record ErrorRespuesta(
        int estado,
        String error,
        String mensaje,
        Map<String, String> campos,
        LocalDateTime fecha) {

    public static ErrorRespuesta de(int estado, String error, String mensaje) {
        return new ErrorRespuesta(estado, error, mensaje, null, LocalDateTime.now());
    }

    public static ErrorRespuesta de(int estado, String error, String mensaje, Map<String, String> campos) {
        return new ErrorRespuesta(estado, error, mensaje, campos, LocalDateTime.now());
    }
}
