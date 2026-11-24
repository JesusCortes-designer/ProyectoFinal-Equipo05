package com.equipo05.terminal.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

// aqui se guardan los datos extra del taquillero
@Entity
@Table(name = "taquillero")
@BatchSize(size = 50)
@Getter
@Setter
@NoArgsConstructor
public class Taquillero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String numeroEmpleado;

    // aqui se guarda el usuario con el que inicia sesion
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "usuario_id", unique = true)
    private Usuario usuario;
}
