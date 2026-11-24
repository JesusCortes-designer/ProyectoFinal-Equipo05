package com.equipo05.terminal.dto.respuesta;

import com.equipo05.terminal.modelo.Ruta;
import com.equipo05.terminal.modelo.Terminal;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

public record RutaRespuesta(
        Long id,
        String origen,
        String destino,
        BigDecimal distanciaKm,
        Integer duracionMinutos,
        BigDecimal precioBase,
        List<Long> terminalIds,
        List<String> terminales) {

    public static RutaRespuesta de(Ruta r) {
        List<Terminal> ordenadas = r.getTerminales().stream()
                .sorted(Comparator.comparing(Terminal::getId)).toList();
        return new RutaRespuesta(r.getId(), r.getOrigen(), r.getDestino(), r.getDistanciaKm(),
                r.getDuracionMinutos(), r.getPrecioBase(),
                ordenadas.stream().map(Terminal::getId).toList(),
                ordenadas.stream().map(Terminal::getNombre).toList());
    }
}
