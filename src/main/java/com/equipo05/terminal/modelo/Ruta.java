package com.equipo05.terminal.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

// aqui se guardan las rutas que recorren los viajes
@Entity
@Table(name = "ruta")
@BatchSize(size = 50)
@Getter
@Setter
@NoArgsConstructor
public class Ruta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String origen;

    @Column(nullable = false, length = 80)
    private String destino;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal distanciaKm;

    @Column(nullable = false)
    private Integer duracionMinutos;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precioBase;

    // aqui se guardan las terminales por las que pasa la ruta (relacion muchos a muchos)
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "ruta_terminal",
            joinColumns = @JoinColumn(name = "ruta_id"),
            inverseJoinColumns = @JoinColumn(name = "terminal_id"))
    @BatchSize(size = 50)
    private Set<Terminal> terminales = new HashSet<>();
}
