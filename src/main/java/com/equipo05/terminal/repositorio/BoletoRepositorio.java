package com.equipo05.terminal.repositorio;

import com.equipo05.terminal.modelo.Boleto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoletoRepositorio extends JpaRepository<Boleto, Long> {

    // sirve para saber si el asiento ya esta tomado en ese viaje
    boolean existsByViajeIdAndNumeroAsientoAndEstadoNot(Long viajeId, Integer numeroAsiento, String estado);

    @Query("select b.numeroAsiento from Boleto b where b.viaje.id = :viajeId and b.estado <> 'CANCELADO' order by b.numeroAsiento")
    List<Integer> asientosOcupados(@Param("viajeId") Long viajeId);

    // lista para admin y taquillero, estado vacio = todos
    @EntityGraph(attributePaths = {"viaje", "viaje.ruta"})
    @Query("select b from Boleto b where lower(b.codigo) like lower(concat('%', :buscar, '%')) "
            + "and (:estado = '' or b.estado = :estado)")
    Page<Boleto> buscar(@Param("buscar") String buscar, @Param("estado") String estado, Pageable pageable);

    // lista para el cliente, solo los suyos
    @EntityGraph(attributePaths = {"viaje", "viaje.ruta"})
    @Query("select b from Boleto b where b.reservacion.cliente.usuario.correo = :correo")
    Page<Boleto> buscarDeCliente(@Param("correo") String correo, Pageable pageable);
}
