import { useEffect, useRef } from 'react';
import Icono from './Icono';

// ventana modal (reemplaza a alert y confirm del navegador)
export default function Modal({ abierto, titulo, alCerrar, children, ancho = 560, bloqueado = false }) {
  const caja = useRef(null);

  useEffect(() => {
    if (!abierto) return undefined;

    const alPresionarTecla = (evento) => {
      if (evento.key === 'Escape' && !bloqueado) alCerrar();
    };
    document.addEventListener('keydown', alPresionarTecla);
    document.body.style.overflow = 'hidden';
    caja.current?.focus();

    return () => {
      document.removeEventListener('keydown', alPresionarTecla);
      document.body.style.overflow = '';
    };
  }, [abierto, alCerrar, bloqueado]);

  if (!abierto) return null;

  return (
    <div
      className="modal-fondo"
      onMouseDown={(evento) => {
        if (evento.target === evento.currentTarget && !bloqueado) alCerrar();
      }}
    >
      <div
        className="modal"
        style={{ maxWidth: ancho }}
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        tabIndex={-1}
        ref={caja}
      >
        <header className="modal__encabezado">
          <h2>{titulo}</h2>
          <button type="button" className="modal__cerrar" onClick={alCerrar} disabled={bloqueado} aria-label="Cerrar">
            <Icono nombre="x" tamano={20} />
          </button>
        </header>
        <div className="modal__cuerpo">{children}</div>
      </div>
    </div>
  );
}
