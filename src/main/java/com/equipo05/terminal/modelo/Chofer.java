package com.equipo05.terminal.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

// aqui se guardan los choferes que asigna cada terminal (no inician sesion)
@Entity
@Table(name = "chofer")
@BatchSize(size = 50)
@Getter
@Setter
@NoArgsConstructor
public class Chofer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 60)
    private String nombre;

    @Column(nullable = false, length = 60)
    private String apellido;

    @Column(nullable = false, unique = true, length = 30)
    private String licencia;

    @Column(nullable = false, length = 20)
    private String telefono;

    // aqui se guarda la terminal que lo asigna
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "terminal_id")
    private Terminal terminal;
}
