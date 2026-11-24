package com.equipo05.terminal.config;

import com.equipo05.terminal.modelo.*;
import com.equipo05.terminal.repositorio.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// aqui se cargan los datos de prueba la primera vez que arranca la app (si no hay usuarios)
@Component
@RequiredArgsConstructor
@Slf4j
public class SemillaDatos implements CommandLineRunner {

    private final RolRepositorio rolRepositorio;
    private final UsuarioRepositorio usuarioRepositorio;
    private final ClienteRepositorio clienteRepositorio;
    private final TaquilleroRepositorio taquilleroRepositorio;
    private final TerminalRepositorio terminalRepositorio;
    private final AutobusRepositorio autobusRepositorio;
    private final ChoferRepositorio choferRepositorio;
    private final RutaRepositorio rutaRepositorio;
    private final ViajeRepositorio viajeRepositorio;
    private final ReservacionRepositorio reservacionRepositorio;
    private final BoletoRepositorio boletoRepositorio;
    private final PasswordEncoder codificador;

    @Override
    @Transactional
    public void run(String... args) {
        if (usuarioRepositorio.count() > 0) {
            return;
        }

        Rol rolAdmin = buscarRol("ADMINISTRADOR");
        Rol rolTaquillero = buscarRol("TAQUILLERO");
        Rol rolCliente = buscarRol("CLIENTE");

        // se hashea una sola vez por grupo para que el arranque sea rapido
        String hashAdmin = codificador.encode("Admin123!");
        String hashTaquillero = codificador.encode("Taquilla123!");
        String hashCliente = codificador.encode("Cliente123!");

        // 1 administrador
        Usuario admin = crearUsuario("Ana", "Administradora", "admin@terminal.com", hashAdmin, 35, rolAdmin);

        // 3 taquilleros
        String[] nombresTaquilleros = {"Luis", "Marta", "Jorge"};
        List<Taquillero> taquilleros = new ArrayList<>();
        for (int i = 0; i < nombresTaquilleros.length; i++) {
            String correo = i == 0 ? "taquillero@terminal.com" : "taquillero" + (i + 1) + "@terminal.com";
            Usuario usuario = crearUsuario(nombresTaquilleros[i], "Ramírez", correo, hashTaquillero, 28 + i, rolTaquillero);
            Taquillero taquillero = new Taquillero();
            taquillero.setNumeroEmpleado("TAQ-00" + (i + 1));
            taquillero.setUsuario(usuario);
            taquilleros.add(taquilleroRepositorio.save(taquillero));
        }

        // 11 clientes
        String[] nombresClientes = {"Carlos", "Lucía", "Pedro", "Sofía", "Miguel", "Valeria",
                "Diego", "Camila", "Andrés", "Fernanda", "Raúl"};
        List<Cliente> clientes = new ArrayList<>();
        for (int i = 0; i < nombresClientes.length; i++) {
            String correo = i == 0 ? "cliente@terminal.com" : "cliente" + (i + 1) + "@terminal.com";
            Usuario usuario = crearUsuario(nombresClientes[i], "Hernández", correo, hashCliente, 20 + i, rolCliente);
            Cliente cliente = new Cliente();
            cliente.setTelefono(String.format("+52551000%04d", i + 1));
            cliente.setUsuario(usuario);
            clientes.add(clienteRepositorio.save(cliente));
        }

        // 10 terminales
        String[] ciudades = {"Ciudad de México", "Puebla", "Oaxaca", "Guadalajara", "Monterrey",
                "Veracruz", "Querétaro", "Morelia", "Toluca", "Cuernavaca"};
        List<Terminal> terminales = new ArrayList<>();
        for (int i = 0; i < ciudades.length; i++) {
            Terminal terminal = new Terminal();
            terminal.setNombre("Terminal " + ciudades[i]);
            terminal.setCiudad(ciudades[i]);
            terminal.setDireccion("Av. Central #" + (100 + i * 10) + ", " + ciudades[i]);
            terminal.setAdministrador(admin);
            terminales.add(terminalRepositorio.save(terminal));
        }

        // 12 autobuses
        String[] modelos = {"Volvo 9800", "Mercedes-Benz O500", "Scania K360", "Irizar i6"};
        List<Autobus> autobuses = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            Autobus autobus = new Autobus();
            autobus.setPlaca(String.format("AUT-%03d", i + 1));
            autobus.setModelo(modelos[i % modelos.length]);
            autobus.setCapacidad(i % 3 == 0 ? 44 : 40);
            autobus.setEstado("DISPONIBLE");
            autobus.setTerminal(terminales.get(i % terminales.size()));
            autobuses.add(autobusRepositorio.save(autobus));
        }

