package com.equipo05.terminal.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

// aqui se guardan los datos extra del cliente (el telefono se usa para sms y whatsapp)
@Entity
@Table(name = "cliente")
@BatchSize(size = 50)
@Getter
@Setter
@NoArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String telefono;

    // aqui se guarda el usuario con el que inicia sesion
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "usuario_id", unique = true)
    private Usuario usuario;
}
