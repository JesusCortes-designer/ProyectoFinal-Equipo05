package com.equipo05.terminal.excepcion;

// se lanza cuando no existe lo que piden (404)
public class RecursoNoEncontradoExcepcion extends RuntimeException {

    public RecursoNoEncontradoExcepcion(String mensaje) {
        super(mensaje);
    }
}
