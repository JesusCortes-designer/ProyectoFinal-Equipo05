package com.equipo05.terminal.dto.peticion;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

// aqui llegan los datos cuando el taquillero vende un boleto en ventanilla
public record BoletoPeticion(
        @NotNull(message = "El viaje es obligatorio")
        Long viajeId,

        @NotNull(message = "El asiento es obligatorio")
        @Min(value = 1, message = "Asiento no válido")
        Integer numeroAsiento) {
}
