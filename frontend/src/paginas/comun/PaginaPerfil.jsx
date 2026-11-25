import { useEffect, useState } from 'react';
import CampoFormulario from '../../componentes/formularios/CampoFormulario';
import Insignia from '../../componentes/comunes/Insignia';
import { Girando, ErrorRed } from '../../componentes/comunes/EstadosPantalla';
import { useAvisos } from '../../contexto/AvisosContexto';
import useFormulario from '../../hooks/useFormulario';
import useTituloPagina from '../../hooks/useTituloPagina';
import usuarioServicio from '../../servicios/usuarioServicio';
import { interpretarError } from '../../utilidades/errores';
import { iniciales } from '../../utilidades/formato';
import { coincideCon, contrasenaSegura, requerido } from '../../utilidades/validaciones';

const ESQUEMA = {
  contrasenaActual: [requerido('Escribe tu contraseña actual')],
  nuevaContrasena: [requerido('La nueva contraseña es obligatoria'), contrasenaSegura],
  confirmacion: [requerido('Confirma tu nueva contraseña'), coincideCon('nuevaContrasena', 'Las contraseñas no coinciden')],
};

const VALORES_INICIALES = { contrasenaActual: '', nuevaContrasena: '', confirmacion: '' };

// perfil del usuario (sirve para los tres roles). El formulario de contraseña solo se despliega al presionar el boton
export default function PaginaPerfil() {
  useTituloPagina('Mi perfil');
  const avisos = useAvisos();
  const formulario = useFormulario(VALORES_INICIALES, ESQUEMA);

  const [perfil, setPerfil] = useState(null);
  const [errorPerfil, setErrorPerfil] = useState(null);
  const [recargas, setRecargas] = useState(0);
  const [mostrarCambio, setMostrarCambio] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState('');

  useEffect(() => {
    let activo = true;
    setErrorPerfil(null);
    usuarioServicio
      .perfil()
      .then((datos) => activo && setPerfil(datos))
      .catch((error) => activo && setErrorPerfil(interpretarError(error)));
    return () => {
      activo = false;
    };
  }, [recargas]);

  const cerrarFormulario = () => {
    formulario.reiniciar(VALORES_INICIALES);
    setErrorGeneral('');
    setMostrarCambio(false);
  };

  const guardar = async (evento) => {
    evento.preventDefault();
    setErrorGeneral('');
    if (!formulario.validarTodo()) return;

    setGuardando(true);
    try {
      await usuarioServicio.cambiarContrasena(formulario.valores.contrasenaActual, formulario.valores.nuevaContrasena);
      avisos.exito('Contraseña actualizada correctamente');
      cerrarFormulario();
    } catch (error) {
      const interpretado = interpretarError(error);
      if (Object.keys(interpretado.campos).length > 0) formulario.establecerErrores(interpretado.campos);
      else setErrorGeneral(interpretado.mensaje);
    } finally {
      setGuardando(false);
    }
  };

  if (errorPerfil) return <ErrorRed error={errorPerfil} alReintentar={() => setRecargas((n) => n + 1)} />;
  if (!perfil) return <Girando mensaje="Cargando perfil..." />;

  const propiedades = (nombre) => ({
    nombre,
    valor: formulario.valores[nombre],
    error: formulario.errores[nombre],
    deshabilitado: guardando,
    alCambiar: formulario.cambiar,
    alSalir: formulario.alSalir,
  });

  return (
    <section className="pagina">
      <header className="pagina__encabezado">
        <h2>Mi perfil</h2>
      </header>

      <div className="perfil">
        <div className="tarjeta perfil__resumen">
          <span className="avatar avatar--grande">{iniciales(perfil.nombre, perfil.apellido)}</span>
          <h3>
            {perfil.nombre} {perfil.apellido}
          </h3>
          <p>{perfil.correo}</p>
          <Insignia valor={perfil.rol} />
        </div>

        <div className="perfil__detalle">
          <div className="tarjeta">
            <h3 className="tarjeta__titulo">Datos personales</h3>
            <dl className="datos">
              <div>
                <dt>Nombre</dt>
                <dd>{perfil.nombre}</dd>
              </div>
              <div>
                <dt>Apellido</dt>
                <dd>{perfil.apellido}</dd>
              </div>
              <div>
                <dt>Correo electrónico</dt>
                <dd>{perfil.correo}</dd>
              </div>
              <div>
                <dt>Edad</dt>
                <dd>{perfil.edad} años</dd>
              </div>
              <div>
                <dt>Estado</dt>
                <dd>
                  <Insignia valor={perfil.activo ? 'ACTIVO' : 'INACTIVO'} />
                </dd>
              </div>
            </dl>

            {!mostrarCambio && (
              <button type="button" className="boton boton--primario" onClick={() => setMostrarCambio(true)}>
                Cambiar contraseña
              </button>
            )}
          </div>

          {mostrarCambio && (
            <div className="tarjeta">
              <h3 className="tarjeta__titulo">Cambiar contraseña</h3>
              <form className="formulario" onSubmit={guardar} noValidate>
                <div className="formulario__rejilla">
                  <div className="formulario__completo">
                    <CampoFormulario
                      {...propiedades('contrasenaActual')}
                      etiqueta="Contraseña actual"
                      tipo="contrasena"
                      icono="candado"
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="formulario__mitad">
                    <CampoFormulario
                      {...propiedades('nuevaContrasena')}
                      etiqueta="Nueva contraseña"
                      tipo="contrasena"
                      icono="candado"
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="formulario__mitad">
                    <CampoFormulario
                      {...propiedades('confirmacion')}
                      etiqueta="Confirmar nueva contraseña"
                      tipo="contrasena"
                      icono="candado"
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                {errorGeneral && (
                  <p className="formulario__error" role="alert">
                    {errorGeneral}
                  </p>
                )}

                <div className="modal__acciones">
                  <button type="button" className="boton boton--fantasma" onClick={cerrarFormulario} disabled={guardando}>
                    Cancelar
                  </button>
                  <button type="submit" className="boton boton--acento" disabled={guardando}>
                    {guardando ? 'Guardando...' : 'Actualizar contraseña'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
