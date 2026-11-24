package com.equipo05.terminal.excepcion;

// se lanza cuando los datos no cumplen una regla del negocio (400)
public class DatosInvalidosExcepcion extends RuntimeException {

    public DatosInvalidosExcepcion(String mensaje) {
        super(mensaje);
    }
}
