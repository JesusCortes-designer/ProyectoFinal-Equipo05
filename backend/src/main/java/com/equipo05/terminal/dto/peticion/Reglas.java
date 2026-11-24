package com.equipo05.terminal.dto.peticion;

// aqui estan las reglas que se repiten en varios dto
public final class Reglas {

    private Reglas() {
    }

    // minimo 8 caracteres, una mayuscula, un numero y un caracter especial
    public static final String CONTRASENA = "^(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$";

    public static final String MENSAJE_CONTRASENA =
            "La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un carácter especial";

    // telefono con lada, ejemplo +525512345678
    public static final String TELEFONO = "^\\+[0-9]{10,15}$";

    public static final String MENSAJE_TELEFONO = "El teléfono debe llevar lada, ejemplo +525512345678";

    public static final String ROL = "ADMINISTRADOR|TAQUILLERO|CLIENTE";
}
