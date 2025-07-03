import { delay } from "../utils/delay";
import { useEffect } from "react";

interface UseLineAndBoxSoundEffectProps {
  condition: boolean;
  delayMs: number;
  cb: () => void;
}

/**
 * Hook reutilizable para ejecutar un efecto con retraso (delay) si se cumple una condición.
 * Este patrón es útil para reproducir sonidos o ejecutar animaciones después de una pausa controlada.
 * Además, evita efectos colaterales si el componente se desmonta antes de que termine el delay.
 */
export const useLineAndBoxSoundEffect = ({
  condition,
  delayMs,
  cb,
}: UseLineAndBoxSoundEffectProps) => {
  useEffect(() => {
    // Esta bandera permite cancelar la ejecución del efecto
    // si el componente se desmonta o cambian las dependencias
    let isCancelled = false;

    const runAsync = async () => {
      // Reproducir el sonido si la condición es verdadera...
      if (condition) {
        await delay(delayMs);

        // Solo ejecutar el callback si el efecto no ha sido cancelado
        if (!isCancelled) {
          cb();
        }
      }
    };

    runAsync();

    // Cleanup: si el componente se desmonta o cambian las dependencias,
    // se marca como cancelado para evitar que se ejecuten efectos pendientes.
    return () => {
      isCancelled = true;
    };
  }, [condition, cb, delayMs]);
};
