import { useMemo, useState } from 'react';
import { useAvisos } from '../../contexto/AvisosContexto';
import useListado from '../../hooks/useListado';
import { construirCarga, valoresVaciosDe } from '../../utilidades/cargas';
import { interpretarError } from '../../utilidades/errores';
import Icono from '../comunes/Icono';
import Modal from '../comunes/Modal';
import ModalConfirmacion from '../comunes/ModalConfirmacion';
import FormularioDinamico from '../formularios/FormularioDinamico';
import BarraFiltros from './BarraFiltros';
import ListadoPaginado from './ListadoPaginado';
import useTituloPagina from '../../hooks/useTituloPagina';

// pagina completa de administracion: tabla paginada en el servidor, filtros, y modales para crear, editar y eliminar
// props principales:
//  servicio: { listar, crear, actualizar, eliminar }
//  columnas: columnas de la tabla (sin la de acciones)
//  filtros: filtros que se mandan a la API
//  obtenerCampos(modo): campos del formulario, modo = 'creacion' | 'edicion'
//  aValores(fila): convierte una fila de la tabla en valores del formulario
//  describirFila(fila): texto que se muestra en el modal de eliminar
export default function PaginaCrud({
  titulo,
  encabezado,
  servicio,
  columnas,
  filtros = [],
  parametrosFijos,
  obtenerCampos,
  aValores,
  describirFila,
  nombreElemento,
  textoAgregar,
  mensajeVacio,
  puedeCrear = true,
  puedeEditar = true,
  puedeEliminar = true,
}) {
  useTituloPagina(titulo);
  const avisos = useAvisos();
  const listado = useListado(servicio.listar, filtros.map((filtro) => filtro.nombre), parametrosFijos);

  const [formulario, setFormulario] = useState({ abierto: false, fila: null });
  const [filaAEliminar, setFilaAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  const modo = formulario.fila ? 'edicion' : 'creacion';
  const campos = useMemo(() => obtenerCampos(modo), [obtenerCampos, modo]);
  const valoresIniciales = useMemo(
    () => (formulario.fila ? aValores(formulario.fila) : valoresVaciosDe(campos)),
    [formulario.fila, campos, aValores]
  );

  const guardar = async (valores) => {
    const carga = construirCarga(campos, valores);
    try {
      if (formulario.fila) {
        await servicio.actualizar(formulario.fila.id, carga);
        avisos.exito(`${nombreElemento} actualizado correctamente`);
      } else {
        await servicio.crear(carga);
        avisos.exito(`${nombreElemento} creado correctamente`);
      }
    } catch (error) {
      // el formulario muestra los errores bajo cada campo
      throw interpretarError(error);
    }
    setFormulario({ abierto: false, fila: null });
    listado.recargar();
  };

  const eliminar = async () => {
    setEliminando(true);
    try {
      await servicio.eliminar(filaAEliminar.id);
      avisos.exito(`${nombreElemento} eliminado correctamente`);
      setFilaAEliminar(null);
      listado.recargar();
    } catch (error) {
      avisos.error(interpretarError(error).mensaje);
      setFilaAEliminar(null);
    } finally {
      setEliminando(false);
    }
  };

  const columnasConAcciones = [
    ...columnas,
    ...(puedeEditar || puedeEliminar
      ? [
          {
            titulo: 'Acciones',
            render: (fila) => (
              <div className="acciones-fila">
                {puedeEditar && (
                  <button
                    type="button"
                    className="boton-tabla boton-tabla--editar"
                    onClick={() => setFormulario({ abierto: true, fila })}
                  >
                    Editar
                  </button>
                )}
                {puedeEliminar && (
                  <button
                    type="button"
                    className="boton-tabla boton-tabla--eliminar"
                    onClick={() => setFilaAEliminar(fila)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <section className="pagina">
      <header className="pagina__encabezado">
        <h2>{encabezado || titulo}</h2>
        {puedeCrear && (
          <button type="button" className="boton boton--acento" onClick={() => setFormulario({ abierto: true, fila: null })}>
            <Icono nombre="mas" tamano={16} grosor={2.2} />
            {textoAgregar}
          </button>
        )}
      </header>

      <div className="tarjeta">
        {filtros.length > 0 && <BarraFiltros filtros={filtros} listado={listado} />}
        <ListadoPaginado listado={listado} columnas={columnasConAcciones} mensajeVacio={mensajeVacio} />
      </div>

      <Modal
        abierto={formulario.abierto}
        titulo={formulario.fila ? `Editar ${nombreElemento.toLowerCase()}` : textoAgregar}
        alCerrar={() => setFormulario({ abierto: false, fila: null })}
      >
        {formulario.abierto && (
          <FormularioDinamico
            campos={campos}
            valoresIniciales={valoresIniciales}
            alGuardar={guardar}
            alCancelar={() => setFormulario({ abierto: false, fila: null })}
          />
        )}
      </Modal>

      <ModalConfirmacion
        abierto={Boolean(filaAEliminar)}
        titulo={`Eliminar ${nombreElemento.toLowerCase()}`}
        mensaje={filaAEliminar ? `¿Seguro que deseas eliminar ${describirFila(filaAEliminar)}?` : ''}
        detalle="Esta acción no se puede deshacer."
        textoConfirmar="Eliminar"
        tipo="peligro"
        cargando={eliminando}
        alConfirmar={eliminar}
        alCancelar={() => setFilaAEliminar(null)}
      />
    </section>
  );
}
