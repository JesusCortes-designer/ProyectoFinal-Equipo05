import { useEffect, useState } from 'react';
import Icono from '../comunes/Icono';

// caja de busqueda: espera 400 ms despues de escribir antes de mandar el filtro a la API
export function CampoBusqueda({ valor, alCambiar, marcador = 'Buscar...' }) {
  const [texto, setTexto] = useState(valor);

  useEffect(() => {
    setTexto(valor);
  }, [valor]);

  useEffect(() => {
    if (texto === valor) return undefined;
    const temporizador = setTimeout(() => alCambiar(texto.trim()), 400);
    return () => clearTimeout(temporizador);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texto]);

  return (
    <div className="busqueda">
      <Icono nombre="buscar" tamano={16} />
      <input
        type="search"
        value={texto}
        placeholder={marcador}
        aria-label={marcador}
        onChange={(evento) => setTexto(evento.target.value)}
      />
    </div>
  );
}

export function SelectorFiltro({ valor, alCambiar, opciones, etiquetaTodos = 'Todos', etiqueta }) {
  return (
    <select
      className="selector-filtro"
      value={valor}
      aria-label={etiqueta || etiquetaTodos}
      onChange={(evento) => alCambiar(evento.target.value)}
    >
      <option value="">{etiquetaTodos}</option>
      {opciones.map((opcion) => (
        <option key={opcion.valor} value={opcion.valor}>
          {opcion.etiqueta}
        </option>
      ))}
    </select>
  );
}

// dibuja los filtros que se le pasen: [{ nombre, tipo: 'busqueda' | 'seleccion', marcador, opciones, etiquetaTodos }]
export default function BarraFiltros({ filtros, listado }) {
  return (
    <div className="barra-filtros">
      {filtros.map((filtro) =>
        filtro.tipo === 'seleccion' ? (
          <SelectorFiltro
            key={filtro.nombre}
            valor={listado.filtros[filtro.nombre]}
            alCambiar={(valor) => listado.cambiarFiltro(filtro.nombre, valor)}
            opciones={filtro.opciones}
            etiquetaTodos={filtro.etiquetaTodos}
          />
        ) : (
          <CampoBusqueda
            key={filtro.nombre}
            valor={listado.filtros[filtro.nombre]}
            alCambiar={(valor) => listado.cambiarFiltro(filtro.nombre, valor)}
            marcador={filtro.marcador}
          />
        )
      )}
    </div>
  );
}
