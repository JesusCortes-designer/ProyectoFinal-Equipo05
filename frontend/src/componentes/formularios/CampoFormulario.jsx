import { useState } from 'react';
import Icono from '../comunes/Icono';

const TIPOS_INPUT = {
  texto: 'text',
  correo: 'email',
  contrasena: 'password',
  numero: 'number',
  telefono: 'tel',
  fechaHora: 'datetime-local',
};

// un campo de formulario con su etiqueta y el mensaje de error debajo del input
// tipos: texto, correo, contrasena, numero, telefono, fechaHora, seleccion, seleccionMultiple, casilla
export default function CampoFormulario({
  nombre,
  etiqueta,
  tipo = 'texto',
  valor,
  error,
  marcador,
  icono,
  opciones = [],
  deshabilitado = false,
  autoComplete,
  ayuda,
  atributos = {},
  alCambiar,
  alSalir,
}) {
  const [verContrasena, setVerContrasena] = useState(false);
  const idCampo = `campo-${nombre}`;
  const idError = `${idCampo}-error`;
  const descripcion = error ? idError : undefined;

  const manejarCambio = (evento) => alCambiar(nombre, evento.target.value);
  const manejarSalida = () => alSalir && alSalir(nombre);

  let control;

  if (tipo === 'seleccion') {
    control = (
      <select
        id={idCampo}
        value={valor ?? ''}
        onChange={manejarCambio}
        onBlur={manejarSalida}
        disabled={deshabilitado}
        aria-invalid={Boolean(error)}
        aria-describedby={descripcion}
      >
        <option value="">{marcador || 'Selecciona una opción'}</option>
        {opciones.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.etiqueta}
          </option>
        ))}
      </select>
    );
  } else if (tipo === 'seleccionMultiple') {
    const elegidos = valor || [];
    const alternar = (valorOpcion) => {
      const nuevos = elegidos.includes(valorOpcion)
        ? elegidos.filter((elegido) => elegido !== valorOpcion)
        : [...elegidos, valorOpcion];
      alCambiar(nombre, nuevos);
    };
    control = (
      <div className="campo__lista" role="group" aria-labelledby={`${idCampo}-etiqueta`} onBlur={manejarSalida}>
        {opciones.map((opcion) => (
          <label key={opcion.valor} className="campo__casilla">
            <input
              type="checkbox"
              checked={elegidos.includes(opcion.valor)}
              onChange={() => alternar(opcion.valor)}
              disabled={deshabilitado}
            />
            <span>{opcion.etiqueta}</span>
          </label>
        ))}
      </div>
    );
  } else if (tipo === 'casilla') {
    control = (
      <label className="campo__casilla campo__casilla--sola">
        <input
          id={idCampo}
          type="checkbox"
          checked={Boolean(valor)}
          onChange={(evento) => alCambiar(nombre, evento.target.checked)}
          disabled={deshabilitado}
        />
        <span>{ayuda || etiqueta}</span>
      </label>
    );
  } else {
    const tipoInput = tipo === 'contrasena' && verContrasena ? 'text' : TIPOS_INPUT[tipo] || 'text';
    control = (
      <div className={`campo__entrada ${icono ? 'campo__entrada--con-icono' : ''}`}>
        {icono && (
          <span className="campo__icono">
            <Icono nombre={icono} tamano={16} />
          </span>
        )}
        <input
          id={idCampo}
          type={tipoInput}
          value={valor ?? ''}
          placeholder={marcador}
          onChange={manejarCambio}
          onBlur={manejarSalida}
          disabled={deshabilitado}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={descripcion}
          {...atributos}
        />
        {tipo === 'contrasena' && (
          <button
            type="button"
            className="campo__ver"
            onClick={() => setVerContrasena((visible) => !visible)}
            aria-label={verContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            <Icono nombre="ojo" tamano={16} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`campo ${error ? 'campo--error' : ''}`}>
      {tipo !== 'casilla' && (
        <label className="campo__etiqueta" id={`${idCampo}-etiqueta`} htmlFor={idCampo}>
          {etiqueta}
        </label>
      )}
      {control}
      {ayuda && tipo !== 'casilla' && !error && <p className="campo__ayuda">{ayuda}</p>}
      {error && (
        <p className="campo__error" id={idError} role="alert">
          <Icono nombre="alerta" tamano={13} grosor={2.2} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
