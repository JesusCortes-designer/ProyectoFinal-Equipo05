package com.equipo05.terminal.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// aqui se guardan los 3 niveles de acceso (administrador, taquillero, cliente)
@Entity
@Table(name = "rol")
@Getter
@Setter
@NoArgsConstructor
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String nombre;
}
