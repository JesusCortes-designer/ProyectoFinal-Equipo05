import { Link, Navigate, useLocation } from 'react-router-dom';
import Icono from '../../componentes/comunes/Icono';
import useTituloPagina from '../../hooks/useTituloPagina';
import { formatearFechaHora, formatearMoneda } from '../../utilidades/formato';

// se llega aqui despues de crear la reservacion (los datos viajan en el estado de la navegacion)
export default function PaginaConfirmacion() {
  useTituloPagina('Reservación confirmada');
  const ubicacion = useLocation();
  const reservacion = ubicacion.state?.reservacion;

  if (!reservacion) {
    return <Navigate to="/cliente/reservaciones" replace />;
  }

  const primerBoleto = reservacion.boletos[0];

  return (
    <section className="pagina">
      <div className="tarjeta confirmacion-reserva">
        <span className="confirmacion-reserva__icono">
          <Icono nombre="check" tamano={36} grosor={2.6} />
        </span>
        <h2>¡Reservación confirmada!</h2>
        <p className="confirmacion-reserva__codigo">Reservación #{reservacion.id}</p>

        <dl className="resumen__lista">
          <div>
            <dt>Ruta</dt>
            <dd>{primerBoleto ? `${primerBoleto.origen} → ${primerBoleto.destino}` : '—'}</dd>
          </div>
          <div>
            <dt>Salida</dt>
            <dd>{formatearFechaHora(primerBoleto?.fechaSalida)}</dd>
          </div>
          <div>
            <dt>Boletos</dt>
            <dd>
              {reservacion.boletos.map((boleto) => `${boleto.codigo} (asiento ${boleto.numeroAsiento})`).join(', ')}
            </dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>{formatearMoneda(reservacion.total)}</dd>
          </div>
        </dl>

        <p className="texto-suave">Enviamos tu confirmación por:</p>
        <ul className="canales">
          <li>
            <Icono nombre="correo" tamano={16} /> Correo
          </li>
          <li>
            <Icono nombre="telefono" tamano={16} /> SMS
          </li>
          <li>
            <Icono nombre="telefono" tamano={16} /> WhatsApp
          </li>
        </ul>

        <div className="acciones-fila acciones-fila--centro">
          <Link to="/cliente/reservaciones" className="boton boton--primario">
            Ver mis reservaciones
          </Link>
          <Link to="/cliente" className="boton boton--fantasma">
            Ir al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
