package com.equipo05.terminal.seguridad;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.HexFormat;

// aqui se crean y se leen los tokens jwt
@Service
public class JwtServicio {

    private final SecretKey llave;
    private final long expiracionMs;

    public JwtServicio(@Value("${app.jwt.secreto}") String secreto,
                       @Value("${app.jwt.expiracionMs}") long expiracionMs) {
        this.llave = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secreto));
        this.expiracionMs = expiracionMs;
    }

    public String generarToken(String correo, String rol) {
        Date ahora = new Date();
        return Jwts.builder()
                .subject(correo)
                .claim("rol", rol)
                .issuedAt(ahora)
                .expiration(new Date(ahora.getTime() + expiracionMs))
                .signWith(llave)
                .compact();
    }

    // lanza JwtException si el token esta mal o vencido
    public Claims leer(String token) {
        return Jwts.parser().verifyWith(llave).build().parseSignedClaims(token).getPayload();
    }

    // en la base solo se guarda la huella del token, no el token completo
    public String huella(String token) {
        try {
            byte[] hash = MessageDigest.getInstance("SHA-256").digest(token.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(e);
        }
    }
}
