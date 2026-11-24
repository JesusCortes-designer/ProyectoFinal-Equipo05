package com.equipo05.terminal.repositorio;

import com.equipo05.terminal.modelo.Terminal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TerminalRepositorio extends JpaRepository<Terminal, Long> {

    @EntityGraph(attributePaths = "administrador")
    @Query("select t from Terminal t where "
            + "lower(t.nombre) like lower(concat('%', :buscar, '%')) "
            + "or lower(t.ciudad) like lower(concat('%', :buscar, '%'))")
    Page<Terminal> buscar(@Param("buscar") String buscar, Pageable pageable);
}
