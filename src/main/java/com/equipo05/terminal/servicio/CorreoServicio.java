package com.equipo05.terminal.servicio;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

// aqui se mandan los correos usando el postfix del vps
@Service
@RequiredArgsConstructor
@Slf4j
public class CorreoServicio {

    private final JavaMailSender enviadorCorreo;

    @Value("${app.correo.remitente}")
    private String remitente;

    @Async
    public void enviar(String para, String asunto, String texto) {
        try {
            SimpleMailMessage mensaje = new SimpleMailMessage();
            mensaje.setFrom(remitente);
            mensaje.setTo(para);
            mensaje.setSubject(asunto);
            mensaje.setText(texto);
            enviadorCorreo.send(mensaje);
        } catch (Exception e) {
            // si falla el correo no se tumba la operacion principal
            log.warn("No se pudo enviar el correo a {}: {}", para, e.getMessage());
        }
    }
}
