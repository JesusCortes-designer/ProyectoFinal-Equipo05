package com.equipo05.terminal.repositorio;

import com.equipo05.terminal.modelo.Autobus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AutobusRepositorio extends JpaRepository<Autobus, Long> {

    boolean existsByPlaca(String placa);

    boolean existsByPlacaAndIdNot(String placa, Long id);

    // estado vacio = todos
    @EntityGraph(attributePaths = "terminal")
    @Query("select a from Autobus a where "
            + "(lower(a.placa) like lower(concat('%', :buscar, '%')) "
            + "or lower(a.modelo) like lower(concat('%', :buscar, '%'))) "
            + "and (:estado = '' or a.estado = :estado)")
    Page<Autobus> buscar(@Param("buscar") String buscar, @Param("estado") String estado, Pageable pageable);
}
