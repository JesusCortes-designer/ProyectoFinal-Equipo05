package com.equipo05.terminal.controlador;

import com.equipo05.terminal.dto.peticion.LoginPeticion;
import com.equipo05.terminal.dto.peticion.RecuperarPeticion;
import com.equipo05.terminal.dto.peticion.RegistroPeticion;
import com.equipo05.terminal.dto.peticion.RestablecerPeticion;
import com.equipo05.terminal.dto.respuesta.LoginRespuesta;
import com.equipo05.terminal.dto.respuesta.MensajeRespuesta;
import com.equipo05.terminal.dto.respuesta.UsuarioRespuesta;
import com.equipo05.terminal.servicio.AutenticacionServicio;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AutenticacionControlador {

    private final AutenticacionServicio autenticacionServicio;

    @PostMapping("/login")
    public LoginRespuesta login(@Valid @RequestBody LoginPeticion peticion) {
        return autenticacionServicio.login(peticion);
    }

    @PostMapping("/registro")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioRespuesta registro(@Valid @RequestBody RegistroPeticion peticion) {
        return autenticacionServicio.registrar(peticion);
    }

    @PostMapping("/logout")
    public MensajeRespuesta logout(@RequestHeader(value = "Authorization", required = false) String cabecera) {
        autenticacionServicio.cerrarSesion(cabecera);
        return new MensajeRespuesta("Sesión cerrada");
    }

    @PostMapping("/recuperar")
    public MensajeRespuesta recuperar(@Valid @RequestBody RecuperarPeticion peticion) {
        autenticacionServicio.solicitarRecuperacion(peticion.correo());
        return new MensajeRespuesta("Si el correo existe, te enviamos las instrucciones");
    }

    @PostMapping("/restablecer")
    public MensajeRespuesta restablecer(@Valid @RequestBody RestablecerPeticion peticion) {
        autenticacionServicio.restablecer(peticion);
        return new MensajeRespuesta("Contraseña actualizada");
    }
}
