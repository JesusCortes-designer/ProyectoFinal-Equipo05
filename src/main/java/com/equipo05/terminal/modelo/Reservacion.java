package com.equipo05.terminal.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// aqui se guarda la reservacion que hace un cliente y genera uno o varios boletos
@Entity
@Table(name = "reservacion")
@BatchSize(size = 50)
@Getter
@Setter
@NoArgsConstructor
public class Reservacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime fechaReservacion;

    // CONFIRMADA o CANCELADA
    @Column(nullable = false, length = 20)
    private String estado;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    // aqui se guarda el cliente que la realiza
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    // aqui se guardan los boletos que genera la reservacion
    @OneToMany(mappedBy = "reservacion", cascade = CascadeType.ALL)
    @BatchSize(size = 50)
    private List<Boleto> boletos = new ArrayList<>();
}
