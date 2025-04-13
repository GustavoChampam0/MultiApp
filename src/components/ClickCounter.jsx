import { useEffect, useState } from 'react';
import { BoltIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

export default function ClickCounter() {
  const [contador, setContador] = useState(0);
  const [animar, setAnimar] = useState(false);

  const LIMITE = 100;

  useEffect(() => {
    const salvo = localStorage.getItem('contador');
    if (salvo) setContador(parseInt(salvo));
  }, []);

  useEffect(() => {
    localStorage.setItem('contador', contador.toString());
  }, [contador]);

  const aumentar = () => {
    setContador((prev) => prev + 1);
    setAnimar(true);
    setTimeout(() => setAnimar(false), 200);
  };

  const resetar = () => {
    setContador(0);
    localStorage.removeItem('contador');
  };

  const getNivel = () => {
    if (contador >= 50) return 'Avançado';
    if (contador >= 20) return 'Intermediário';
    return 'Iniciante';
  };

  const progresso = Math.min((contador / LIMITE) * 100, 100);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center transition">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center justify-center gap-2">
        <BoltIcon className="w-6 h-6 text-yellow-400" />
        Contador de Cliques
      </h2>

      <p
        className={`text-4xl font-bold ${
          contador >= 50
            ? 'text-yellow-500'
            : contador >= 20
            ? 'text-blue-500'
            : 'text-indigo-600'
        } dark:text-indigo-400 mb-2 transition-transform duration-200 ${animar ? 'scale-125' : ''}`}
      >
        {contador}
      </p>

      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Nível: {getNivel()}</p>

      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${progresso}%` }}
        ></div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={aumentar}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold transition"
        >
          CLICAR
        </button>
        <button
          onClick={resetar}
          className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white px-4 py-3 rounded-lg font-medium transition flex items-center gap-1"
        >
          <ArrowPathIcon className="w-4 h-4" />
          Resetar
        </button>
      </div>

      {contador >= 50 && (
        <p className="mt-6 text-sm text-yellow-500 animate-pulse">🔥 Você está clicando MUITO!</p>
      )}
    </div>
  );
}
