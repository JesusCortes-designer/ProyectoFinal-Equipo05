import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import CampoFormulario from '../../componentes/formularios/CampoFormulario';
import DisenoAutenticacion from '../../componentes/diseno/DisenoAutenticacion';
import { useAvisos } from '../../contexto/AvisosContexto';
import useFormulario from '../../hooks/useFormulario';
import useTituloPagina from '../../hooks/useTituloPagina';
import * as autenticacionServicio from '../../servicios/autenticacionServicio';
import { interpretarError } from '../../utilidades/errores';
import { coincideCon, contrasenaSegura, requerido } from '../../utilidades/validaciones';

const ESQUEMA = {
  nuevaContrasena: [requerido('La nueva contraseña es obligatoria'), contrasenaSegura],
  confirmacion: [requerido('Confirma tu contraseña'), coincideCon('nuevaContrasena', 'Las contraseñas no coinciden')],
};

// a esta pagina se llega desde el enlace del correo: /restablecer?token=...
export default function PaginaRestablecer() {
  useTituloPagina('Restablecer contraseña');
  const [parametros] = useSearchParams();
  const token = parametros.get('token');
  const navegar = useNavigate();
  const avisos = useAvisos();
  const formulario = useFormulario({ nuevaContrasena: '', confirmacion: '' }, ESQUEMA);
  const [enviando, setEnviando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState('');

  const enviar = async (evento) => {
    evento.preventDefault();
    setErrorGeneral('');
    if (!formulario.validarTodo()) return;

    setEnviando(true);
    try {
      await autenticacionServicio.restablecerContrasena(token, formulario.valores.nuevaContrasena);
      avisos.exito('Contraseña actualizada. Inicia sesión con la nueva.');
      navegar('/login', { replace: true });
    } catch (error) {
      const interpretado = interpretarError(error);
      if (interpretado.campos.nuevaContrasena) formulario.establecerErrores(interpretado.campos);
      else setErrorGeneral(interpretado.mensaje);
      setEnviando(false);
    }
  };

  if (!token) {
    return (
      <DisenoAutenticacion titulo="Enlace no válido" subtitulo="El enlace para restablecer la contraseña está incompleto">
        <div className="autenticacion__enlaces">
          <Link to="/recuperar" className="enlace enlace--acento">
            Solicitar un nuevo enlace
          </Link>
        </div>
      </DisenoAutenticacion>
    );
  }

  return (
    <DisenoAutenticacion titulo="Nueva contraseña" subtitulo="Escribe tu nueva contraseña">
      <form onSubmit={enviar} noValidate className="formulario">
        <CampoFormulario
          nombre="nuevaContrasena"
          etiqueta="Nueva contraseña"
          tipo="contrasena"
          icono="candado"
          autoComplete="new-password"
          valor={formulario.valores.nuevaContrasena}
          error={formulario.errores.nuevaContrasena}
          deshabilitado={enviando}
          alCambiar={formulario.cambiar}
          alSalir={formulario.alSalir}
        />
        <CampoFormulario
          nombre="confirmacion"
          etiqueta="Confirmar contraseña"
          tipo="contrasena"
          icono="candado"
          autoComplete="new-password"
          valor={formulario.valores.confirmacion}
          error={formulario.errores.confirmacion}
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
          {enviando ? 'Guardando...' : 'Guardar contraseña'}
        </button>
      </form>
    </DisenoAutenticacion>
  );
}
