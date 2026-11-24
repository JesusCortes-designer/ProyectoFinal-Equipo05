package com.equipo05.terminal.seguridad;

import com.equipo05.terminal.dto.respuesta.ErrorRespuesta;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class ConfiguracionSeguridad {

    private final JwtFiltro jwtFiltro;
    private final ObjectMapper objectMapper;

    @Value("${app.cors.origenes}")
    private String origenesPermitidos;

    @Bean
    public SecurityFilterChain cadenaDeSeguridad(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(c -> c.configurationSource(configuracionCors()))
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(a -> a
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/error").permitAll()
                        .anyRequest().authenticated())
                .exceptionHandling(e -> e
                        // sin token o token malo: 401
                        .authenticationEntryPoint((req, res, ex) -> escribirError(res, 401, "No autenticado",
                                "Token ausente, inválido o vencido"))
                        // con token pero sin permiso: 403
                        .accessDeniedHandler((req, res, ex) -> escribirError(res, 403, "Acceso denegado",
                                "No tienes permiso para este recurso")))
                .addFilterBefore(jwtFiltro, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    // aqui se hashean las contrasenas con bcrypt
    @Bean
    public PasswordEncoder codificadorContrasenas() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager administradorAutenticacion(AuthenticationConfiguration configuracion)
            throws Exception {
        return configuracion.getAuthenticationManager();
    }

    // aqui se permite que el frontend llame a la api
    @Bean
    public CorsConfigurationSource configuracionCors() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.stream(origenesPermitidos.split(",")).map(String::trim).toList());
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        UrlBasedCorsConfigurationSource fuente = new UrlBasedCorsConfigurationSource();
        fuente.registerCorsConfiguration("/**", config);
        return fuente;
    }

    private void escribirError(HttpServletResponse res, int estado, String error, String mensaje)
            throws IOException {
        res.setStatus(estado);
        res.setContentType(MediaType.APPLICATION_JSON_VALUE);
        res.setCharacterEncoding("UTF-8");
        objectMapper.writeValue(res.getWriter(), ErrorRespuesta.de(estado, error, mensaje));
    }
}
