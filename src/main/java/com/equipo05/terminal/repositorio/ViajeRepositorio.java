package com.equipo05.terminal.repositorio;

import com.equipo05.terminal.modelo.Viaje;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ViajeRepositorio extends JpaRepository<Viaje, Long> {

    // estado vacio = todos
    @EntityGraph(attributePaths = {"autobus", "chofer", "ruta"})
    @Query("select v from Viaje v where "
            + "lower(v.ruta.origen) like lower(concat('%', :origen, '%')) "
            + "and lower(v.ruta.destino) like lower(concat('%', :destino, '%')) "
            + "and (:estado = '' or v.estado = :estado)")
    Page<Viaje> buscar(@Param("origen") String origen, @Param("destino") String destino,
                       @Param("estado") String estado, Pageable pageable);
}
