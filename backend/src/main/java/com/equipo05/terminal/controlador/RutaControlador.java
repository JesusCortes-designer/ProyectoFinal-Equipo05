package com.equipo05.terminal.controlador;

import com.equipo05.terminal.dto.peticion.RutaPeticion;
import com.equipo05.terminal.dto.respuesta.PaginaRespuesta;
import com.equipo05.terminal.dto.respuesta.RutaRespuesta;
import com.equipo05.terminal.servicio.RutaServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rutas")
@RequiredArgsConstructor
public class RutaControlador {

    private final RutaServicio rutaServicio;

    // las rutas las puede ver cualquier usuario con sesion
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public PaginaRespuesta<RutaRespuesta> listar(
            @RequestParam(defaultValue = "") String buscar,
            @RequestParam(defaultValue = "1") int pagina,
            @RequestParam(defaultValue = "10") int tamano) {
        return rutaServicio.listar(buscar, pagina, tamano);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public RutaRespuesta obtener(@PathVariable Long id) {
        return rutaServicio.obtener(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @ResponseStatus(HttpStatus.CREATED)
    public RutaRespuesta crear(@Valid @RequestBody RutaPeticion peticion) {
        return rutaServicio.crear(peticion);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public RutaRespuesta actualizar(@PathVariable Long id, @Valid @RequestBody RutaPeticion peticion) {
        return rutaServicio.actualizar(id, peticion);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        rutaServicio.eliminar(id);
    }
}
