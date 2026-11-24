package com.equipo05.terminal.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

// aqui se guarda quien puede iniciar sesion (admin, taquillero y cliente comparten esta tabla)
@Entity
@Table(name = "usuario")
@BatchSize(size = 50)
@Getter
@Setter
@NoArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 60)
    private String nombre;

    @Column(nullable = false, length = 60)
    private String apellido;

    @Column(nullable = false, unique = true, length = 120)
    private String correo;

    // aqui va la contrasena ya hasheada con bcrypt
    @Column(nullable = false, length = 100)
    private String contrasena;

    @Column(nullable = false)
    private Integer edad;

    @Column(nullable = false)
    private Boolean activo = true;

    // aqui se guarda el rol del usuario
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "rol_id")
    private Rol rol;
}
