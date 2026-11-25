import Icono from '../comunes/Icono';

// mapa del autobus con 2 asientos de cada lado del pasillo
// ocupados y seleccionados son listas de numeros de asiento
export default function MapaAsientos({ capacidad, ocupados, seleccionados, alAlternar }) {
  const filas = [];
  for (let inicio = 1; inicio <= capacidad; inicio += 4) {
    filas.push([inicio, inicio + 1, inicio + 2, inicio + 3].filter((numero) => numero <= capacidad));
  }

  const dibujarAsiento = (numero) => {
    const ocupado = ocupados.includes(numero);
    const elegido = seleccionados.includes(numero);
    const clase = ocupado ? 'asiento--ocupado' : elegido ? 'asiento--elegido' : 'asiento--libre';

    return (
      <button
        key={numero}
        type="button"
        className={`asiento ${clase}`}
        disabled={ocupado}
        aria-pressed={elegido}
        aria-label={`Asiento ${numero}${ocupado ? ', ocupado' : elegido ? ', seleccionado' : ', libre'}`}
        onClick={() => alAlternar(numero)}
      >
        {numero}
      </button>
    );
  };

  return (
    <div className="mapa">
      <div className="mapa__autobus">
        <div className="mapa__frente">
          <span>Chofer</span>
          <Icono nombre="usuario" tamano={22} />
        </div>

        {filas.map((fila) => (
          <div key={fila[0]} className="mapa__fila">
            <div className="mapa__lado">{fila.slice(0, 2).map(dibujarAsiento)}</div>
            <div className="mapa__lado">{fila.slice(2).map(dibujarAsiento)}</div>
          </div>
        ))}
      </div>

      <ul className="mapa__leyenda">
        <li>
          <span className="asiento asiento--libre asiento--leyenda" /> Libre
        </li>
        <li>
          <span className="asiento asiento--ocupado asiento--leyenda" /> Ocupado
        </li>
        <li>
          <span className="asiento asiento--elegido asiento--leyenda" /> Seleccionado
        </li>
      </ul>
    </div>
  );
}
