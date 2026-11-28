import { useState } from 'react';
import Insignia from '../../componentes/comunes/Insignia';
import ModalConfirmacion from '../../componentes/comunes/ModalConfirmacion';
import BarraFiltros from '../../componentes/datos/BarraFiltros';
import ListadoPaginado from '../../componentes/datos/ListadoPaginado';
import { useAvisos } from '../../contexto/AvisosContexto';
import useListado from '../../hooks/useListado';
import useTituloPagina from '../../hooks/useTituloPagina';
import reservacionServicio from '../../servicios/reservacionServicio';
import { OPCIONES_ESTADO_RESERVACION } from '../../utilidades/constantes';
import { interpretarError } from '../../utilidades/errores';
import { formatearFechaHora, formatearMoneda } from '../../utilidades/formato';

const FILTROS_ADMIN = [
  { nombre: 'estado', tipo: 'seleccion', opciones: OPCIONES_ESTADO_RESERVACION, etiquetaTodos: 'Todas' },
];

const viajeDe = (reservacion) => {
  const boleto = reservacion.boletos[0];
  return boleto ? `${boleto.origen} → ${boleto.destino}` : '—';
};

// la misma pagina sirve para el cliente (solo sus reservaciones) y para el administrador (todas)
export default function PaginaReservaciones({ esAdministrador = false }) {
  const titulo = esAdministrador ? 'Reservaciones' : 'Mis Reservaciones';
  useTituloPagina(titulo);
  const avisos = useAvisos();

  const servicioListar = esAdministrador ? reservacionServicio.listar : reservacionServicio.mias;
  const filtros = esAdministrador ? FILTROS_ADMIN : [];
  const listado = useListado(servicioListar, filtros.map((filtro) => filtro.nombre));

  const [reservacionACancelar, setReservacionACancelar] = useState(null);
  const [cancelando, setCancelando] = useState(false);

  const cancelar = async () => {
    setCancelando(true);
    try {
      await reservacionServicio.cancelar(reservacionACancelar.id);
      avisos.exito('Reservación cancelada correctamente');
      listado.recargar();
    } catch (error) {
      avisos.error(interpretarError(error).mensaje);
    } finally {
      setCancelando(false);
      setReservacionACancelar(null);
    }
  };

  const columnas = [
    { titulo: 'Reservación', render: (fila) => `#${fila.id}` },
    ...(esAdministrador ? [{ titulo: 'Cliente', clave: 'clienteNombre' }] : []),
    { titulo: 'Viaje', render: viajeDe },
    { titulo: 'Salida', render: (fila) => formatearFechaHora(fila.boletos[0]?.fechaSalida) },
    { titulo: 'Asientos', render: (fila) => fila.boletos.map((boleto) => boleto.numeroAsiento).join(', ') },
    { titulo: 'Total', render: (fila) => formatearMoneda(fila.total) },
    { titulo: 'Estado', render: (fila) => <Insignia valor={fila.estado} /> },
    {
      titulo: 'Acciones',
      render: (fila) =>
        fila.estado === 'CONFIRMADA' ? (
          <div className="acciones-fila">
            <button type="button" className="boton-tabla boton-tabla--eliminar" onClick={() => setReservacionACancelar(fila)}>
              Cancelar
            </button>
          </div>
        ) : (
          <span className="texto-suave">—</span>
        ),
    },
  ];

  return (
    <section className="pagina">
      <header className="pagina__encabezado">
        <h2>{esAdministrador ? 'Todas las reservaciones' : 'Historial de reservaciones'}</h2>
      </header>

      <div className="tarjeta">
        {filtros.length > 0 && <BarraFiltros filtros={filtros} listado={listado} />}
        <ListadoPaginado
          listado={listado}
          columnas={columnas}
          mensajeVacio="No hay reservaciones"
          detalleVacio={esAdministrador ? 'Prueba con otro estado' : 'Cuando reserves un viaje aparecerá aquí'}
        />
      </div>

      <ModalConfirmacion
        abierto={Boolean(reservacionACancelar)}
        titulo="Cancelar reservación"
        mensaje={reservacionACancelar ? '¿Seguro que deseas cancelar la reservación?' : ''}
        detalle="Se cancelarán todos los boletos de la reservación y los asientos quedarán libres."
        textoConfirmar="Sí, cancelar"
        tipo="peligro"
        cargando={cancelando}
        alConfirmar={cancelar}
        alCancelar={() => setReservacionACancelar(null)}
      />
    </section>
  );
}
