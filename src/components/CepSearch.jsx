import { useState, useEffect } from 'react';

export default function CepSearch() {
  const [cep, setCep] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const [historico, setHistorico] = useState([]);

  const buscarCep = async () => {
    if (!cep || cep.length !== 8) {
      setErro('Digite um CEP válido com 8 números.');
      setResultado(null);
      return;
    }

    setLoading(true);
    setErro('');
    setResultado(null);

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      if (data.erro) {
        setErro('CEP não encontrado. Verifique e tente novamente.');
      } else {
        setResultado(data);
        salvarHistorico(data);
      }
    } catch {
      setErro('Erro ao buscar o CEP. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const salvarHistorico = (data) => {
    const novoItem = {
      cep: data.cep,
      local: `${data.logradouro || 'Sem logradouro'}, ${data.bairro} - ${data.localidade}/${data.uf}`
    };
    const novoHistorico = [novoItem, ...historico.filter((item) => item.cep !== data.cep)].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem('ceps', JSON.stringify(novoHistorico));
  };

  useEffect(() => {
    const cepsSalvos = localStorage.getItem('ceps');
    if (cepsSalvos) {
      setHistorico(JSON.parse(cepsSalvos));
    }
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl transition">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Buscar CEP</h2>

      <div className="flex gap-2">
        <input
          autoFocus
          type="text"
          aria-label="Campo de busca por CEP"
          placeholder="Digite o CEP (somente números)"
          value={cep}
          maxLength={8}
          onChange={(e) => setCep(e.target.value.replace(/[^0-9]/g, ''))}
          onKeyDown={(e) => e.key === 'Enter' && buscarCep()}
          className={`border p-3 w-full rounded bg-gray-100 dark:bg-gray-800 dark:text-white outline-none transition
            ${erro ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}`}
        />
        <button
          onClick={buscarCep}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-800 disabled:opacity-50 text-white px-4 py-2 rounded transition"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {erro && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 dark:bg-red-500 dark:text-white rounded transition">
          {erro}
        </div>
      )}

      {resultado && (
        <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-4 rounded text-left text-sm dark:text-white transition space-y-1">
          <p><strong>CEP:</strong> {resultado.cep}</p>
          <p><strong>Rua:</strong> {resultado.logradouro || 'Não disponível'}</p>
          <p><strong>Bairro:</strong> {resultado.bairro}</p>
          <p><strong>Cidade:</strong> {resultado.localidade} - {resultado.uf}</p>
          <p><strong>DDD:</strong> {resultado.ddd}</p>
          <p><strong>IBGE:</strong> {resultado.ibge}</p>
        </div>
      )}

      {historico.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Últimas buscas:</h3>
          <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
            {historico.map((item, idx) => (
              <li key={idx} className="hover:text-blue-500 cursor-pointer" onClick={() => setCep(item.cep)}>
                {item.cep} — {item.local}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
