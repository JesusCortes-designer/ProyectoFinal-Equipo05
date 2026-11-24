package com.equipo05.terminal.controlador;

import com.equipo05.terminal.dto.peticion.BoletoPeticion;
import com.equipo05.terminal.dto.respuesta.BoletoRespuesta;
import com.equipo05.terminal.dto.respuesta.PaginaRespuesta;
import com.equipo05.terminal.servicio.BoletoServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/boletos")
@RequiredArgsConstructor
public class BoletoControlador {

    private final BoletoServicio boletoServicio;

    // admin y taquillero ven todos
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMINISTRADOR','TAQUILLERO')")
    public PaginaRespuesta<BoletoRespuesta> listar(
            @RequestParam(defaultValue = "") String buscar,
            @RequestParam(defaultValue = "") String estado,
            @RequestParam(defaultValue = "1") int pagina,
            @RequestParam(defaultValue = "10") int tamano) {
        return boletoServicio.listar(buscar, estado, pagina, tamano);
    }

    // el cliente solo ve los suyos
    @GetMapping("/mios")
    @PreAuthorize("hasRole('CLIENTE')")
    public PaginaRespuesta<BoletoRespuesta> mios(
            Authentication autenticacion,
            @RequestParam(defaultValue = "1") int pagina,
            @RequestParam(defaultValue = "10") int tamano) {
        return boletoServicio.misBoletos(autenticacion.getName(), pagina, tamano);
    }

    // venta en ventanilla
    @PostMapping
    @PreAuthorize("hasRole('TAQUILLERO')")
    @ResponseStatus(HttpStatus.CREATED)
    public BoletoRespuesta vender(@Valid @RequestBody BoletoPeticion peticion, Authentication autenticacion) {
        return boletoServicio.venderEnTaquilla(peticion, autenticacion.getName());
    }

    @PutMapping("/{id}/cancelar")
    @PreAuthorize("isAuthenticated()")
    public BoletoRespuesta cancelar(@PathVariable Long id, Authentication autenticacion) {
        boolean esPersonal = autenticacion.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMINISTRADOR")
                        || a.getAuthority().equals("ROLE_TAQUILLERO"));
        return boletoServicio.cancelar(id, autenticacion.getName(), esPersonal);
    }
}
