import Icono from './Icono';
import Modal from './Modal';

// modal para confirmar acciones importantes o destructivas
export default function ModalConfirmacion({
  abierto,
  titulo,
  mensaje,
  detalle,
  textoConfirmar = 'Confirmar',
  tipo = 'normal',
  cargando = false,
  alConfirmar,
  alCancelar,
}) {
  const peligro = tipo === 'peligro';

  return (
    <Modal abierto={abierto} titulo={titulo} alCerrar={alCancelar} ancho={460} bloqueado={cargando}>
      <div className="confirmacion">
        <span className={`confirmacion__icono ${peligro ? 'confirmacion__icono--peligro' : ''}`}>
          <Icono nombre={peligro ? 'papelera' : 'alerta'} tamano={24} />
        </span>
        <div>
          <p className="confirmacion__mensaje">{mensaje}</p>
          {detalle && <p className="confirmacion__detalle">{detalle}</p>}
        </div>
      </div>
      <div className="modal__acciones">
        <button type="button" className="boton boton--fantasma" onClick={alCancelar} disabled={cargando}>
          Cancelar
        </button>
        <button
          type="button"
          className={`boton ${peligro ? 'boton--peligro' : 'boton--primario'}`}
          onClick={alConfirmar}
          disabled={cargando}
        >
          {cargando ? 'Procesando...' : textoConfirmar}
        </button>
      </div>
    </Modal>
  );
}
