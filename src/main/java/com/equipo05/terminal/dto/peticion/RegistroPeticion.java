package com.equipo05.terminal.dto.peticion;

import jakarta.validation.constraints.*;

// aqui llegan los datos cuando un cliente se registra solo
public record RegistroPeticion(
        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 60, message = "El nombre admite máximo 60 caracteres")
        String nombre,

        @NotBlank(message = "El apellido es obligatorio")
        @Size(max = 60, message = "El apellido admite máximo 60 caracteres")
        String apellido,

        @NotBlank(message = "El correo es obligatorio")
        @Email(message = "El correo no es válido")
        @Size(max = 120, message = "El correo admite máximo 120 caracteres")
        String correo,

        @NotBlank(message = "La contraseña es obligatoria")
        @Pattern(regexp = Reglas.CONTRASENA, message = Reglas.MENSAJE_CONTRASENA)
        String contrasena,

        @NotNull(message = "La edad es obligatoria")
        @Min(value = 1, message = "La edad mínima es 1")
        @Max(value = 120, message = "La edad máxima es 120")
        Integer edad,

        @NotBlank(message = "El teléfono es obligatorio")
        @Pattern(regexp = Reglas.TELEFONO, message = Reglas.MENSAJE_TELEFONO)
        String telefono) {
}
