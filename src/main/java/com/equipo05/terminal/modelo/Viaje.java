package com.equipo05.terminal.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

import java.time.LocalDateTime;

// aqui se guarda cada viaje: que autobus, que chofer y que ruta
@Entity
@Table(name = "viaje")
@BatchSize(size = 50)
@Getter
@Setter
@NoArgsConstructor
public class Viaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime fechaSalida;

    @Column(nullable = false)
    private LocalDateTime fechaLlegada;

    // PROGRAMADO, EN_CURSO, FINALIZADO o CANCELADO
    @Column(nullable = false, length = 20)
    private String estado;

    // aqui se guarda el autobus que realiza el viaje
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "autobus_id")
    private Autobus autobus;

    // aqui se guarda el chofer que lo conduce
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "chofer_id")
    private Chofer chofer;

    // aqui se guarda la ruta que recorre
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ruta_id")
    private Ruta ruta;
}
