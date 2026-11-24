package com.equipo05.terminal.servicio;

import com.equipo05.terminal.dto.peticion.ChoferPeticion;
import com.equipo05.terminal.dto.respuesta.ChoferRespuesta;
import com.equipo05.terminal.dto.respuesta.PaginaRespuesta;
import com.equipo05.terminal.excepcion.DatosInvalidosExcepcion;
import com.equipo05.terminal.excepcion.RecursoNoEncontradoExcepcion;
import com.equipo05.terminal.modelo.Chofer;
import com.equipo05.terminal.repositorio.ChoferRepositorio;
import com.equipo05.terminal.repositorio.TerminalRepositorio;
import com.equipo05.terminal.util.Texto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChoferServicio {

    private final ChoferRepositorio choferRepositorio;
    private final TerminalRepositorio terminalRepositorio;

    @Transactional(readOnly = true)
    public PaginaRespuesta<ChoferRespuesta> listar(String buscar, int pagina, int tamano) {
        return PaginaRespuesta.de(
                choferRepositorio.buscar(Texto.limpiar(buscar),
                        PaginaRespuesta.pedir(pagina, tamano, Sort.by("id").descending())),
                ChoferRespuesta::de);
    }

    @Transactional(readOnly = true)
    public ChoferRespuesta obtener(Long id) {
        return ChoferRespuesta.de(buscarEntidad(id));
    }

    @Transactional
    public ChoferRespuesta crear(ChoferPeticion peticion) {
        if (choferRepositorio.existsByLicencia(peticion.licencia())) {
            throw new DatosInvalidosExcepcion("Ya existe un chofer con esa licencia");
        }
        Chofer chofer = new Chofer();
        copiarDatos(chofer, peticion);
        return ChoferRespuesta.de(choferRepositorio.save(chofer));
    }

    @Transactional
    public ChoferRespuesta actualizar(Long id, ChoferPeticion peticion) {
        Chofer chofer = buscarEntidad(id);
        if (choferRepositorio.existsByLicenciaAndIdNot(peticion.licencia(), id)) {
            throw new DatosInvalidosExcepcion("Ya existe un chofer con esa licencia");
        }
        copiarDatos(chofer, peticion);
        return ChoferRespuesta.de(chofer);
    }

    @Transactional
    public void eliminar(Long id) {
        choferRepositorio.delete(buscarEntidad(id));
        choferRepositorio.flush();
    }

    private Chofer buscarEntidad(Long id) {
        return choferRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Chofer no encontrado"));
    }

    private void copiarDatos(Chofer chofer, ChoferPeticion peticion) {
        chofer.setNombre(peticion.nombre().trim());
        chofer.setApellido(peticion.apellido().trim());
        chofer.setLicencia(peticion.licencia().trim());
        chofer.setTelefono(peticion.telefono());
        chofer.setTerminal(terminalRepositorio.findById(peticion.terminalId())
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Terminal no encontrada")));
    }
}
