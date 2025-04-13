import { useState, useEffect } from 'react';

function Quadrado({ valor, aoClicar, destaque }) {
  return (
    <button
      onClick={aoClicar}
      aria-label={`Casa ${valor || 'vazia'}`}
      className={`w-20 h-20 sm:w-24 sm:h-24 text-3xl sm:text-4xl font-bold border border-gray-400 dark:border-gray-600 flex items-center justify-center transition-colors duration-300
        ${destaque ? 'bg-green-500 text-white animate-pulse' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white'}
        hover:bg-gray-100 dark:hover:bg-gray-700`}
    >
      {valor}
    </button>
  );
}

export default function TicTacToe() {
  const [modo, setModo] = useState(null); // 'versus' ou 'ia'
  const [dificuldade, setDificuldade] = useState('fácil');
  const [dificuldadeEscolhida, setDificuldadeEscolhida] = useState(false);
  const [iaComeca, setIaComeca] = useState(false);
  const [jogadorX, setJogadorX] = useState(true);
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null));
  const vencedor = calcularVencedor(tabuleiro);
  const empate = !vencedor && tabuleiro.every((c) => c !== null);
  const turnoAtual = jogadorX ? 'X' : 'O';

  useEffect(() => {
    if (modo === 'ia' && dificuldadeEscolhida && !jogadorX && !vencedor && !empate) {
      const timeout = setTimeout(() => {
        jogadaDaIa();
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [jogadorX, tabuleiro, modo, dificuldadeEscolhida]);

  const handleClick = (i) => {
    if (tabuleiro[i] || vencedor) return;
    if (modo === 'ia' && !jogadorX) return;

    const novo = [...tabuleiro];
    novo[i] = turnoAtual;
    setTabuleiro(novo);
    setJogadorX(!jogadorX);
  };

  const jogadaDaIa = () => {
    let index;
    const vazios = tabuleiro
      .map((val, idx) => (val === null ? idx : null))
      .filter((v) => v !== null);

    if (dificuldade === 'fácil') {
      index = vazios[Math.floor(Math.random() * vazios.length)];
    } else if (dificuldade === 'médio') {
      index = acharMelhorJogada(tabuleiro, 'O') ?? acharMelhorJogada(tabuleiro, 'X') ?? vazios[0];
    } else {
      index = minimax(tabuleiro, 'O').index;
    }

    if (index !== undefined) {
      const novo = [...tabuleiro];
      novo[index] = 'O';
      setTabuleiro(novo);
      setJogadorX(true);
    }
  };

  const acharMelhorJogada = (tab, jogador) => {
    const linhas = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, b, c] of linhas) {
      const linha = [tab[a], tab[b], tab[c]];
      const counts = linha.filter((v) => v === jogador).length;
      const vazio = linha.findIndex((v) => v === null);
      if (counts === 2 && vazio !== -1) {
        return [a, b, c][vazio];
      }
    }
    return null;
  };

  const resetar = () => {
    setTabuleiro(Array(9).fill(null));
    setJogadorX(true);
  };

  const status = vencedor
    ? `🎉 Vencedor: ${vencedor.jogador}`
    : empate
    ? '🤝 Empate!'
    : `➡ Próximo: ${turnoAtual}${modo === 'ia' && !jogadorX ? ' (IA)' : ''}`;

  if (!modo) {
    return (
      <div className="text-center mt-10 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Jogo da Velha</h2>
        <p className="text-gray-500 dark:text-gray-300">Escolha o modo de jogo:</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setModo('versus')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            👥 Contra outro jogador
          </button>
          <button
            onClick={() => {
              setModo('ia');
              setDificuldadeEscolhida(false);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            🤖 Contra IA
          </button>
        </div>
      </div>
    );
  }

  if (modo === 'ia' && !dificuldadeEscolhida) {
    return (
      <div className="text-center mt-10 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Escolha a dificuldade:</h2>
        <div className="flex justify-center gap-4 mb-4">
          {['fácil', 'médio', 'difícil'].map((nivel) => (
            <button
              key={nivel}
              onClick={() => {
                setDificuldade(nivel);
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition capitalize"
            >
              {nivel}
            </button>
          ))}
        </div>
        <p className="text-gray-400 text-sm">Quem começa?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setDificuldadeEscolhida(true);
              setJogadorX(true); // Jogador começa
              resetar();
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
          >
            🙋 Você
          </button>
          <button
            onClick={() => {
              setDificuldadeEscolhida(true);
              setJogadorX(false); // IA começa
              resetar();
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
          >
            🤖 IA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Jogo da Velha</h2>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">{status}</p>

      <div className="grid grid-cols-3 gap-2 justify-center w-max mx-auto">
        {tabuleiro.map((valor, i) => (
          <Quadrado
            key={i}
            valor={valor}
            aoClicar={() => handleClick(i)}
            destaque={vencedor?.linha.includes(i)}
          />
        ))}
      </div>

      <div className="mt-6 space-x-4">
        <button
          onClick={resetar}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
        >
          🔄 Reiniciar
        </button>
        <button
          onClick={() => {
            setModo(null);
            setDificuldadeEscolhida(false);
            resetar();
          }}
          className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition"
        >
          🏠 Voltar ao menu
        </button>
      </div>
    </div>
  );
}

function calcularVencedor(tab) {
  const linhas = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of linhas) {
    if (tab[a] && tab[a] === tab[b] && tab[a] === tab[c]) {
      return { jogador: tab[a], linha: [a, b, c] };
    }
  }
  return null;
}

function minimax(tab, jogador) {
  const huPlayer = 'X';
  const aiPlayer = 'O';
  const vazio = tab.map((v, i) => (v === null ? i : null)).filter((v) => v !== null);

  const vencedor = calcularVencedor(tab);
  if (vencedor?.jogador === huPlayer) return { score: -10, index: -1 };
  if (vencedor?.jogador === aiPlayer) return { score: 10, index: -1 };
  if (vazio.length === 0) return { score: 0, index: -1 };

  const movimentos = [];

  for (let i of vazio) {
    const novo = [...tab];
    novo[i] = jogador;

    const resultado = minimax(novo, jogador === aiPlayer ? huPlayer : aiPlayer);
    movimentos.push({ index: i, score: resultado.score });
  }

  let melhor;
  if (jogador === aiPlayer) {
    let melhorScore = -Infinity;
    movimentos.forEach((m) => {
      if (m.score > melhorScore) {
        melhorScore = m.score;
        melhor = m;
      }
    });
  } else {
    let melhorScore = Infinity;
    movimentos.forEach((m) => {
      if (m.score < melhorScore) {
        melhorScore = m.score;
        melhor = m;
      }
    });
  }

  return melhor;
}
