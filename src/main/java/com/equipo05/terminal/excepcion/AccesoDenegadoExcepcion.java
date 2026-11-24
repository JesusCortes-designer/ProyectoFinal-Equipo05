package com.equipo05.terminal.excepcion;

// se lanza cuando el usuario no puede tocar ese recurso (403)
public class AccesoDenegadoExcepcion extends RuntimeException {

    public AccesoDenegadoExcepcion(String mensaje) {
        super(mensaje);
    }
}
