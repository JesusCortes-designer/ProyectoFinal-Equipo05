package com.equipo05.terminal.controlador;

import com.equipo05.terminal.dto.peticion.ReservacionPeticion;
import com.equipo05.terminal.dto.respuesta.PaginaRespuesta;
import com.equipo05.terminal.dto.respuesta.ReservacionRespuesta;
import com.equipo05.terminal.servicio.ReservacionServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservaciones")
@RequiredArgsConstructor
public class ReservacionControlador {

    private final ReservacionServicio reservacionServicio;

    // el admin ve todas
    @GetMapping
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public PaginaRespuesta<ReservacionRespuesta> listar(
            @RequestParam(defaultValue = "") String estado,
            @RequestParam(defaultValue = "1") int pagina,
            @RequestParam(defaultValue = "10") int tamano) {
        return reservacionServicio.listar(estado, pagina, tamano);
    }

    // el cliente solo ve las suyas
    @GetMapping("/mias")
    @PreAuthorize("hasRole('CLIENTE')")
    public PaginaRespuesta<ReservacionRespuesta> mias(
            Authentication autenticacion,
            @RequestParam(defaultValue = "1") int pagina,
            @RequestParam(defaultValue = "10") int tamano) {
        return reservacionServicio.misReservaciones(autenticacion.getName(), pagina, tamano);
    }

    @PostMapping
    @PreAuthorize("hasRole('CLIENTE')")
    @ResponseStatus(HttpStatus.CREATED)
    public ReservacionRespuesta crear(@Valid @RequestBody ReservacionPeticion peticion,
                                      Authentication autenticacion) {
        return reservacionServicio.crear(peticion, autenticacion.getName());
    }

    @PutMapping("/{id}/cancelar")
    @PreAuthorize("hasAnyRole('ADMINISTRADOR','CLIENTE')")
    public ReservacionRespuesta cancelar(@PathVariable Long id, Authentication autenticacion) {
        boolean esAdministrador = autenticacion.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMINISTRADOR"));
        return reservacionServicio.cancelar(id, autenticacion.getName(), esAdministrador);
    }
}
