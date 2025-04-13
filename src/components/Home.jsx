import {
  CalculatorIcon,
  CursorArrowRaysIcon,
  ClipboardDocumentListIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function Home({ setPage }) {
  const funcoes = [
    {
      nome: "Calculadora",
      descricao: "Faça cálculos rápidos e eficientes.",
      icon: CalculatorIcon,
    },
    {
      nome: "Contador",
      descricao: "Conte cliques com estilo e precisão.",
      icon: CursorArrowRaysIcon,
    },
    {
      nome: "Jogo da Velha",
      descricao: "Clássico jogo em uma interface moderna.",
      icon: ClipboardDocumentListIcon,
    },
    {
      nome: "Buscar CEP",
      descricao: "Consulte endereços via API do ViaCEP.",
      icon: MapPinIcon,
    },
  ];

  const handleKey = (e, nome) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setPage(nome);
    }
  };

  return (
    <motion.section
      className="w-full max-w-6xl mx-auto px-4 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      {/* Título */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
        👨‍💻 MultiApp
      </h1>

      {/* Subtítulo */}
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
        Um painel multifuncional com ferramentas úteis feitas com React, Tailwind e carinho profissional.
        Escolha uma funcionalidade abaixo para começar:
      </p>

      {/* Grid de funcionalidades */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {funcoes.map(({ nome, descricao, icon: Icon }) => (
          <motion.div
            key={nome}
            role="button"
            tabIndex={0}
            onClick={() => setPage(nome)}
            onKeyDown={(e) => handleKey(e, nome)}
            className="bg-white dark:bg-gray-900 text-left rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer group border border-transparent hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon className="w-8 h-8 text-indigo-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{nome}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{descricao}</p>
          </motion.div>
        ))}
      </div>

      {/* Rodapé */}
      <p className="mt-16 text-xs text-gray-400 dark:text-gray-600">
        Criado por <span className="text-indigo-500">Gustavo Champam</span>
      </p>
    </motion.section>
  );
}
