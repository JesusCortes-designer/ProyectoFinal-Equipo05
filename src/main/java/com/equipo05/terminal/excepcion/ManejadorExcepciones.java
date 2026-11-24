package com.equipo05.terminal.excepcion;

import com.equipo05.terminal.dto.respuesta.ErrorRespuesta;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.LinkedHashMap;
import java.util.Map;

// aqui se atrapan todos los errores y se regresan en json con su codigo http
@RestControllerAdvice
@Slf4j
public class ManejadorExcepciones {

    // datos del body que no pasaron las validaciones (422)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorRespuesta> validacion(MethodArgumentNotValidException ex) {
        Map<String, String> campos = new LinkedHashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(e -> campos.putIfAbsent(e.getField(), e.getDefaultMessage()));
        return responder(HttpStatus.UNPROCESSABLE_ENTITY, "Datos inválidos",
                "Revisa los campos enviados", campos);
    }

    // parametros de la url que no pasaron las validaciones (422)
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorRespuesta> restricciones(ConstraintViolationException ex) {
        Map<String, String> campos = new LinkedHashMap<>();
        ex.getConstraintViolations().forEach(v -> campos.put(v.getPropertyPath().toString(), v.getMessage()));
        return responder(HttpStatus.UNPROCESSABLE_ENTITY, "Datos inválidos",
                "Revisa los parámetros enviados", campos);
    }

    // json mal formado o tipos que no coinciden (400)
    @ExceptionHandler({HttpMessageNotReadableException.class, MethodArgumentTypeMismatchException.class})
    public ResponseEntity<ErrorRespuesta> peticionMala(Exception ex) {
        return responder(HttpStatus.BAD_REQUEST, "Petición incorrecta",
                "El formato de la petición no es válido", null);
    }

    @ExceptionHandler(DatosInvalidosExcepcion.class)
    public ResponseEntity<ErrorRespuesta> datosInvalidos(DatosInvalidosExcepcion ex) {
        return responder(HttpStatus.BAD_REQUEST, "Petición incorrecta", ex.getMessage(), null);
    }

    @ExceptionHandler({BadCredentialsException.class, DisabledException.class})
    public ResponseEntity<ErrorRespuesta> credenciales(Exception ex) {
        return responder(HttpStatus.UNAUTHORIZED, "No autenticado",
                "Correo o contraseña incorrectos", null);
    }

    @ExceptionHandler({AccessDeniedException.class, AccesoDenegadoExcepcion.class})
    public ResponseEntity<ErrorRespuesta> accesoDenegado(Exception ex) {
        String mensaje = ex instanceof AccesoDenegadoExcepcion ? ex.getMessage()
                : "No tienes permiso para este recurso";
        return responder(HttpStatus.FORBIDDEN, "Acceso denegado", mensaje, null);
    }

    @ExceptionHandler({RecursoNoEncontradoExcepcion.class, NoResourceFoundException.class})
    public ResponseEntity<ErrorRespuesta> noEncontrado(Exception ex) {
        String mensaje = ex instanceof RecursoNoEncontradoExcepcion ? ex.getMessage()
                : "El recurso solicitado no existe";
        return responder(HttpStatus.NOT_FOUND, "No encontrado", mensaje, null);
    }

    // por ejemplo correo repetido o borrar algo que tiene datos relacionados (409)
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorRespuesta> integridad(DataIntegrityViolationException ex) {
        return responder(HttpStatus.CONFLICT, "Conflicto",
                "La operación choca con datos existentes (duplicado o con registros relacionados)", null);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorRespuesta> generico(Exception ex) {
        log.error("Error no controlado", ex);
        return responder(HttpStatus.INTERNAL_SERVER_ERROR, "Error del servidor",
                "Ocurrió un error inesperado, intenta más tarde", null);
    }

    private ResponseEntity<ErrorRespuesta> responder(HttpStatus estado, String error, String mensaje,
                                                     Map<String, String> campos) {
        return ResponseEntity.status(estado)
                .body(ErrorRespuesta.de(estado.value(), error, mensaje, campos));
    }
}
