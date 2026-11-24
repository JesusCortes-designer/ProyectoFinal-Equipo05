package com.equipo05.terminal.dto.peticion;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDateTime;

public record ViajePeticion(
        @NotNull(message = "La fecha de salida es obligatoria")
        LocalDateTime fechaSalida,

        @NotNull(message = "La fecha de llegada es obligatoria")
        LocalDateTime fechaLlegada,

        @NotBlank(message = "El estado es obligatorio")
        @Pattern(regexp = "PROGRAMADO|EN_CURSO|FINALIZADO|CANCELADO",
                message = "El estado debe ser PROGRAMADO, EN_CURSO, FINALIZADO o CANCELADO")
        String estado,

        @NotNull(message = "El autobús es obligatorio")
        Long autobusId,

        @NotNull(message = "El chofer es obligatorio")
        Long choferId,

        @NotNull(message = "La ruta es obligatoria")
        Long rutaId) {
}
