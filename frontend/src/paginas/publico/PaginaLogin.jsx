import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CampoFormulario from '../../componentes/formularios/CampoFormulario';
import DisenoAutenticacion from '../../componentes/diseno/DisenoAutenticacion';
import { useAutenticacion } from '../../contexto/AutenticacionContexto';
import useFormulario from '../../hooks/useFormulario';
import useTituloPagina from '../../hooks/useTituloPagina';
import { RUTA_INICIO } from '../../utilidades/constantes';
import { interpretarError } from '../../utilidades/errores';
import { correoValido, requerido } from '../../utilidades/validaciones';

const ESQUEMA = {
  correo: [requerido('El correo es obligatorio'), correoValido],
  contrasena: [requerido('La contraseña es obligatoria')],
};

export default function PaginaLogin() {
  useTituloPagina('Iniciar sesión');
  const navegar = useNavigate();
  const { iniciarSesion, sesionExpirada } = useAutenticacion();
  const formulario = useFormulario({ correo: '', contrasena: '' }, ESQUEMA);
  const [enviando, setEnviando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState('');

  const enviar = async (evento) => {
    evento.preventDefault();
    setErrorGeneral('');
    if (!formulario.validarTodo()) return;

    setEnviando(true);
    try {
      const usuario = await iniciarSesion(formulario.valores.correo.trim(), formulario.valores.contrasena);
      navegar(RUTA_INICIO[usuario.rol] || '/', { replace: true });
    } catch (error) {
      const interpretado = interpretarError(error);
      if (Object.keys(interpretado.campos).length > 0) formulario.establecerErrores(interpretado.campos);
      else setErrorGeneral(interpretado.mensaje);
      setEnviando(false);
    }
  };

  return (
    <DisenoAutenticacion titulo="Iniciar sesión" subtitulo="Ingresa tu correo y contraseña">
      {sesionExpirada && !errorGeneral && (
        <p className="formulario__aviso" role="status">
          Tu sesión expiró. Vuelve a iniciar sesión.
        </p>
      )}

      <form onSubmit={enviar} noValidate className="formulario">
        <CampoFormulario
          nombre="correo"
          etiqueta="Correo Electrónico"
          tipo="correo"
          icono="correo"
          marcador="correo@ejemplo.com"
          autoComplete="username"
          valor={formulario.valores.correo}
          error={formulario.errores.correo}
          deshabilitado={enviando}
          alCambiar={formulario.cambiar}
          alSalir={formulario.alSalir}
        />
        <CampoFormulario
          nombre="contrasena"
          etiqueta="Contraseña"
          tipo="contrasena"
          icono="candado"
          marcador="••••••••"
          autoComplete="current-password"
          valor={formulario.valores.contrasena}
          error={formulario.errores.contrasena}
          deshabilitado={enviando}
          alCambiar={formulario.cambiar}
          alSalir={formulario.alSalir}
        />

        {errorGeneral && (
          <p className="formulario__error" role="alert">
            {errorGeneral}
          </p>
        )}

        <button type="submit" className="boton boton--primario boton--ancho" disabled={enviando}>
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <div className="autenticacion__enlaces">
        <Link to="/recuperar" className="enlace">
          ¿Olvidaste tu contraseña?
        </Link>
        <span>
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="enlace enlace--acento">
            Regístrate
          </Link>
        </span>
      </div>
    </DisenoAutenticacion>
  );
}
