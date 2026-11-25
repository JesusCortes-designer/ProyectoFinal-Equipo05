import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CampoFormulario from '../../componentes/formularios/CampoFormulario';
import DisenoAutenticacion from '../../componentes/diseno/DisenoAutenticacion';
import { useAvisos } from '../../contexto/AvisosContexto';
import useFormulario from '../../hooks/useFormulario';
import useTituloPagina from '../../hooks/useTituloPagina';
import * as autenticacionServicio from '../../servicios/autenticacionServicio';
import { interpretarError } from '../../utilidades/errores';
import {
  coincideCon,
  contrasenaSegura,
  correoValido,
  longitudMaxima,
  numeroEntre,
  requerido,
  telefonoValido,
} from '../../utilidades/validaciones';

const ESQUEMA = {
  nombre: [requerido('El nombre es obligatorio'), longitudMaxima(60)],
  apellido: [requerido('El apellido es obligatorio'), longitudMaxima(60)],
  correo: [requerido('El correo es obligatorio'), correoValido, longitudMaxima(120)],
  edad: [requerido('La edad es obligatoria'), numeroEntre(1, 120, 'La edad debe estar entre 1 y 120')],
  telefono: [requerido('El teléfono es obligatorio'), telefonoValido],
  contrasena: [requerido('La contraseña es obligatoria'), contrasenaSegura],
  confirmacion: [requerido('Confirma tu contraseña'), coincideCon('contrasena', 'Las contraseñas no coinciden')],
};

const VALORES_INICIALES = {
  nombre: '',
  apellido: '',
  correo: '',
  edad: '',
  telefono: '',
  contrasena: '',
  confirmacion: '',
};

export default function PaginaRegistro() {
  useTituloPagina('Crear cuenta');
  const navegar = useNavigate();
  const avisos = useAvisos();
  const formulario = useFormulario(VALORES_INICIALES, ESQUEMA);
  const [enviando, setEnviando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState('');

  const enviar = async (evento) => {
    evento.preventDefault();
    setErrorGeneral('');
    if (!formulario.validarTodo()) return;

    const { nombre, apellido, correo, edad, telefono, contrasena } = formulario.valores;
    setEnviando(true);
    try {
      await autenticacionServicio.registrar({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        correo: correo.trim(),
        edad: Number(edad),
        telefono: telefono.trim(),
        contrasena,
      });
      avisos.exito('Cuenta creada correctamente. Ya puedes iniciar sesión.');
      navegar('/login', { replace: true });
    } catch (error) {
      const interpretado = interpretarError(error);
      if (Object.keys(interpretado.campos).length > 0) formulario.establecerErrores(interpretado.campos);
      else setErrorGeneral(interpretado.mensaje);
      setEnviando(false);
    }
  };

  const propiedades = (nombre) => ({
    nombre,
    valor: formulario.valores[nombre],
    error: formulario.errores[nombre],
    deshabilitado: enviando,
    alCambiar: formulario.cambiar,
    alSalir: formulario.alSalir,
  });

  return (
    <DisenoAutenticacion titulo="Crear cuenta de cliente" subtitulo="Regístrate para reservar tus viajes">
      <form onSubmit={enviar} noValidate className="formulario">
        <div className="formulario__rejilla">
          <div className="formulario__mitad">
            <CampoFormulario {...propiedades('nombre')} etiqueta="Nombre" icono="usuario" marcador="Emily" />
          </div>
          <div className="formulario__mitad">
            <CampoFormulario {...propiedades('apellido')} etiqueta="Apellido" marcador="Johnson" />
          </div>
          <div className="formulario__completo">
            <CampoFormulario
              {...propiedades('correo')}
              etiqueta="Correo electrónico"
              tipo="correo"
              icono="correo"
              marcador="correo@ejemplo.com"
              autoComplete="username"
            />
          </div>
          <div className="formulario__mitad">
            <CampoFormulario {...propiedades('edad')} etiqueta="Edad" tipo="numero" marcador="25" atributos={{ min: 1, max: 120 }} />
          </div>
          <div className="formulario__mitad">
            <CampoFormulario
              {...propiedades('telefono')}
              etiqueta="Teléfono (SMS y WhatsApp)"
              tipo="telefono"
              icono="telefono"
              marcador="+525512345678"
            />
          </div>
          <div className="formulario__completo">
            <CampoFormulario
              {...propiedades('contrasena')}
              etiqueta="Contraseña"
              tipo="contrasena"
              icono="candado"
              marcador="••••••••"
              autoComplete="new-password"
            />
          </div>
          <div className="formulario__completo">
            <CampoFormulario
              {...propiedades('confirmacion')}
              etiqueta="Confirmar contraseña"
              tipo="contrasena"
              icono="candado"
              marcador="••••••••"
              autoComplete="new-password"
            />
          </div>
        </div>

        {errorGeneral && (
          <p className="formulario__error" role="alert">
            {errorGeneral}
          </p>
        )}

        <button type="submit" className="boton boton--primario boton--ancho" disabled={enviando}>
          {enviando ? 'Registrando...' : 'Registrarme'}
        </button>
      </form>

      <div className="autenticacion__enlaces">
        <span>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="enlace enlace--acento">
            Inicia sesión
          </Link>
        </span>
      </div>
    </DisenoAutenticacion>
  );
}
