import { useEffect, useMemo, useState } from 'react';
import useFormulario from '../../hooks/useFormulario';
import { interpretarError } from '../../utilidades/errores';
import { Girando } from '../comunes/EstadosPantalla';
import CampoFormulario from './CampoFormulario';

// formulario armado a partir de una lista de campos:
// { nombre, etiqueta, tipo, reglas, marcador, icono, opciones, cargarOpciones, ancho, ayuda }
// alGuardar(valores) debe lanzar el error ya interpretado si algo falla
export default function FormularioDinamico({ campos, valoresIniciales, alGuardar, alCancelar, textoGuardar = 'Guardar' }) {
  const esquema = useMemo(
    () => Object.fromEntries(campos.map((campo) => [campo.nombre, campo.reglas || []])),
    [campos]
  );
  const formulario = useFormulario(valoresIniciales, esquema);

  const [opcionesCargadas, setOpcionesCargadas] = useState({});
  const [cargandoOpciones, setCargandoOpciones] = useState(false);
  const [errorOpciones, setErrorOpciones] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState('');

  // carga las opciones de los selects que vienen de la API (terminales, rutas, etc.)
  useEffect(() => {
    const pendientes = campos.filter((campo) => campo.cargarOpciones);
    if (pendientes.length === 0) return undefined;

    let activo = true;
    setCargandoOpciones(true);
    Promise.all(pendientes.map((campo) => campo.cargarOpciones()))
      .then((resultados) => {
        if (!activo) return;
        const mapa = {};
        pendientes.forEach((campo, indice) => {
          mapa[campo.nombre] = resultados[indice];
        });
        setOpcionesCargadas(mapa);
      })
      .catch((error) => {
        if (activo) setErrorOpciones(interpretarError(error).mensaje);
      })
      .finally(() => {
        if (activo) setCargandoOpciones(false);
      });

    return () => {
      activo = false;
    };
  }, [campos]);

  const enviar = async (evento) => {
    evento.preventDefault();
    setErrorGeneral('');
    if (!formulario.validarTodo()) return;

    setGuardando(true);
    try {
      await alGuardar(formulario.valores);
    } catch (error) {
      if (error && error.campos && Object.keys(error.campos).length > 0) {
        formulario.establecerErrores(error.campos);
      } else {
        setErrorGeneral(error?.mensaje || 'No se pudo guardar la información');
      }
    } finally {
      setGuardando(false);
    }
  };

  if (cargandoOpciones) {
    return <Girando mensaje="Cargando opciones..." />;
  }

  return (
    <form className="formulario" onSubmit={enviar} noValidate>
      {errorOpciones && (
        <p className="formulario__error" role="alert">
          {errorOpciones}
        </p>
      )}

      <div className="formulario__rejilla">
        {campos.map((campo) => (
          <div key={campo.nombre} className={campo.ancho === 'mitad' ? 'formulario__mitad' : 'formulario__completo'}>
            <CampoFormulario
              nombre={campo.nombre}
              etiqueta={campo.etiqueta}
              tipo={campo.tipo}
              valor={formulario.valores[campo.nombre]}
              error={formulario.errores[campo.nombre]}
              marcador={campo.marcador}
              icono={campo.icono}
              ayuda={campo.ayuda}
              autoComplete={campo.autoComplete}
              atributos={campo.atributos}
              opciones={campo.cargarOpciones ? opcionesCargadas[campo.nombre] || [] : campo.opciones}
              deshabilitado={guardando}
              alCambiar={formulario.cambiar}
              alSalir={formulario.alSalir}
            />
          </div>
        ))}
      </div>

      {errorGeneral && (
        <p className="formulario__error" role="alert">
          {errorGeneral}
        </p>
      )}

      <div className="modal__acciones">
        <button type="button" className="boton boton--fantasma" onClick={alCancelar} disabled={guardando}>
          Cancelar
        </button>
        <button type="submit" className="boton boton--primario" disabled={guardando}>
          {guardando ? 'Guardando...' : textoGuardar}
        </button>
      </div>
    </form>
  );
}
