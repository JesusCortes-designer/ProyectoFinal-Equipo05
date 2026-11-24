package com.equipo05.terminal.repositorio;

import com.equipo05.terminal.modelo.Ruta;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RutaRepositorio extends JpaRepository<Ruta, Long> {

    // las terminales de la ruta se cargan en lote (BatchSize) para evitar el problema n+1
    @Query("select r from Ruta r where "
            + "lower(r.origen) like lower(concat('%', :buscar, '%')) "
            + "or lower(r.destino) like lower(concat('%', :buscar, '%'))")
    Page<Ruta> buscar(@Param("buscar") String buscar, Pageable pageable);
}
