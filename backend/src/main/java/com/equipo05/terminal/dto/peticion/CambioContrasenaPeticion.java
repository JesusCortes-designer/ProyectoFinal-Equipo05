package com.equipo05.terminal.dto.peticion;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

// aqui llegan los datos cuando el usuario cambia su contrasena desde el perfil
public record CambioContrasenaPeticion(
        @NotBlank(message = "La contraseña actual es obligatoria")
        String contrasenaActual,

        @NotBlank(message = "La nueva contraseña es obligatoria")
        @Pattern(regexp = Reglas.CONTRASENA, message = Reglas.MENSAJE_CONTRASENA)
        String nuevaContrasena) {
}
