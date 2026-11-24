package com.equipo05.terminal.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

// aqui se guardan los autobuses de cada terminal
@Entity
@Table(name = "autobus")
@BatchSize(size = 50)
@Getter
@Setter
@NoArgsConstructor
public class Autobus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String placa;

    @Column(nullable = false, length = 60)
    private String modelo;

    @Column(nullable = false)
    private Integer capacidad;

    // DISPONIBLE, EN_VIAJE o MANTENIMIENTO
    @Column(nullable = false, length = 20)
    private String estado;

    // aqui se guarda la terminal a la que pertenece
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "terminal_id")
    private Terminal terminal;
}
