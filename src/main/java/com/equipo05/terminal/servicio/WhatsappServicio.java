package com.equipo05.terminal.servicio;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

// aqui se mandan los mensajes de whatsapp con twilio
@Service
@Slf4j
public class WhatsappServicio {

    @Value("${twilio.accountSid:}")
    private String accountSid;

    @Value("${twilio.numeroWhatsapp:}")
    private String numeroOrigen;

    @Async
    public void enviar(String telefono, String texto) {
        if (accountSid.isBlank() || numeroOrigen.isBlank()) {
            log.warn("WhatsApp no enviado, falta configurar twilio");
            return;
        }
        try {
            Message.creator(
                    new PhoneNumber("whatsapp:" + telefono),
                    new PhoneNumber("whatsapp:" + numeroOrigen),
                    texto).create();
        } catch (Exception e) {
            log.warn("No se pudo enviar el whatsapp a {}: {}", telefono, e.getMessage());
        }
    }
}
