import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import Icono from '../componentes/comunes/Icono';

const ContextoAvisos = createContext(null);

const DURACION_AVISO_MS = 5000;

// avisos flotantes (reemplazan a alert del navegador)
export function ProveedorAvisos({ children }) {
  const [avisos, setAvisos] = useState([]);
  const contador = useRef(0);

  const quitar = useCallback((id) => {
    setAvisos((actuales) => actuales.filter((aviso) => aviso.id !== id));
  }, []);

  const mostrar = useCallback(
    (tipo, mensaje) => {
      contador.current += 1;
      const id = contador.current;
      setAvisos((actuales) => [...actuales, { id, tipo, mensaje }]);
      setTimeout(() => quitar(id), DURACION_AVISO_MS);
    },
    [quitar]
  );

  const valor = useMemo(
    () => ({
      exito: (mensaje) => mostrar('exito', mensaje),
      error: (mensaje) => mostrar('error', mensaje),
      info: (mensaje) => mostrar('info', mensaje),
    }),
    [mostrar]
  );

  return (
    <ContextoAvisos.Provider value={valor}>
      {children}
      <div className="avisos" aria-live="polite">
        {avisos.map((aviso) => (
          <div key={aviso.id} className={`aviso aviso--${aviso.tipo}`} role="status">
            <Icono nombre={aviso.tipo === 'exito' ? 'check' : 'alert'} tamano={20} grosor={2.4} />
            <span className="aviso__texto">{aviso.mensaje}</span>
            <button type="button" className="aviso__cerrar" onClick={() => quitar(aviso.id)} aria-label="Cerrar aviso">
              <Icono nombre="x" tamano={16} />
            </button>
          </div>
        ))}
      </div>
    </ContextoAvisos.Provider>
  );
}

export function useAvisos() {
  return useContext(ContextoAvisos);
}
