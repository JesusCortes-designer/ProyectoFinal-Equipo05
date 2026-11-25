import ListaViajes from '../../componentes/datos/ListaViajes';
import useTituloPagina from '../../hooks/useTituloPagina';

// paso 1 de la venta en ventanilla: elegir el viaje
export default function PaginaElegirViaje() {
  useTituloPagina('Vender boleto');

  return (
    <section className="pagina">
      <header className="pagina__encabezado">
        <div>
          <p className="pagina__saludo">Paso 1 de 2</p>
          <h2>Elige el viaje</h2>
        </div>
      </header>

      <ListaViajes rutaDestino={(viaje) => `/taquilla/vender/${viaje.id}`} textoBoton="Seleccionar viaje" />
    </section>
  );
}
