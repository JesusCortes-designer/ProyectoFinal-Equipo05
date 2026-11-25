import ListaViajes from '../../componentes/datos/ListaViajes';
import { useAutenticacion } from '../../contexto/AutenticacionContexto';
import useTituloPagina from '../../hooks/useTituloPagina';

export default function PaginaInicioCliente() {
  useTituloPagina('Inicio');
  const { usuario } = useAutenticacion();

  return (
    <section className="pagina">
      <header className="pagina__encabezado">
        <div>
          <p className="pagina__saludo">Bienvenido, {usuario.nombre}</p>
          <h2>Salidas disponibles</h2>
        </div>
      </header>

      <ListaViajes rutaDestino={(viaje) => `/cliente/viajes/${viaje.id}/asientos`} textoBoton="Elegir asientos" />
    </section>
  );
}
