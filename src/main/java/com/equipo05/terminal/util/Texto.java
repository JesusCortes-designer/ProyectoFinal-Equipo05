package com.equipo05.terminal.util;

public final class Texto {

    private Texto() {
    }

    // los filtros vacios llegan como "" y asi las consultas no reciben null
    public static String limpiar(String texto) {
        return texto == null ? "" : texto.trim();
    }
}
