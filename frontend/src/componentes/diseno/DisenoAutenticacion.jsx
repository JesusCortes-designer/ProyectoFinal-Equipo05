import Logo from '../comunes/Logo';

// pantalla dividida de login y registro: foto a la izquierda y, a la derecha, el logo sobre el formulario
export default function DisenoAutenticacion({ titulo, subtitulo, children }) {
  return (
    <div className="autenticacion">
      <aside className="autenticacion__imagen" aria-hidden="true" />

      <main className="autenticacion__formulario">
        <div className="autenticacion__caja">
          <div className="autenticacion__logo">
            <Logo tamano={88} />
          </div>
          <h2>{titulo}</h2>
          {subtitulo && <p className="autenticacion__subtitulo">{subtitulo}</p>}
          {children}
        </div>
      </main>
    </div>
  );
}
