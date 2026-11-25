package com.equipo05.terminal.servicio;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.util.List;
import java.util.Map;

// aqui se mandan los mensajes de whatsapp con infobip
@Service
@Slf4j
public class WhatsappServicio {

    // solo el host, por ejemplo 3dy6zv.api.infobip.com (sin https://)
    @Value("${infobip.url:}")
    private String url;

    // api key que se genera en el panel de infobip
    @Value("${infobip.apiKey:}")
    private String apiKey;

    // numero remitente de infobip, solo digitos (ejemplo 447860088970)
    @Value("${infobip.remitente:}")
    private String remitente;

    // plantilla de prueba que trae la cuenta gratis
    @Value("${infobip.plantilla:test_whatsapp_template_en}")
    private String plantilla;

    private final RestClient cliente = RestClient.create();

    @Async
    public void enviar(String telefono, String texto, Map<String, String> variables) {
        if (url.isBlank() || apiKey.isBlank() || remitente.isBlank()) {
            log.warn("WhatsApp no enviado, falta configurar infobip.url, infobip.apiKey e infobip.remitente");
            return;
        }
        // infobip quiere el numero solo con digitos, sin + ni espacios
        String destino = telefono.replaceAll("[^0-9]", "");
        String nombre = (variables == null) ? "cliente" : variables.getOrDefault("1", "cliente");

        // 1. plantilla aprobada, es la unica forma de iniciar el chat
        Map<String, Object> mensajePlantilla = Map.of(
                "from", remitente.trim(),
                "to", destino,
                "content", Map.of(
                        "templateName", plantilla.trim(),
                        "templateData", Map.of("body", Map.of("placeholders", List.of(nombre))),
                        "language", "en"));
        mandar("/whatsapp/1/message/template", Map.of("messages", List.of(mensajePlantilla)), destino, "plantilla");

        // 2. texto con los datos de la reservacion, solo llega si el cliente ya le escribio a infobip (24 horas)
        Map<String, Object> mensajeTexto = Map.of(
                "from", remitente.trim(),
                "to", destino,
                "content", Map.of("text", texto));
        mandar("/whatsapp/1/message/text", mensajeTexto, destino, "texto");
    }

    // aqui se hace la peticion a infobip
    private void mandar(String ruta, Object cuerpo, String destino, String tipo) {
        try {
            cliente.post()
                    .uri("https://" + url.trim() + ruta)
                    .header("Authorization", "App " + apiKey.trim())
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .body(cuerpo)
                    .retrieve()
                    .toBodilessEntity();
            log.info("WhatsApp ({}) enviado a {}", tipo, destino);
        } catch (RestClientResponseException e) {
            log.warn("No se pudo enviar el whatsapp ({}) a {}: {} {}", tipo, destino, e.getStatusCode(), e.getResponseBodyAsString());
        } catch (Exception e) {
            log.warn("No se pudo enviar el whatsapp ({}) a {}: {}", tipo, destino, e.getMessage());
        }
    }
}