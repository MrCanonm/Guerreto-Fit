import { useEffect } from "react";

const ScrollableComponent = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      // Realiza scroll automático hacia abajo
      window.scrollBy({
        top: event.deltaY * 2, // Ajusta la velocidad del scroll multiplicando el deltaY
        behavior: "smooth", // El scroll será suave
      });
    };

    // Asignar el evento al scroll
    window.addEventListener("wheel", handleScroll);

    // Eliminar el evento cuando el componente se desmonte
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return <div>{children}</div>;
};

export default ScrollableComponent;
