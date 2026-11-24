package com.equipo05.terminal.dto.respuesta;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.function.Function;

// aqui se arma la respuesta paginada (la pagina empieza en 1)
public record PaginaRespuesta<T>(
        List<T> contenido,
        int pagina,
        int tamano,
        long totalElementos,
        int totalPaginas) {

    public static <E, T> PaginaRespuesta<T> de(Page<E> pagina, Function<E, T> convertir) {
        return new PaginaRespuesta<>(
                pagina.getContent().stream().map(convertir).toList(),
                pagina.getNumber() + 1,
                pagina.getSize(),
                pagina.getTotalElements(),
                pagina.getTotalPages());
    }

    // convierte pagina (desde 1) y tamano a un Pageable, con tope de 100 por pagina
    public static Pageable pedir(int pagina, int tamano, Sort orden) {
        int paginaSegura = Math.max(pagina, 1) - 1;
        int tamanoSeguro = Math.min(Math.max(tamano, 1), 100);
        return PageRequest.of(paginaSegura, tamanoSeguro, orden);
    }
}
