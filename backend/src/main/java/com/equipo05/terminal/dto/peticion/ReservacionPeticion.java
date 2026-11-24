package com.equipo05.terminal.dto.peticion;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record ReservacionPeticion(
        @NotNull(message = "El viaje es obligatorio")
        Long viajeId,

        @NotEmpty(message = "Selecciona al menos un asiento")
        List<@NotNull(message = "Asiento no válido") @Min(value = 1, message = "Asiento no válido") Integer> asientos) {
}
