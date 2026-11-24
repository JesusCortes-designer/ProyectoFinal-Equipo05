package com.equipo05.terminal.repositorio;

import com.equipo05.terminal.modelo.Cliente;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepositorio extends JpaRepository<Cliente, Long> {

    @EntityGraph(attributePaths = "usuario")
    Optional<Cliente> findByUsuarioCorreo(String correo);

    Optional<Cliente> findByUsuarioId(Long usuarioId);
}
