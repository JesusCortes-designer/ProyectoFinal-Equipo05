package com.equipo05.terminal.servicio;

import com.equipo05.terminal.dto.peticion.LoginPeticion;
import com.equipo05.terminal.dto.peticion.RegistroPeticion;
import com.equipo05.terminal.dto.peticion.RestablecerPeticion;
import com.equipo05.terminal.dto.respuesta.LoginRespuesta;
import com.equipo05.terminal.dto.respuesta.UsuarioRespuesta;
import com.equipo05.terminal.excepcion.DatosInvalidosExcepcion;
import com.equipo05.terminal.modelo.*;
import com.equipo05.terminal.repositorio.*;
import com.equipo05.terminal.seguridad.JwtServicio;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AutenticacionServicio {

    private final UsuarioRepositorio usuarioRepositorio;
    private final RolRepositorio rolRepositorio;
    private final ClienteRepositorio clienteRepositorio;
    private final TokenInvalidadoRepositorio tokenInvalidadoRepositorio;
    private final TokenRecuperacionRepositorio tokenRecuperacionRepositorio;
    private final PasswordEncoder codificador;
    private final AuthenticationManager administradorAutenticacion;
    private final JwtServicio jwtServicio;
    private final CorreoServicio correoServicio;

    @Value("${app.frontend.url}")
    private String urlFrontend;

    // aqui se valida el correo y la contrasena y se regresa el token
    @Transactional(readOnly = true)
    public LoginRespuesta login(LoginPeticion peticion) {
        administradorAutenticacion.authenticate(
                new UsernamePasswordAuthenticationToken(peticion.correo(), peticion.contrasena()));
        Usuario usuario = usuarioRepositorio.findByCorreo(peticion.correo())
                .orElseThrow(() -> new DatosInvalidosExcepcion("Usuario no encontrado"));
        String token = jwtServicio.generarToken(usuario.getCorreo(), usuario.getRol().getNombre());
        return new LoginRespuesta(token, "Bearer", UsuarioRespuesta.de(usuario));
    }

    // aqui se registra un cliente nuevo
    @Transactional
    public UsuarioRespuesta registrar(RegistroPeticion peticion) {
        if (usuarioRepositorio.existsByCorreo(peticion.correo())) {
            throw new DatosInvalidosExcepcion("Ya existe un usuario con ese correo");
        }
        Rol rol = rolRepositorio.findByNombre("CLIENTE")
                .orElseThrow(() -> new IllegalStateException("Falta el rol CLIENTE en la base de datos"));

        Usuario usuario = new Usuario();
        usuario.setNombre(peticion.nombre().trim());
        usuario.setApellido(peticion.apellido().trim());
        usuario.setCorreo(peticion.correo().trim());
        usuario.setContrasena(codificador.encode(peticion.contrasena()));
        usuario.setEdad(peticion.edad());
        usuario.setActivo(true);
        usuario.setRol(rol);
        usuarioRepositorio.save(usuario);

        Cliente cliente = new Cliente();
        cliente.setTelefono(peticion.telefono());
        cliente.setUsuario(usuario);
        clienteRepositorio.save(cliente);

        correoServicio.enviar(usuario.getCorreo(), "Bienvenido a la terminal de autobuses",
                "Hola " + usuario.getNombre() + ", tu cuenta fue creada correctamente.");
        return UsuarioRespuesta.de(usuario);
    }

    // aqui se invalida el token para que ya no sirva
    @Transactional
    public void cerrarSesion(String cabecera) {
        if (cabecera == null || !cabecera.startsWith("Bearer ")) {
            return;
        }
        String token = cabecera.substring(7);
        try {
            Claims datos = jwtServicio.leer(token);
            String huella = jwtServicio.huella(token);
            if (!tokenInvalidadoRepositorio.existsByHuella(huella)) {
                TokenInvalidado invalidado = new TokenInvalidado();
                invalidado.setHuella(huella);
                invalidado.setFechaExpiracion(
                        LocalDateTime.ofInstant(datos.getExpiration().toInstant(), ZoneId.systemDefault()));
                tokenInvalidadoRepositorio.save(invalidado);
            }
        } catch (JwtException | IllegalArgumentException e) {
            // el token ya no servia, no hay nada que invalidar
        }
    }

    // aqui se manda el correo con el link para cambiar la contrasena
    @Transactional
    public void solicitarRecuperacion(String correo) {
        // no se avisa si el correo existe o no, para no revelar usuarios
        usuarioRepositorio.findByCorreo(correo).ifPresent(usuario -> {
            TokenRecuperacion recuperacion = new TokenRecuperacion();
            recuperacion.setToken(UUID.randomUUID().toString());
            recuperacion.setFechaExpiracion(LocalDateTime.now().plusMinutes(30));
            recuperacion.setUsado(false);
            recuperacion.setUsuario(usuario);
            tokenRecuperacionRepositorio.save(recuperacion);

            correoServicio.enviar(usuario.getCorreo(), "Recuperar contraseña",
                    "Hola " + usuario.getNombre() + ", entra a este link para cambiar tu contraseña "
                            + "(vence en 30 minutos):\n" + urlFrontend + "/restablecer?token="
                            + recuperacion.getToken());
        });
    }

    // aqui se cambia la contrasena con el token que llego por correo
    @Transactional
    public void restablecer(RestablecerPeticion peticion) {
        TokenRecuperacion recuperacion = tokenRecuperacionRepositorio.findByToken(peticion.token())
                .orElseThrow(() -> new DatosInvalidosExcepcion("El token no es válido"));
        if (recuperacion.getUsado() || recuperacion.getFechaExpiracion().isBefore(LocalDateTime.now())) {
            throw new DatosInvalidosExcepcion("El token ya se usó o está vencido");
        }
        recuperacion.getUsuario().setContrasena(codificador.encode(peticion.nuevaContrasena()));
        recuperacion.setUsado(true);
    }
}
