package com.equipo05.terminal.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

// aqui se guardan los tokens jwt a los que ya se les hizo logout (solo la huella sha-256)
@Entity
@Table(name = "token_invalidado")
@Getter
@Setter
@NoArgsConstructor
public class TokenInvalidado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 64)
    private String huella;

    @Column(nullable = false)
    private LocalDateTime fechaExpiracion;
}
