// tabla generica. columnas: [{ titulo, clave, render(fila), alineacion }]
// en pantallas chicas cada fila se convierte en una tarjeta (usa data-etiqueta)
export default function TablaDatos({ columnas, filas, claveFila = 'id' }) {
  return (
    <div className="tabla-contenedor">
      <table className="tabla">
        <thead>
          <tr>
            {columnas.map((columna) => (
              <th key={columna.titulo} className={columna.alineacion ? `tabla__celda--${columna.alineacion}` : ''}>
                {columna.titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((fila) => (
            <tr key={fila[claveFila]}>
              {columnas.map((columna) => (
                <td
                  key={columna.titulo}
                  data-etiqueta={columna.titulo}
                  className={columna.alineacion ? `tabla__celda--${columna.alineacion}` : ''}
                >
                  {columna.render ? columna.render(fila) : fila[columna.clave]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
