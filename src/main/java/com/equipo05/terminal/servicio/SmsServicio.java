package com.equipo05.terminal.servicio;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

// aqui se mandan los sms con twilio
@Service
@Slf4j
public class SmsServicio {

    @Value("${twilio.accountSid:}")
    private String accountSid;

    @Value("${twilio.numeroSms:}")
    private String numeroOrigen;

    @Async
    public void enviar(String telefono, String texto) {
        if (accountSid.isBlank() || numeroOrigen.isBlank()) {
            log.warn("SMS no enviado, falta configurar twilio");
            return;
        }
        try {
            Message.creator(new PhoneNumber(telefono), new PhoneNumber(numeroOrigen), texto).create();
        } catch (Exception e) {
            log.warn("No se pudo enviar el sms a {}: {}", telefono, e.getMessage());
        }
    }
}
