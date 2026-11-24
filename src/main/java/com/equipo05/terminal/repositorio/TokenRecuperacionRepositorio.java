package com.equipo05.terminal.repositorio;

import com.equipo05.terminal.modelo.TokenRecuperacion;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRecuperacionRepositorio extends JpaRepository<TokenRecuperacion, Long> {

    @EntityGraph(attributePaths = "usuario")
    Optional<TokenRecuperacion> findByToken(String token);
}
