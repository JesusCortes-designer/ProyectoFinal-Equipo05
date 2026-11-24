package com.equipo05.terminal.dto.peticion;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record RestablecerPeticion(
        @NotBlank(message = "El token es obligatorio")
        String token,

        @NotBlank(message = "La nueva contraseña es obligatoria")
        @Pattern(regexp = Reglas.CONTRASENA, message = Reglas.MENSAJE_CONTRASENA)
        String nuevaContrasena) {
}
