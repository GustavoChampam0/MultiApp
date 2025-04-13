import { useState, useEffect, lazy, Suspense } from "react";
import Header from "./components/Header";
import { motion, AnimatePresence } from "framer-motion";

// Lazy load dos componentes
const Home = lazy(() => import("./components/Home"));
const Calculadora = lazy(() => import("./components/Calculadora"));
const ClickCounter = lazy(() => import("./components/ClickCounter"));
const TicTacToe = lazy(() => import("./components/TicTacToe"));
const CepSearch = lazy(() => import("./components/CepSearch"));

function App() {
  const [pagina, setPagina] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const darkSaved = localStorage.getItem("dark");
    if (darkSaved) setDarkMode(JSON.parse(darkSaved));
  }, []);

  const renderizar = () => {
    const Component = (() => {
      switch (pagina) {
        case "Calculadora":
          return <Calculadora />;
        case "Contador":
          return <ClickCounter />;
        case "Jogo da Velha":
          return <TicTacToe />;
        case "Buscar CEP":
          return <CepSearch />;
        case "Dashboard":
        default:
          return <Home setPage={setPagina} />;
      }
    })();

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={pagina}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {Component}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-gray-900 min-h-screen"}>
      <Header
        setPage={setPagina}
        toggleDark={() => {
          setDarkMode(!darkMode);
          localStorage.setItem("dark", JSON.stringify(!darkMode));
        }}
        dark={darkMode}
      />

      {/* Suspense com Skeleton Loader enquanto carrega componente */}
      <Suspense
        fallback={
          <div className="flex flex-col gap-6 items-center justify-center h-[60vh] animate-pulse px-6">
            {[...Array(2)].map((_, row) => (
              <div key={row} className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
                {[...Array(2)].map((_, col) => (
                  <div key={col} className="rounded-xl bg-gray-300 dark:bg-gray-700 h-36 w-full" />
                ))}
              </div>
            ))}
          </div>
        }
      >
        <main className="p-6 md:ml-64 md:pl-16 max-w-5xl mx-auto transition-all duration-300">
          {renderizar()}
        </main>
      </Suspense>
    </div>
  );
}

export default App;
