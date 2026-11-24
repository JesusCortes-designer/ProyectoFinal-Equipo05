package com.equipo05.terminal.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

import java.math.BigDecimal;

// aqui se guarda cada boleto, viene de una reservacion o lo vende un taquillero
@Entity
@Table(name = "boleto")
@BatchSize(size = 50)
@Getter
@Setter
@NoArgsConstructor
public class Boleto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String codigo;

    @Column(nullable = false)
    private Integer numeroAsiento;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    // ACTIVO o CANCELADO
    @Column(nullable = false, length = 20)
    private String estado;

    // aqui se guarda la reservacion que lo genero (null si se vendio en taquilla)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservacion_id")
    private Reservacion reservacion;

    // aqui se guarda el taquillero que lo vendio (null si fue por reservacion)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "taquillero_id")
    private Taquillero taquillero;

    // aqui se guarda el viaje al que pertenece
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "viaje_id")
    private Viaje viaje;
}
