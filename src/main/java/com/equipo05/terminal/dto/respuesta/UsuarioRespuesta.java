package com.equipo05.terminal.dto.respuesta;

import com.equipo05.terminal.modelo.Usuario;

// la contrasena nunca sale en la respuesta
public record UsuarioRespuesta(
        Long id,
        String nombre,
        String apellido,
        String correo,
        Integer edad,
        Boolean activo,
        String rol) {

    public static UsuarioRespuesta de(Usuario u) {
        return new UsuarioRespuesta(u.getId(), u.getNombre(), u.getApellido(), u.getCorreo(),
                u.getEdad(), u.getActivo(), u.getRol().getNombre());
    }
}
