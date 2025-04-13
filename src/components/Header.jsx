import {
  CalculatorIcon,
  MoonIcon,
  SunIcon,
  ClipboardDocumentListIcon,
  CursorArrowRaysIcon,
  MapPinIcon,
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { motion } from "framer-motion";

const MENU_ITEMS = [
  { name: "Dashboard", icon: HomeIcon },
  { name: "Calculadora", icon: CalculatorIcon },
  { name: "Contador", icon: CursorArrowRaysIcon },
  { name: "Jogo da Velha", icon: ClipboardDocumentListIcon },
  { name: "Buscar CEP", icon: MapPinIcon },
];

export default function Header({ setPage, toggleDark, dark }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Overlay para fechar o menu em mobile */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Botão Hamburguer - Mobile */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded text-white"
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
      >
        {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        role="navigation"
        aria-label="Menu lateral"
        className={`${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed top-0 left-0 w-64 h-screen bg-gray-950 text-white flex flex-col justify-between shadow-xl z-40 transform transition-transform duration-300 ease-in-out`}
      >
        {/* Logo e título */}
        <div>
          <div className="flex items-center gap-2 text-xl font-semibold px-6 py-5 border-b border-gray-800 tracking-wide">
            ✨ <span className="text-indigo-400">MultiApp</span>
          </div>

          {/* Navegação */}
          <nav className="p-4 space-y-1">
            {MENU_ITEMS.map(({ name, icon: Icon }) => (
              <motion.button
                key={name}
                onClick={() => {
                  setPage(name);
                  setMenuOpen(false);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <Icon className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition" />
                <span className="text-sm text-gray-200 group-hover:text-white">{name}</span>
              </motion.button>
            ))}
          </nav>
        </div>

        {/* Botão Modo Claro/Escuro */}
        <div className="p-4 border-t border-gray-800">
          <motion.button
            onClick={toggleDark}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {dark ? (
              <>
                <SunIcon className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium text-gray-100">Modo Claro</span>
              </>
            ) : (
              <>
                <MoonIcon className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-gray-200">Modo Escuro</span>
              </>
            )}
          </motion.button>
        </div>
      </aside>
    </>
  );
}
