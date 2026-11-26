import { Link } from 'react-router-dom';
import Icono from '../../componentes/comunes/Icono';
import Insignia from '../../componentes/comunes/Insignia';
import { Cargando, ErrorRed } from '../../componentes/comunes/EstadosPantalla';
import TablaDatos from '../../componentes/datos/TablaDatos';
import { useAutenticacion } from '../../contexto/AutenticacionContexto';
import useConsulta from '../../hooks/useConsulta';
import useTituloPagina from '../../hooks/useTituloPagina';
import boletoServicio from '../../servicios/boletoServicio';
import reservacionServicio from '../../servicios/reservacionServicio';
import terminalServicio from '../../servicios/terminalServicio';
import usuarioServicio from '../../servicios/usuarioServicio';
import viajeServicio from '../../servicios/viajeServicio';
import { formatearFechaHora, formatearMoneda } from '../../utilidades/formato';

const SOLO_TOTAL = { pagina: 1, tamano: 1 };

// el total de cada modulo sale del campo totalElementos que regresa la API paginada
async function cargarResumen() {
  const [usuarios, terminales, viajes, reservaciones, boletos, ultimas] = await Promise.all([
    usuarioServicio.listar(SOLO_TOTAL),
    terminalServicio.listarDescendente(SOLO_TOTAL),
    viajeServicio.listar({ ...SOLO_TOTAL, estado: 'PROGRAMADO' }),
    reservacionServicio.listar(SOLO_TOTAL),
    boletoServicio.listar(SOLO_TOTAL),
    reservacionServicio.listar({ pagina: 1, tamano: 5 }),
  ]);

  return {
    tarjetas: [
      { etiqueta: 'Usuarios', valor: usuarios.totalElementos, icono: 'usuario', ruta: '/admin/usuarios' },
      { etiqueta: 'Terminales', valor: terminales.totalElementos, icono: 'ubicacion', ruta: '/admin/terminales' },
      { etiqueta: 'Viajes programados', valor: viajes.totalElementos, icono: 'calendario', ruta: '/admin/viajes' },
      { etiqueta: 'Reservaciones', valor: reservaciones.totalElementos, icono: 'boleto', ruta: '/admin/reservaciones' },
      { etiqueta: 'Boletos', valor: boletos.totalElementos, icono: 'lista', ruta: '/admin/boletos' },
    ],
    ultimas: ultimas.contenido,
  };
}

const COLUMNAS_ULTIMAS = [
  { titulo: 'Reservación', render: (fila) => `#${fila.id}` },
  { titulo: 'Cliente', clave: 'clienteNombre' },
  {
    titulo: 'Viaje',
    render: (fila) => (fila.boletos[0] ? `${fila.boletos[0].origen} → ${fila.boletos[0].destino}` : '—'),
  },
  { titulo: 'Fecha', render: (fila) => formatearFechaHora(fila.fechaReservacion) },
  { titulo: 'Total', render: (fila) => formatearMoneda(fila.total) },
  { titulo: 'Estado', render: (fila) => <Insignia valor={fila.estado} /> },
];

export default function PaginaDashboardAdmin() {
  useTituloPagina('Dashboard');
  const { usuario } = useAutenticacion();
  const resumen = useConsulta(cargarResumen);

  return (
    <section className="pagina">
      <header className="pagina__encabezado">
        <div>
          <p className="pagina__saludo">Bienvenido, {usuario.nombre}</p>
          <h2>Resumen general</h2>
        </div>
      </header>

      {resumen.error && <ErrorRed error={resumen.error} alReintentar={resumen.recargar} />}
      {resumen.cargando && !resumen.datos && <Cargando filas={4} />}

      {resumen.datos && (
        <>
          <div className="tarjetas-resumen tarjetas-resumen--negrita">
            {resumen.datos.tarjetas.map((tarjeta) => (
              <Link key={tarjeta.etiqueta} to={tarjeta.ruta} className="tarjeta tarjeta-resumen">
                <span className="tarjeta-resumen__icono">
                  <Icono nombre={tarjeta.icono} tamano={22} />
                </span>
                <span>
                  <span className="tarjeta-resumen__etiqueta">{tarjeta.etiqueta}</span>
                  <span className="tarjeta-resumen__valor">{tarjeta.valor}</span>
                </span>
              </Link>
            ))}
          </div>

          <div className="tarjeta">
            <h3 className="tarjeta__titulo">Últimas reservaciones</h3>
            {resumen.datos.ultimas.length === 0 ? (
              <p className="texto-suave">Todavía no hay reservaciones.</p>
            ) : (
              <TablaDatos columnas={COLUMNAS_ULTIMAS} filas={resumen.datos.ultimas} />
            )}
          </div>
        </>
      )}
    </section>
  );
}
