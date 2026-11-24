package com.equipo05.terminal.repositorio;

import com.equipo05.terminal.modelo.TokenInvalidado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenInvalidadoRepositorio extends JpaRepository<TokenInvalidado, Long> {

    boolean existsByHuella(String huella);
}
