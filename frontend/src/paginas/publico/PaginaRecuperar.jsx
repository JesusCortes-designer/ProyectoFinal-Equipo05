import { useState } from 'react';
import { Link } from 'react-router-dom';
import CampoFormulario from '../../componentes/formularios/CampoFormulario';
import DisenoAutenticacion from '../../componentes/diseno/DisenoAutenticacion';
import useFormulario from '../../hooks/useFormulario';
import useTituloPagina from '../../hooks/useTituloPagina';
import * as autenticacionServicio from '../../servicios/autenticacionServicio';
import { interpretarError } from '../../utilidades/errores';
import { correoValido, requerido } from '../../utilidades/validaciones';

const ESQUEMA = { correo: [requerido('El correo es obligatorio'), correoValido] };

export default function PaginaRecuperar() {
  useTituloPagina('Recuperar contraseña');
  const formulario = useFormulario({ correo: '' }, ESQUEMA);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [errorGeneral, setErrorGeneral] = useState('');

  const enviar = async (evento) => {
    evento.preventDefault();
    setErrorGeneral('');
    if (!formulario.validarTodo()) return;

    setEnviando(true);
    try {
      const respuesta = await autenticacionServicio.recuperarContrasena(formulario.valores.correo.trim());
      setMensaje(respuesta.mensaje || 'Si el correo existe, recibirás un enlace para restablecer tu contraseña.');
    } catch (error) {
      const interpretado = interpretarError(error);
      if (Object.keys(interpretado.campos).length > 0) formulario.establecerErrores(interpretado.campos);
      else setErrorGeneral(interpretado.mensaje);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <DisenoAutenticacion titulo="Recuperar contraseña" subtitulo="Te enviaremos un enlace a tu correo">
      {mensaje ? (
        <p className="formulario__aviso formulario__aviso--exito" role="status">
          {mensaje}
        </p>
      ) : (
        <form onSubmit={enviar} noValidate className="formulario">
          <CampoFormulario
            nombre="correo"
            etiqueta="Correo electrónico"
            tipo="correo"
            icono="correo"
            marcador="correo@ejemplo.com"
            valor={formulario.valores.correo}
            error={formulario.errores.correo}
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
            {enviando ? 'Enviando...' : 'Enviar enlace'}
          </button>
        </form>
      )}

      <div className="autenticacion__enlaces">
        <Link to="/login" className="enlace">
          Volver a iniciar sesión
        </Link>
      </div>
    </DisenoAutenticacion>
  );
}
