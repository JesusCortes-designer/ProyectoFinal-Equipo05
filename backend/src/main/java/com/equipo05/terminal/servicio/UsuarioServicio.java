package com.equipo05.terminal.servicio;

import com.equipo05.terminal.dto.peticion.CambioContrasenaPeticion;
import com.equipo05.terminal.dto.peticion.UsuarioEdicionPeticion;
import com.equipo05.terminal.dto.peticion.UsuarioPeticion;
import com.equipo05.terminal.dto.respuesta.PaginaRespuesta;
import com.equipo05.terminal.dto.respuesta.UsuarioRespuesta;
import com.equipo05.terminal.excepcion.DatosInvalidosExcepcion;
import com.equipo05.terminal.excepcion.RecursoNoEncontradoExcepcion;
import com.equipo05.terminal.modelo.Cliente;
import com.equipo05.terminal.modelo.Rol;
import com.equipo05.terminal.modelo.Taquillero;
import com.equipo05.terminal.modelo.Usuario;
import com.equipo05.terminal.repositorio.ClienteRepositorio;
import com.equipo05.terminal.repositorio.RolRepositorio;
import com.equipo05.terminal.repositorio.TaquilleroRepositorio;
import com.equipo05.terminal.repositorio.UsuarioRepositorio;
import com.equipo05.terminal.util.Texto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UsuarioServicio {

    private final UsuarioRepositorio usuarioRepositorio;
    private final RolRepositorio rolRepositorio;
    private final ClienteRepositorio clienteRepositorio;
    private final TaquilleroRepositorio taquilleroRepositorio;
    private final PasswordEncoder codificador;

    // aqui se busca y se pagina en la base de datos
    @Transactional(readOnly = true)
    public PaginaRespuesta<UsuarioRespuesta> listar(String buscar, String rol, int pagina, int tamano) {
        Page<Usuario> resultado = usuarioRepositorio.buscar(Texto.limpiar(buscar), Texto.limpiar(rol),
                PaginaRespuesta.pedir(pagina, tamano, Sort.by("id").descending()));
        return PaginaRespuesta.de(resultado, UsuarioRespuesta::de);
    }

    @Transactional(readOnly = true)
    public UsuarioRespuesta obtener(Long id) {
        return UsuarioRespuesta.de(buscarEntidad(id));
    }

    // aqui se regresa el perfil del usuario que tiene la sesion iniciada
    @Transactional(readOnly = true)
    public UsuarioRespuesta perfil(String correo) {
        Usuario usuario = usuarioRepositorio.findByCorreo(correo)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Usuario no encontrado"));
        return UsuarioRespuesta.de(usuario);
    }

    // aqui el usuario cambia su contrasena, primero se comprueba la actual
    @Transactional
    public void cambiarContrasena(String correo, CambioContrasenaPeticion peticion) {
        Usuario usuario = usuarioRepositorio.findByCorreo(correo)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Usuario no encontrado"));
        if (!codificador.matches(peticion.contrasenaActual(), usuario.getContrasena())) {
            throw new DatosInvalidosExcepcion("La contraseña actual no es correcta");
        }
        if (codificador.matches(peticion.nuevaContrasena(), usuario.getContrasena())) {
            throw new DatosInvalidosExcepcion("La nueva contraseña debe ser distinta a la actual");
        }
        usuario.setContrasena(codificador.encode(peticion.nuevaContrasena()));
    }

    @Transactional
    public UsuarioRespuesta crear(UsuarioPeticion peticion) {
        if (usuarioRepositorio.existsByCorreo(peticion.correo())) {
            throw new DatosInvalidosExcepcion("Ya existe un usuario con ese correo");
        }
        Usuario usuario = new Usuario();
        usuario.setNombre(peticion.nombre().trim());
        usuario.setApellido(peticion.apellido().trim());
        usuario.setCorreo(peticion.correo().trim());
        usuario.setContrasena(codificador.encode(peticion.contrasena()));
        usuario.setEdad(peticion.edad());
        usuario.setActivo(true);
        usuario.setRol(buscarRol(peticion.rol()));
        usuarioRepositorio.save(usuario);

        asegurarPerfil(usuario, peticion.telefono());
        return UsuarioRespuesta.de(usuario);
    }

    @Transactional
    public UsuarioRespuesta actualizar(Long id, UsuarioEdicionPeticion peticion) {
        Usuario usuario = buscarEntidad(id);
        usuario.setNombre(peticion.nombre().trim());
        usuario.setApellido(peticion.apellido().trim());
        usuario.setEdad(peticion.edad());
        usuario.setActivo(peticion.activo());
        usuario.setRol(buscarRol(peticion.rol()));

        asegurarPerfil(usuario, peticion.telefono());
        return UsuarioRespuesta.de(usuario);
    }

    @Transactional
    public void eliminar(Long id, String correoActual) {
        Usuario usuario = buscarEntidad(id);
        if (usuario.getCorreo().equals(correoActual)) {
            throw new DatosInvalidosExcepcion("No puedes eliminar tu propio usuario");
        }
        clienteRepositorio.findByUsuarioId(id).ifPresent(clienteRepositorio::delete);
        taquilleroRepositorio.findByUsuarioId(id).ifPresent(taquilleroRepositorio::delete);
        usuarioRepositorio.delete(usuario);
        usuarioRepositorio.flush();
    }

    private Usuario buscarEntidad(Long id) {
        return usuarioRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Usuario no encontrado"));
    }

    private Rol buscarRol(String nombre) {
        return rolRepositorio.findByNombre(nombre)
                .orElseThrow(() -> new DatosInvalidosExcepcion("El rol no existe"));
    }

    // aqui se crea la fila de cliente o taquillero si el rol la necesita y no existe
    private void asegurarPerfil(Usuario usuario, String telefono) {
        String rol = usuario.getRol().getNombre();

        if (rol.equals("CLIENTE") && clienteRepositorio.findByUsuarioId(usuario.getId()).isEmpty()) {
            if (telefono == null || telefono.isBlank()) {
                throw new DatosInvalidosExcepcion("El teléfono es obligatorio para los clientes");
            }
            Cliente cliente = new Cliente();
            cliente.setTelefono(telefono);
            cliente.setUsuario(usuario);
            clienteRepositorio.save(cliente);
        }

        if (rol.equals("TAQUILLERO") && taquilleroRepositorio.findByUsuarioId(usuario.getId()).isEmpty()) {
            Taquillero taquillero = new Taquillero();
            taquillero.setNumeroEmpleado("TAQ-" + usuario.getId());
            taquillero.setUsuario(usuario);
            taquilleroRepositorio.save(taquillero);
        }
    }
}
