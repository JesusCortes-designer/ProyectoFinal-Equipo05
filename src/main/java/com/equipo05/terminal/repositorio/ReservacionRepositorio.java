package com.equipo05.terminal.repositorio;

import com.equipo05.terminal.modelo.Reservacion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReservacionRepositorio extends JpaRepository<Reservacion, Long> {

    // lista para el admin, estado vacio = todas
    @EntityGraph(attributePaths = {"cliente", "cliente.usuario"})
    @Query("select r from Reservacion r where (:estado = '' or r.estado = :estado)")
    Page<Reservacion> buscar(@Param("estado") String estado, Pageable pageable);

    // lista para el cliente, solo las suyas
    @EntityGraph(attributePaths = {"cliente", "cliente.usuario"})
    @Query("select r from Reservacion r where r.cliente.usuario.correo = :correo")
    Page<Reservacion> buscarDeCliente(@Param("correo") String correo, Pageable pageable);
}
