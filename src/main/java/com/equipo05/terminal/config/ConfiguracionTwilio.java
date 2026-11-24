package com.equipo05.terminal.config;

import com.twilio.Twilio;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

// aqui se inicia twilio con las credenciales del application.properties
@Configuration
@Slf4j
public class ConfiguracionTwilio {

    @Value("${twilio.accountSid:}")
    private String accountSid;

    @Value("${twilio.authToken:}")
    private String authToken;

    @PostConstruct
    public void iniciar() {
        if (accountSid.isBlank() || authToken.isBlank()) {
            log.warn("Twilio sin credenciales, no se enviaran sms ni whatsapp");
            return;
        }
        Twilio.init(accountSid, authToken);
    }
}
