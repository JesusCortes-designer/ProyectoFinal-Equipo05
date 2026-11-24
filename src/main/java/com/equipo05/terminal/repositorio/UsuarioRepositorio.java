package com.equipo05.terminal.repositorio;

import com.equipo05.terminal.modelo.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

    // se trae el rol junto con el usuario para no hacer consultas de mas
    @EntityGraph(attributePaths = "rol")
    Optional<Usuario> findByCorreo(String correo);

    boolean existsByCorreo(String correo);

    // aqui se filtra y se pagina en la base de datos (rol vacio = todos)
    @EntityGraph(attributePaths = "rol")
    @Query("select u from Usuario u where "
            + "(lower(u.nombre) like lower(concat('%', :buscar, '%')) "
            + "or lower(u.apellido) like lower(concat('%', :buscar, '%')) "
            + "or lower(u.correo) like lower(concat('%', :buscar, '%'))) "
            + "and (:rol = '' or u.rol.nombre = :rol)")
    Page<Usuario> buscar(@Param("buscar") String buscar, @Param("rol") String rol, Pageable pageable);
}
