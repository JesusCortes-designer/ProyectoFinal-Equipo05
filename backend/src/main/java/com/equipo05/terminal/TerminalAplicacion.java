package com.equipo05.terminal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class TerminalAplicacion {

    public static void main(String[] args) {
        SpringApplication.run(TerminalAplicacion.class, args);
    }
}
