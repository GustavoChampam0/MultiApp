import { useState } from 'react';

export default function Calculadora() {
  const [valor, setValor] = useState('0');
  const [historico, setHistorico] = useState('');
  const operadores = ['+', '-', '*', '/'];

  const adicionar = (val) => {
    const ultimo = valor.slice(-1);
    if (operadores.includes(ultimo) && operadores.includes(val)) return;
    if (val === '.' && /(\.\d*)$/.test(valor)) return;
    if (val === '.' && valor.endsWith('.')) return;
    if (valor === '0' && val !== '.' && !operadores.includes(val)) {
      setValor(val);
      return;
    }
    setValor((prev) => prev + val);
  };

  const inverterSinal = () => {
    const partes = valor.match(/(-?\d+\.?\d*)$/);
    if (!partes) return;
    const num = partes[0];
    const start = valor.lastIndexOf(num);
    const invertido = num.startsWith('-') ? num.slice(1) : '-' + num;
    setValor(valor.slice(0, start) + invertido);
  };

  const porcentagem = () => {
    try {
      const resultado = eval(valor) / 100;
      setValor(resultado.toString());
    } catch {
      setValor('Erro');
    }
  };

  const calcular = () => {
    try {
      const resultado = eval(valor);
      if (!isFinite(resultado)) {
        setValor('Erro');
        return;
      }
      setHistorico(`${valor} =`);
      setValor(resultado.toString());
    } catch {
      setValor('Erro');
    }
  };

  const limpar = () => {
    setValor('0');
    setHistorico('');
  };

  const botoes = [
    ['AC', '+/-', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  const handleBotao = (btn) => {
    if (btn === 'AC') return limpar();
    if (btn === '+/-') return inverterSinal();
    if (btn === '%') return porcentagem();
    if (btn === '=') return calcular();
    adicionar(btn);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-sm bg-gradient-to-br from-gray-900 to-black dark:from-black dark:to-gray-900 p-6 rounded-2xl shadow-2xl transition">
        {historico && (
          <div className="text-right text-xs text-gray-400 mb-1 italic">{historico}</div>
        )}

        <input
          className="w-full text-right text-5xl bg-transparent text-white font-semibold mb-6 outline-none"
          value={valor}
          readOnly
        />

        {botoes.map((linha, i) => (
          <div key={i} className="grid grid-cols-4 gap-3 mb-3">
            {linha.map((btn) => {
              const isOperador = ['/', '*', '-', '+', '='].includes(btn);
              const isFuncional = ['AC', '+/-', '%'].includes(btn);
              const isZero = btn === '0';

              const base = 'py-4 rounded-full text-xl font-semibold shadow-sm transition-all';
              let estilo = '';

              if (isFuncional) {
                estilo = 'bg-gray-700 hover:bg-gray-600 text-white';
              } else if (isOperador) {
                estilo = 'bg-orange-500 hover:bg-orange-600 text-white';
              } else {
                estilo = 'bg-gray-100 hover:bg-gray-200 text-gray-900';
              }

              return (
                <button
                  key={btn}
                  onClick={() => handleBotao(btn)}
                  className={`${base} ${estilo} ${isZero ? 'col-span-2 text-left pl-6' : ''}`}
                >
                  {btn}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
