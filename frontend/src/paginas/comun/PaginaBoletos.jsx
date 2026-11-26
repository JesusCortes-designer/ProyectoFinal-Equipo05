import { useState } from 'react';
import Insignia from '../../componentes/comunes/Insignia';
import ModalConfirmacion from '../../componentes/comunes/ModalConfirmacion';
import BarraFiltros from '../../componentes/datos/BarraFiltros';
import ListadoPaginado from '../../componentes/datos/ListadoPaginado';
import { useAvisos } from '../../contexto/AvisosContexto';
import useListado from '../../hooks/useListado';
import useTituloPagina from '../../hooks/useTituloPagina';
import boletoServicio from '../../servicios/boletoServicio';
import { OPCIONES_ESTADO_BOLETO } from '../../utilidades/constantes';
import { interpretarError } from '../../utilidades/errores';
import { formatearFechaHora, formatearMoneda } from '../../utilidades/formato';

const FILTROS = [
  { nombre: 'buscar', tipo: 'busqueda', marcador: 'Buscar por código de boleto...' },
  { nombre: 'estado', tipo: 'seleccion', opciones: OPCIONES_ESTADO_BOLETO, etiquetaTodos: 'Estado: todos' },
];

const NOMBRES_FILTROS = FILTROS.map((filtro) => filtro.nombre);

// boletos de todos los viajes (para administrador y taquillero)
export default function PaginaBoletos() {
  useTituloPagina('Boletos');
  const avisos = useAvisos();
  const listado = useListado(boletoServicio.listar, NOMBRES_FILTROS);

  const [boletoACancelar, setBoletoACancelar] = useState(null);
  const [cancelando, setCancelando] = useState(false);

  const cancelar = async () => {
    setCancelando(true);
    try {
      await boletoServicio.cancelar(boletoACancelar.id);
      avisos.exito('Boleto cancelado correctamente');
      listado.recargar();
    } catch (error) {
      avisos.error(interpretarError(error).mensaje);
    } finally {
      setCancelando(false);
      setBoletoACancelar(null);
    }
  };

  const columnas = [
    { titulo: 'Código', clave: 'codigo' },
    { titulo: 'Viaje', render: (fila) => `${fila.origen} → ${fila.destino}` },
    { titulo: 'Salida', render: (fila) => formatearFechaHora(fila.fechaSalida) },
    { titulo: 'Asiento', clave: 'numeroAsiento' },
    { titulo: 'Precio', render: (fila) => formatearMoneda(fila.precio) },
    { titulo: 'Venta', render: (fila) => (fila.vendidoEnTaquilla ? 'Taquilla' : 'En línea') },
    { titulo: 'Estado', render: (fila) => <Insignia valor={fila.estado} /> },
    {
      titulo: 'Acciones',
      render: (fila) =>
        fila.estado === 'ACTIVO' ? (
          <div className="acciones-fila">
            <button type="button" className="boton-tabla boton-tabla--eliminar" onClick={() => setBoletoACancelar(fila)}>
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
        <h2>Boletos</h2>
      </header>

      <div className="tarjeta">
        <BarraFiltros filtros={FILTROS} listado={listado} />
        <ListadoPaginado listado={listado} columnas={columnas} mensajeVacio="No se encontraron boletos" />
      </div>

      <ModalConfirmacion
        abierto={Boolean(boletoACancelar)}
        titulo="Cancelar boleto"
        mensaje={boletoACancelar ? '¿Seguro que deseas cancelar el boleto?' : ''}
        detalle="El asiento quedará libre para otros pasajeros."
        textoConfirmar="Sí, cancelar"
        tipo="peligro"
        cargando={cancelando}
        alConfirmar={cancelar}
        alCancelar={() => setBoletoACancelar(null)}
      />
    </section>
  );
}
