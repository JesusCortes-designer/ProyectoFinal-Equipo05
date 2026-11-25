// iconos de linea (mismo estilo que el prototipo de Figma)
const TRAZOS = {
  inicio: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  lista: 'M4 6h16M4 12h16M4 18h10',
  usuario: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 4-6 8-6s8 2 8 6',
  autobus: 'M5 4h14a1 1 0 011 1v12H4V5a1 1 0 011-1zM4 11h16M7 17v3M17 17v3M8 14h.01M16 14h.01',
  ubicacion: 'M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11zM12 12a2 2 0 100-4 2 2 0 000 4z',
  ruta: 'M6 20a2 2 0 100-4 2 2 0 000 4zM18 8a2 2 0 100-4 2 2 0 000 4zM8 18h6a3 3 0 000-6h-4a3 3 0 010-6h6',
  calendario: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  salir: 'M10 4H5v16h5M15 8l4 4-4 4M19 12H9',
  buscar: 'M11 18a7 7 0 100-14 7 7 0 000 14zM16 16l5 5',
  mas: 'M12 5v14M5 12h14',
  editar: 'M4 20h4L19 9l-4-4L4 16zM13 7l4 4',
  papelera: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',
  check: 'M5 12l5 5 9-10',
  x: 'M6 6l12 12M18 6L6 18',
  grafica: 'M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-8',
  boleto:
    'M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 000-4z',
  reloj: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2',
  abajo: 'M6 9l6 6 6-6',
  correo: 'M3 6h18v12H3zM3 7l9 7 9-7',
  telefono: 'M7 3h10v18H7zM11 18h2',
  candado: 'M6 11h12v9H6zM8 11V8a4 4 0 018 0v3',
  alerta: 'M12 4l10 17H2zM12 10v5M12 18h.01',
  ojo: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z',
  menu: 'M4 6h16M4 12h16M4 18h16',
  conductor: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 4-6 8-6s8 2 8 6M16 16l4 4',
};

export default function Icono({ nombre, tamano = 20, color = 'currentColor', grosor = 1.8 }) {
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={grosor}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={TRAZOS[nombre]} />
    </svg>
  );
}
