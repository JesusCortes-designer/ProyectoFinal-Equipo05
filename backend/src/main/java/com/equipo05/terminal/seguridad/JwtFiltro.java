package com.equipo05.terminal.seguridad;

import com.equipo05.terminal.repositorio.TokenInvalidadoRepositorio;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// aqui se revisa el token del header Authorization en cada peticion
@Component
@RequiredArgsConstructor
public class JwtFiltro extends OncePerRequestFilter {

    private final JwtServicio jwtServicio;
    private final DetallesUsuarioServicio detallesUsuarioServicio;
    private final TokenInvalidadoRepositorio tokenInvalidadoRepositorio;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain cadena) throws ServletException, IOException {
        String cabecera = request.getHeader("Authorization");

        if (cabecera != null && cabecera.startsWith("Bearer ")) {
            String token = cabecera.substring(7);
            try {
                Claims datos = jwtServicio.leer(token);
                boolean cerroSesion = tokenInvalidadoRepositorio.existsByHuella(jwtServicio.huella(token));

                if (!cerroSesion && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails usuario = detallesUsuarioServicio.loadUserByUsername(datos.getSubject());
                    if (usuario.isEnabled()) {
                        var autenticacion = new UsernamePasswordAuthenticationToken(
                                usuario, null, usuario.getAuthorities());
                        autenticacion.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(autenticacion);
                    }
                }
            } catch (JwtException | IllegalArgumentException | UsernameNotFoundException e) {
                // token malo o vencido: sigue sin autenticar y el entry point regresa 401
            }
        }

        cadena.doFilter(request, response);
    }
}
