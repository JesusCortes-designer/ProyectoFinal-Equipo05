package com.equipo05.terminal.servicio;

import com.equipo05.terminal.dto.peticion.RutaPeticion;
import com.equipo05.terminal.dto.respuesta.PaginaRespuesta;
import com.equipo05.terminal.dto.respuesta.RutaRespuesta;
import com.equipo05.terminal.excepcion.DatosInvalidosExcepcion;
import com.equipo05.terminal.excepcion.RecursoNoEncontradoExcepcion;
import com.equipo05.terminal.modelo.Ruta;
import com.equipo05.terminal.modelo.Terminal;
import com.equipo05.terminal.repositorio.RutaRepositorio;
import com.equipo05.terminal.repositorio.TerminalRepositorio;
import com.equipo05.terminal.util.Texto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RutaServicio {

    private final RutaRepositorio rutaRepositorio;
    private final TerminalRepositorio terminalRepositorio;

    @Transactional(readOnly = true)
    public PaginaRespuesta<RutaRespuesta> listar(String buscar, int pagina, int tamano) {
        return PaginaRespuesta.de(
                rutaRepositorio.buscar(Texto.limpiar(buscar),
                        PaginaRespuesta.pedir(pagina, tamano, Sort.by("id").descending())),
                RutaRespuesta::de);
    }

    @Transactional(readOnly = true)
    public RutaRespuesta obtener(Long id) {
        return RutaRespuesta.de(buscarEntidad(id));
    }

    @Transactional
    public RutaRespuesta crear(RutaPeticion peticion) {
        Ruta ruta = new Ruta();
        copiarDatos(ruta, peticion);
        return RutaRespuesta.de(rutaRepositorio.save(ruta));
    }

    @Transactional
    public RutaRespuesta actualizar(Long id, RutaPeticion peticion) {
        Ruta ruta = buscarEntidad(id);
        copiarDatos(ruta, peticion);
        return RutaRespuesta.de(ruta);
    }

    @Transactional
    public void eliminar(Long id) {
        rutaRepositorio.delete(buscarEntidad(id));
        rutaRepositorio.flush();
    }

    private Ruta buscarEntidad(Long id) {
        return rutaRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Ruta no encontrada"));
    }

    private void copiarDatos(Ruta ruta, RutaPeticion peticion) {
        if (peticion.origen().trim().equalsIgnoreCase(peticion.destino().trim())) {
            throw new DatosInvalidosExcepcion("El origen y el destino no pueden ser iguales");
        }
        ruta.setOrigen(peticion.origen().trim());
        ruta.setDestino(peticion.destino().trim());
        ruta.setDistanciaKm(peticion.distanciaKm());
        ruta.setDuracionMinutos(peticion.duracionMinutos());
        ruta.setPrecioBase(peticion.precioBase());

        // aqui se arma la lista de terminales de la ruta (muchos a muchos)
        Set<Long> ids = new HashSet<>(peticion.terminalIds());
        List<Terminal> terminales = terminalRepositorio.findAllById(ids);
        if (terminales.size() != ids.size()) {
            throw new RecursoNoEncontradoExcepcion("Alguna de las terminales no existe");
        }
        ruta.getTerminales().clear();
        ruta.getTerminales().addAll(terminales);
    }
}
