package com.equipo05.terminal.dto.peticion;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.List;

public record RutaPeticion(
        @NotBlank(message = "El origen es obligatorio")
        @Size(max = 80, message = "El origen admite máximo 80 caracteres")
        String origen,

        @NotBlank(message = "El destino es obligatorio")
        @Size(max = 80, message = "El destino admite máximo 80 caracteres")
        String destino,

        @NotNull(message = "La distancia es obligatoria")
        @DecimalMin(value = "1.0", message = "La distancia mínima es 1 km")
        BigDecimal distanciaKm,

        @NotNull(message = "La duración es obligatoria")
        @Min(value = 1, message = "La duración mínima es 1 minuto")
        Integer duracionMinutos,

        @NotNull(message = "El precio es obligatorio")
        @DecimalMin(value = "1.0", message = "El precio mínimo es 1")
        BigDecimal precioBase,

        // terminales por las que pasa la ruta
        @NotEmpty(message = "Selecciona al menos una terminal")
        List<@NotNull(message = "Terminal no válida") Long> terminalIds) {
}
