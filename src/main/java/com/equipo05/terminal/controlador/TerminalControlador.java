package com.equipo05.terminal.controlador;

import com.equipo05.terminal.dto.peticion.TerminalPeticion;
import com.equipo05.terminal.dto.respuesta.PaginaRespuesta;
import com.equipo05.terminal.dto.respuesta.TerminalRespuesta;
import com.equipo05.terminal.servicio.TerminalServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/terminales")
@RequiredArgsConstructor
public class TerminalControlador {

    private final TerminalServicio terminalServicio;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMINISTRADOR','TAQUILLERO')")
    public PaginaRespuesta<TerminalRespuesta> listar(
            @RequestParam(defaultValue = "") String buscar,
            @RequestParam(defaultValue = "1") int pagina,
            @RequestParam(defaultValue = "10") int tamano) {
        return terminalServicio.listar(buscar, pagina, tamano);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR','TAQUILLERO')")
    public TerminalRespuesta obtener(@PathVariable Long id) {
        return terminalServicio.obtener(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @ResponseStatus(HttpStatus.CREATED)
    public TerminalRespuesta crear(@Valid @RequestBody TerminalPeticion peticion, Authentication autenticacion) {
        return terminalServicio.crear(peticion, autenticacion.getName());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public TerminalRespuesta actualizar(@PathVariable Long id, @Valid @RequestBody TerminalPeticion peticion) {
        return terminalServicio.actualizar(id, peticion);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        terminalServicio.eliminar(id);
    }
}
