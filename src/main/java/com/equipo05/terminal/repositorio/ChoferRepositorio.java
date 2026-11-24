package com.equipo05.terminal.repositorio;

import com.equipo05.terminal.modelo.Chofer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChoferRepositorio extends JpaRepository<Chofer, Long> {

    boolean existsByLicencia(String licencia);

    boolean existsByLicenciaAndIdNot(String licencia, Long id);

    @EntityGraph(attributePaths = "terminal")
    @Query("select c from Chofer c where "
            + "lower(c.nombre) like lower(concat('%', :buscar, '%')) "
            + "or lower(c.apellido) like lower(concat('%', :buscar, '%')) "
            + "or lower(c.licencia) like lower(concat('%', :buscar, '%'))")
    Page<Chofer> buscar(@Param("buscar") String buscar, Pageable pageable);
}
