package com.equipo05.terminal.controlador;

import com.equipo05.terminal.dto.peticion.AutobusPeticion;
import com.equipo05.terminal.dto.respuesta.AutobusRespuesta;
import com.equipo05.terminal.dto.respuesta.PaginaRespuesta;
import com.equipo05.terminal.servicio.AutobusServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/autobuses")
@RequiredArgsConstructor
public class AutobusControlador {

    private final AutobusServicio autobusServicio;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMINISTRADOR','TAQUILLERO')")
    public PaginaRespuesta<AutobusRespuesta> listar(
            @RequestParam(defaultValue = "") String buscar,
            @RequestParam(defaultValue = "") String estado,
            @RequestParam(defaultValue = "1") int pagina,
            @RequestParam(defaultValue = "10") int tamano) {
        return autobusServicio.listar(buscar, estado, pagina, tamano);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR','TAQUILLERO')")
    public AutobusRespuesta obtener(@PathVariable Long id) {
        return autobusServicio.obtener(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @ResponseStatus(HttpStatus.CREATED)
    public AutobusRespuesta crear(@Valid @RequestBody AutobusPeticion peticion) {
        return autobusServicio.crear(peticion);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public AutobusRespuesta actualizar(@PathVariable Long id, @Valid @RequestBody AutobusPeticion peticion) {
        return autobusServicio.actualizar(id, peticion);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        autobusServicio.eliminar(id);
    }
}
