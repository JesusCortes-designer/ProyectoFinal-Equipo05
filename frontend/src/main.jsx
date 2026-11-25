import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './estilos/base.css';
import './estilos/componentes.css';
import './estilos/diseno.css';
import './estilos/paginas.css';

ReactDOM.createRoot(document.getElementById('raiz')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
