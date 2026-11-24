package com.equipo05.terminal.repositorio;

import com.equipo05.terminal.modelo.Taquillero;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TaquilleroRepositorio extends JpaRepository<Taquillero, Long> {

    @EntityGraph(attributePaths = "usuario")
    Optional<Taquillero> findByUsuarioCorreo(String correo);

    Optional<Taquillero> findByUsuarioId(Long usuarioId);
}
