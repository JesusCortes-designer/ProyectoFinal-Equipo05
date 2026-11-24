package com.equipo05.terminal.controlador;

import com.equipo05.terminal.dto.peticion.UsuarioEdicionPeticion;
import com.equipo05.terminal.dto.peticion.UsuarioPeticion;
import com.equipo05.terminal.dto.respuesta.PaginaRespuesta;
import com.equipo05.terminal.dto.respuesta.UsuarioRespuesta;
import com.equipo05.terminal.servicio.UsuarioServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioControlador {

    private final UsuarioServicio usuarioServicio;

    // cualquier usuario con sesion puede ver su propio perfil
    @GetMapping("/perfil")
    @PreAuthorize("isAuthenticated()")
    public UsuarioRespuesta perfil(Authentication autenticacion) {
        return usuarioServicio.perfil(autenticacion.getName());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public PaginaRespuesta<UsuarioRespuesta> listar(
            @RequestParam(defaultValue = "") String buscar,
            @RequestParam(defaultValue = "") String rol,
            @RequestParam(defaultValue = "1") int pagina,
            @RequestParam(defaultValue = "10") int tamano) {
        return usuarioServicio.listar(buscar, rol, pagina, tamano);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public UsuarioRespuesta obtener(@PathVariable Long id) {
        return usuarioServicio.obtener(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioRespuesta crear(@Valid @RequestBody UsuarioPeticion peticion) {
        return usuarioServicio.crear(peticion);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public UsuarioRespuesta actualizar(@PathVariable Long id,
                                       @Valid @RequestBody UsuarioEdicionPeticion peticion) {
        return usuarioServicio.actualizar(id, peticion);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id, Authentication autenticacion) {
        usuarioServicio.eliminar(id, autenticacion.getName());
    }
}
