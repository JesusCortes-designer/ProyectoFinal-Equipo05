package com.equipo05.terminal.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

// aqui se guardan las terminales que administra el administrador
@Entity
@Table(name = "terminal")
@BatchSize(size = 50)
@Getter
@Setter
@NoArgsConstructor
public class Terminal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 80)
    private String ciudad;

    @Column(nullable = false, length = 200)
    private String direccion;

    // aqui se guarda el administrador que la administra
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "administrador_id")
    private Usuario administrador;
}
