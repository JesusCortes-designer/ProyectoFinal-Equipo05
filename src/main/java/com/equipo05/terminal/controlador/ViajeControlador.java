package com.equipo05.terminal.controlador;

import com.equipo05.terminal.dto.peticion.ViajePeticion;
import com.equipo05.terminal.dto.respuesta.PaginaRespuesta;
import com.equipo05.terminal.dto.respuesta.ViajeRespuesta;
import com.equipo05.terminal.servicio.ViajeServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/viajes")
@RequiredArgsConstructor
public class ViajeControlador {

    private final ViajeServicio viajeServicio;

    // los viajes los puede ver cualquier usuario con sesion
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public PaginaRespuesta<ViajeRespuesta> listar(
            @RequestParam(defaultValue = "") String origen,
            @RequestParam(defaultValue = "") String destino,
            @RequestParam(defaultValue = "") String estado,
            @RequestParam(defaultValue = "1") int pagina,
            @RequestParam(defaultValue = "10") int tamano) {
        return viajeServicio.listar(origen, destino, estado, pagina, tamano);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ViajeRespuesta obtener(@PathVariable Long id) {
        return viajeServicio.obtener(id);
    }

    @GetMapping("/{id}/asientos-ocupados")
    @PreAuthorize("isAuthenticated()")
    public List<Integer> asientosOcupados(@PathVariable Long id) {
        return viajeServicio.asientosOcupados(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @ResponseStatus(HttpStatus.CREATED)
    public ViajeRespuesta crear(@Valid @RequestBody ViajePeticion peticion) {
        return viajeServicio.crear(peticion);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ViajeRespuesta actualizar(@PathVariable Long id, @Valid @RequestBody ViajePeticion peticion) {
        return viajeServicio.actualizar(id, peticion);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        viajeServicio.eliminar(id);
    }
}
