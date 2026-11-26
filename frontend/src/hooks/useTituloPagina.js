import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

// cambia el titulo de la barra superior y de la pestaña del navegador
export default function useTituloPagina(titulo) {
  const contexto = useOutletContext();
  const establecerTitulo = contexto?.establecerTitulo;

  useEffect(() => {
    if (establecerTitulo) establecerTitulo(titulo);
    document.title = `${titulo} · PuntoBus`;
  }, [titulo, establecerTitulo]);
}
