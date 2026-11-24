package com.equipo05.terminal.servicio;

import com.equipo05.terminal.dto.peticion.AutobusPeticion;
import com.equipo05.terminal.dto.respuesta.AutobusRespuesta;
import com.equipo05.terminal.dto.respuesta.PaginaRespuesta;
import com.equipo05.terminal.excepcion.DatosInvalidosExcepcion;
import com.equipo05.terminal.excepcion.RecursoNoEncontradoExcepcion;
import com.equipo05.terminal.modelo.Autobus;
import com.equipo05.terminal.repositorio.AutobusRepositorio;
import com.equipo05.terminal.repositorio.TerminalRepositorio;
import com.equipo05.terminal.util.Texto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AutobusServicio {

    private final AutobusRepositorio autobusRepositorio;
    private final TerminalRepositorio terminalRepositorio;

    @Transactional(readOnly = true)
    public PaginaRespuesta<AutobusRespuesta> listar(String buscar, String estado, int pagina, int tamano) {
        return PaginaRespuesta.de(
                autobusRepositorio.buscar(Texto.limpiar(buscar), Texto.limpiar(estado),
                        PaginaRespuesta.pedir(pagina, tamano, Sort.by("id").descending())),
                AutobusRespuesta::de);
    }

    @Transactional(readOnly = true)
    public AutobusRespuesta obtener(Long id) {
        return AutobusRespuesta.de(buscarEntidad(id));
    }

    @Transactional
    public AutobusRespuesta crear(AutobusPeticion peticion) {
        if (autobusRepositorio.existsByPlaca(peticion.placa())) {
            throw new DatosInvalidosExcepcion("Ya existe un autobús con esa placa");
        }
        Autobus autobus = new Autobus();
        copiarDatos(autobus, peticion);
        return AutobusRespuesta.de(autobusRepositorio.save(autobus));
    }

    @Transactional
    public AutobusRespuesta actualizar(Long id, AutobusPeticion peticion) {
        Autobus autobus = buscarEntidad(id);
        if (autobusRepositorio.existsByPlacaAndIdNot(peticion.placa(), id)) {
            throw new DatosInvalidosExcepcion("Ya existe un autobús con esa placa");
        }
        copiarDatos(autobus, peticion);
        return AutobusRespuesta.de(autobus);
    }

    @Transactional
    public void eliminar(Long id) {
        autobusRepositorio.delete(buscarEntidad(id));
        autobusRepositorio.flush();
    }

    private Autobus buscarEntidad(Long id) {
        return autobusRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Autobús no encontrado"));
    }

    private void copiarDatos(Autobus autobus, AutobusPeticion peticion) {
        autobus.setPlaca(peticion.placa().trim());
        autobus.setModelo(peticion.modelo().trim());
        autobus.setCapacidad(peticion.capacidad());
        autobus.setEstado(peticion.estado());
        autobus.setTerminal(terminalRepositorio.findById(peticion.terminalId())
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Terminal no encontrada")));
    }
}
