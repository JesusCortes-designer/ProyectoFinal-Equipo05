// numeros de pagina visibles: primera, anterior, actual, siguiente y ultima
function calcularPaginasVisibles(paginaActual, totalPaginas) {
  if (totalPaginas <= 5) {
    return Array.from({ length: totalPaginas }, (_, indice) => indice + 1);
  }

  const visibles = [1, paginaActual - 1, paginaActual, paginaActual + 1, totalPaginas]
    .filter((pagina, indice, lista) => pagina >= 1 && pagina <= totalPaginas && lista.indexOf(pagina) === indice)
    .sort((a, b) => a - b);

  const resultado = [];
  visibles.forEach((pagina, indice) => {
    if (indice > 0 && pagina - visibles[indice - 1] > 1) resultado.push('...');
    resultado.push(pagina);
  });
  return resultado;
}

export default function Paginacion({ paginaActual, totalPaginas, alCambiarPagina }) {
  if (totalPaginas < 1) return null;

  return (
    <nav className="paginacion" aria-label="Paginación">
      <button
        type="button"
        className="paginacion__boton"
        onClick={() => alCambiarPagina(paginaActual - 1)}
        disabled={paginaActual <= 1}
        aria-label="Página anterior"
      >
        ‹
      </button>

      {calcularPaginasVisibles(paginaActual, totalPaginas).map((pagina, indice) =>
        pagina === '...' ? (
          <span key={`puntos-${indice}`} className="paginacion__puntos">
            …
          </span>
        ) : (
          <button
            key={pagina}
            type="button"
            className={`paginacion__boton ${pagina === paginaActual ? 'paginacion__boton--activo' : ''}`}
            onClick={() => alCambiarPagina(pagina)}
            aria-current={pagina === paginaActual ? 'page' : undefined}
          >
            {pagina}
          </button>
        )
      )}

      <button
        type="button"
        className="paginacion__boton"
        onClick={() => alCambiarPagina(paginaActual + 1)}
        disabled={paginaActual >= totalPaginas}
        aria-label="Página siguiente"
      >
        ›
      </button>
    </nav>
  );
}
