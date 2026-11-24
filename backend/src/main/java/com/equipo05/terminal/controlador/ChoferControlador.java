package com.equipo05.terminal.controlador;

import com.equipo05.terminal.dto.peticion.ChoferPeticion;
import com.equipo05.terminal.dto.respuesta.ChoferRespuesta;
import com.equipo05.terminal.dto.respuesta.PaginaRespuesta;
import com.equipo05.terminal.servicio.ChoferServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/choferes")
@RequiredArgsConstructor
public class ChoferControlador {

    private final ChoferServicio choferServicio;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMINISTRADOR','TAQUILLERO')")
    public PaginaRespuesta<ChoferRespuesta> listar(
            @RequestParam(defaultValue = "") String buscar,
            @RequestParam(defaultValue = "1") int pagina,
            @RequestParam(defaultValue = "10") int tamano) {
        return choferServicio.listar(buscar, pagina, tamano);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR','TAQUILLERO')")
    public ChoferRespuesta obtener(@PathVariable Long id) {
        return choferServicio.obtener(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @ResponseStatus(HttpStatus.CREATED)
    public ChoferRespuesta crear(@Valid @RequestBody ChoferPeticion peticion) {
        return choferServicio.crear(peticion);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ChoferRespuesta actualizar(@PathVariable Long id, @Valid @RequestBody ChoferPeticion peticion) {
        return choferServicio.actualizar(id, peticion);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        choferServicio.eliminar(id);
    }
}
