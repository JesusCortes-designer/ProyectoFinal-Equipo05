package com.equipo05.terminal.dto.peticion;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TerminalPeticion(
        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 100, message = "El nombre admite máximo 100 caracteres")
        String nombre,

        @NotBlank(message = "La ciudad es obligatoria")
        @Size(max = 80, message = "La ciudad admite máximo 80 caracteres")
        String ciudad,

        @NotBlank(message = "La dirección es obligatoria")
        @Size(max = 200, message = "La dirección admite máximo 200 caracteres")
        String direccion) {
}
