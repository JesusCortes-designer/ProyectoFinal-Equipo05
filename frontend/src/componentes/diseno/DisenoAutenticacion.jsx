import Logo from '../comunes/Logo';

// pantalla dividida de login y registro: panel de marca a la izquierda y formulario a la derecha
export default function DisenoAutenticacion({ titulo, subtitulo, children }) {
  return (
    <div className="autenticacion">
      <aside className="autenticacion__marca">
        <div className="autenticacion__marca-contenido">
          <Logo tamano={150} />
          <h1>Terminal de Autobuses</h1>
          <p>Reserva tu viaje de forma rápida y segura</p>
        </div>
      </aside>

      <main className="autenticacion__formulario">
        <div className="autenticacion__caja">
          <div className="autenticacion__logo-movil">
            <Logo tamano={56} />
          </div>
          <h2>{titulo}</h2>
          {subtitulo && <p className="autenticacion__subtitulo">{subtitulo}</p>}
          {children}
        </div>
      </main>
    </div>
  );
}
