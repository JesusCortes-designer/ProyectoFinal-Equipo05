package com.equipo05.terminal.dto.peticion;

import jakarta.validation.constraints.*;

// aqui llegan los datos cuando el admin edita un usuario (sin contrasena ni correo)
public record UsuarioEdicionPeticion(
        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 60, message = "El nombre admite máximo 60 caracteres")
        String nombre,

        @NotBlank(message = "El apellido es obligatorio")
        @Size(max = 60, message = "El apellido admite máximo 60 caracteres")
        String apellido,

        @NotNull(message = "La edad es obligatoria")
        @Min(value = 1, message = "La edad mínima es 1")
        @Max(value = 120, message = "La edad máxima es 120")
        Integer edad,

        @NotBlank(message = "El rol es obligatorio")
        @Pattern(regexp = Reglas.ROL, message = "El rol debe ser ADMINISTRADOR, TAQUILLERO o CLIENTE")
        String rol,

        @NotNull(message = "Indica si el usuario está activo")
        Boolean activo,

        @Pattern(regexp = Reglas.TELEFONO, message = Reglas.MENSAJE_TELEFONO)
        String telefono) {
}
