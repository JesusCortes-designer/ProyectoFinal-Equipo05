package com.equipo05.terminal.servicio;

import com.equipo05.terminal.dto.peticion.TerminalPeticion;
import com.equipo05.terminal.dto.respuesta.PaginaRespuesta;
import com.equipo05.terminal.dto.respuesta.TerminalRespuesta;
import com.equipo05.terminal.excepcion.RecursoNoEncontradoExcepcion;
import com.equipo05.terminal.modelo.Terminal;
import com.equipo05.terminal.modelo.Usuario;
import com.equipo05.terminal.repositorio.TerminalRepositorio;
import com.equipo05.terminal.repositorio.UsuarioRepositorio;
import com.equipo05.terminal.util.Texto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TerminalServicio {

    private final TerminalRepositorio terminalRepositorio;
    private final UsuarioRepositorio usuarioRepositorio;

    @Transactional(readOnly = true)
    public PaginaRespuesta<TerminalRespuesta> listar(String buscar, int pagina, int tamano) {
        return PaginaRespuesta.de(
                terminalRepositorio.buscar(Texto.limpiar(buscar),
                        PaginaRespuesta.pedir(pagina, tamano, Sort.by("id").descending())),
                TerminalRespuesta::de);
    }

    @Transactional(readOnly = true)
    public TerminalRespuesta obtener(Long id) {
        return TerminalRespuesta.de(buscarEntidad(id));
    }

    // aqui la terminal queda a cargo del administrador que la crea
    @Transactional
    public TerminalRespuesta crear(TerminalPeticion peticion, String correoAdministrador) {
        Usuario administrador = usuarioRepositorio.findByCorreo(correoAdministrador)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Administrador no encontrado"));
        Terminal terminal = new Terminal();
        terminal.setAdministrador(administrador);
        copiarDatos(terminal, peticion);
        return TerminalRespuesta.de(terminalRepositorio.save(terminal));
    }

    @Transactional
    public TerminalRespuesta actualizar(Long id, TerminalPeticion peticion) {
        Terminal terminal = buscarEntidad(id);
        copiarDatos(terminal, peticion);
        return TerminalRespuesta.de(terminal);
    }

    @Transactional
    public void eliminar(Long id) {
        terminalRepositorio.delete(buscarEntidad(id));
        terminalRepositorio.flush();
    }

    private Terminal buscarEntidad(Long id) {
        return terminalRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Terminal no encontrada"));
    }

    private void copiarDatos(Terminal terminal, TerminalPeticion peticion) {
        terminal.setNombre(peticion.nombre().trim());
        terminal.setCiudad(peticion.ciudad().trim());
        terminal.setDireccion(peticion.direccion().trim());
    }
}
