package com.equipo05.terminal.dto.peticion;

import jakarta.validation.constraints.*;

public record AutobusPeticion(
        @NotBlank(message = "La placa es obligatoria")
        @Size(max = 20, message = "La placa admite máximo 20 caracteres")
        String placa,

        @NotBlank(message = "El modelo es obligatorio")
        @Size(max = 60, message = "El modelo admite máximo 60 caracteres")
        String modelo,

        @NotNull(message = "La capacidad es obligatoria")
        @Min(value = 10, message = "La capacidad mínima es 10 asientos")
        @Max(value = 80, message = "La capacidad máxima es 80 asientos")
        Integer capacidad,

        @NotBlank(message = "El estado es obligatorio")
        @Pattern(regexp = "DISPONIBLE|EN_VIAJE|MANTENIMIENTO",
                message = "El estado debe ser DISPONIBLE, EN_VIAJE o MANTENIMIENTO")
        String estado,

        @NotNull(message = "La terminal es obligatoria")
        Long terminalId) {
}