        // 12 choferes
        String[] nombresChoferes = {"Roberto", "Héctor", "Javier", "Ernesto", "Gustavo", "Ricardo",
                "Armando", "Salvador", "Ignacio", "Félix", "Mauricio", "Teodoro"};
        List<Chofer> choferes = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            Chofer chofer = new Chofer();
            chofer.setNombre(nombresChoferes[i]);
            chofer.setApellido("Morales");
            chofer.setLicencia(String.format("LIC-%05d", 1000 + i));
            chofer.setTelefono(String.format("+52771000%04d", i + 1));
            chofer.setTerminal(terminales.get(i % terminales.size()));
            choferes.add(choferRepositorio.save(chofer));
        }

        // 10 rutas, cada una pasa por 3 terminales (muchos a muchos)
        List<Ruta> rutas = new ArrayList<>();
        for (int i = 0; i < ciudades.length; i++) {
            Ruta ruta = new Ruta();
            ruta.setOrigen(ciudades[i]);
            ruta.setDestino(ciudades[(i + 1) % ciudades.length]);
            ruta.setDistanciaKm(BigDecimal.valueOf(120 + i * 35L));
            ruta.setDuracionMinutos(120 + i * 20);
            ruta.setPrecioBase(BigDecimal.valueOf(180 + i * 25L));
            ruta.getTerminales().add(terminales.get(i));
            ruta.getTerminales().add(terminales.get((i + 1) % terminales.size()));
            ruta.getTerminales().add(terminales.get((i + 2) % terminales.size()));
            rutas.add(rutaRepositorio.save(ruta));
        }

        // 12 viajes programados
        List<Viaje> viajes = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            Ruta ruta = rutas.get(i % rutas.size());
            LocalDateTime salida = LocalDateTime.now().plusDays(i + 1L)
                    .withHour(6 + (i % 10)).withMinute(0).withSecond(0).withNano(0);
            Viaje viaje = new Viaje();
            viaje.setFechaSalida(salida);
            viaje.setFechaLlegada(salida.plusMinutes(ruta.getDuracionMinutos()));
            viaje.setEstado("PROGRAMADO");
            viaje.setAutobus(autobuses.get(i));
            viaje.setChofer(choferes.get(i));
            viaje.setRuta(ruta);
            viajes.add(viajeRepositorio.save(viaje));
        }

        // 10 reservaciones (las impares llevan 2 boletos, en total 15 boletos)
        int consecutivo = 1;
        for (int i = 0; i < 10; i++) {
            Viaje viaje = viajes.get(i);
            Reservacion reservacion = new Reservacion();
            reservacion.setFechaReservacion(LocalDateTime.now().minusDays(i));
            reservacion.setEstado("CONFIRMADA");
            reservacion.setCliente(clientes.get(i % clientes.size()));

            int cantidad = i % 2 == 1 ? 2 : 1;
            for (int j = 0; j < cantidad; j++) {
                Boleto boleto = new Boleto();
                boleto.setCodigo(String.format("BOL-SEED%03d", consecutivo++));
                boleto.setNumeroAsiento(i + 1 + j * 10);
                boleto.setPrecio(viaje.getRuta().getPrecioBase());
                boleto.setEstado("ACTIVO");
                boleto.setReservacion(reservacion);
                boleto.setViaje(viaje);
                reservacion.getBoletos().add(boleto);
            }
            reservacion.setTotal(viaje.getRuta().getPrecioBase().multiply(BigDecimal.valueOf(cantidad)));
            reservacionRepositorio.save(reservacion);
        }

        // 2 boletos vendidos en ventanilla por taquilleros
        for (int i = 0; i < 2; i++) {
            Viaje viaje = viajes.get(10 + i);
            Boleto boleto = new Boleto();
            boleto.setCodigo(String.format("BOL-SEEDT%02d", i + 1));
            boleto.setNumeroAsiento(5 + i);
            boleto.setPrecio(viaje.getRuta().getPrecioBase());
            boleto.setEstado("ACTIVO");
            boleto.setTaquillero(taquilleros.get(i));
            boleto.setViaje(viaje);
            boletoRepositorio.save(boleto);
        }

        log.info("Datos de prueba cargados. Admin: admin@terminal.com / Admin123!");
    }

    private Rol buscarRol(String nombre) {
        return rolRepositorio.findByNombre(nombre)
                .orElseThrow(() -> new IllegalStateException("Falta el rol " + nombre + " (revisa la migracion V2)"));
    }

    private Usuario crearUsuario(String nombre, String apellido, String correo, String contrasenaHash,
                                 int edad, Rol rol) {
        Usuario usuario = new Usuario();
        usuario.setNombre(nombre);
        usuario.setApellido(apellido);
        usuario.setCorreo(correo);
        usuario.setContrasena(contrasenaHash);
        usuario.setEdad(edad);
        usuario.setActivo(true);
        usuario.setRol(rol);
        return usuarioRepositorio.save(usuario);
    }
}
