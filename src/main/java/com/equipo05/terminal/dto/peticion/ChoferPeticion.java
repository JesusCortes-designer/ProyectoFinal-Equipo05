package com.equipo05.terminal.dto.peticion;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ChoferPeticion(
        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 60, message = "El nombre admite máximo 60 caracteres")
        String nombre,

        @NotBlank(message = "El apellido es obligatorio")
        @Size(max = 60, message = "El apellido admite máximo 60 caracteres")
        String apellido,

        @NotBlank(message = "La licencia es obligatoria")
        @Size(max = 30, message = "La licencia admite máximo 30 caracteres")
        String licencia,

        @NotBlank(message = "El teléfono es obligatorio")
        @Pattern(regexp = Reglas.TELEFONO, message = Reglas.MENSAJE_TELEFONO)
        String telefono,

        @NotNull(message = "La terminal es obligatoria")
        Long terminalId) {
}
