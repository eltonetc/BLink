import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SolicitacoesVendedor() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processandoId, setProcessandoId] = useState(null);
  const navigate = useNavigate();

  // Função para obter o token
  const getToken = () => {
    return localStorage.getItem("accessToken");
  };

  // Buscar solicitações recebidas
  const fetchSolicitacoes = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.error("Token não encontrado");
        navigate('/auth');
        return;
      }

      const response = await fetch('https://blink-oz62.onrender.com/api/requests/recebidas', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('blink_user');
        navigate('/auth');
        return;
      }

      if (!response.ok) {
        throw new Error("Erro ao buscar solicitações");
      }

      const data = await response.json();
      console.log("Solicitações recebidas:", data);

      // Formatar os dados para o componente
      const solicitacoesFormatadas = data.map(sol => ({
        id: sol.id,
        nome: sol.intermediario_nome || "Intermediário",
        avaliacao: sol.intermediario_avaliacao || 4.5,
        estrelas: Math.floor(sol.intermediario_avaliacao || 4.5),
        produto: sol.produto_nome,
        imgProduto: sol.produto_foto || "https://placehold.co/40x40/2d3748/ffffff?text=P",
        imgPerfil: sol.intermediario_foto || `https://placehold.co/48x48/4a90d9/ffffff?text=${(sol.intermediario_nome || 'I').charAt(0)}`,
        intermediario_id: sol.intermediario_id,
        produto_id: sol.produto_id,
        status: sol.status,
        data_solicitacao: sol.data_solicitacao
      }));

      setSolicitacoes(solicitacoesFormatadas);
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error);
    } finally {
      setLoading(false);
    }
  };

  // Aprovar solicitação
  const handleAprovar = async (solicitacaoId) => {
    setProcessandoId(solicitacaoId);
    try {
      const token = getToken();
      if (!token) { navigate('/auth'); return; }

      // NOVA ROTA AQUI (PUT e enviando o status no body)
      const response = await fetch(`https://blink-oz62.onrender.com/api/requests/${solicitacaoId}/responder`, {
        method: 'PUT', // MUDOU DE POST PARA PUT
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: "aceite" }) // ENVIANDO O STATUS
      });

      if (response.status === 401 || response.status === 403) { navigate('/auth'); return; }

      const data = await response.json();

      if (response.ok) {
        alert("Solicitação aprovada com sucesso!");
        setSolicitacoes(prev => prev.filter(s => s.id !== solicitacaoId));
      } else {
        alert(data.error || data.message || "Erro ao aprovar solicitação");
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor");
    } finally {
      setProcessandoId(null);
    }
  };

  // Rejeitar solicitação
  const handleRejeitar = async (solicitacaoId) => {
    setProcessandoId(solicitacaoId);
    try {
      const token = getToken();
      if (!token) { navigate('/auth'); return; }

      // NOVA ROTA AQUI (PUT e enviando o status no body)
      const response = await fetch(`https://blink-oz62.onrender.com/api/requests/${solicitacaoId}/responder`, {
        method: 'PUT', // MUDOU DE POST PARA PUT
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: "rejeitada" }) // ENVIANDO O STATUS
      });

      if (response.status === 401 || response.status === 403) { navigate('/auth'); return; }

      const data = await response.json();

      if (response.ok) {
        alert("Solicitação rejeitada!");
        setSolicitacoes(prev => prev.filter(s => s.id !== solicitacaoId));
      } else {
        alert(data.error || data.message || "Erro ao rejeitar solicitação");
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor");
    } finally {
      setProcessandoId(null);
    }
  };

  // Ver perfil do intermediário
  const handleVerPerfil = (intermediarioId) => {
    navigate(`/perfil/intermediario/${intermediarioId}`);
  };

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  // Componente Estrelas
  const Estrelas = ({ quantidade }) => {
    return (
      <span style={{ color: "#f6ad55", fontSize: 14 }}>
        {"★".repeat(quantidade)}{"☆".repeat(5 - quantidade)}
      </span>
    );
  };

  if (loading) {
    return (
      <div style={{ padding: "32px 36px", fontFamily: "'Segoe UI', sans-serif", textAlign: "center" }}>
        <div className="spinner"></div>
        <p>Carregando solicitações...</p>
        <style>{`
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #e2e8f0;
            border-top-color: #2d4a6e;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin: 0 auto 16px;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px 36px", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* CABEÇALHO */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <img
          src="https://placehold.co/64x64/2d4a6e/ffffff?text=V"
          alt="Vendedor"
          style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover" }}
        />
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1a202c", margin: 0 }}>
            Solicitações Pendentes
          </h1>
          <p style={{ color: "#718096", marginTop: 4 }}>
            {solicitacoes.length} solicitação(ões) aguardando sua resposta
          </p>
        </div>
        <button
          onClick={fetchSolicitacoes}
          style={{
            marginLeft: "auto",
            padding: "8px 16px",
            background: "#2d4a6e",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 500
          }}
        >
          ⟳ Atualizar
        </button>
      </div>

      {/* LISTA DE SOLICITAÇÕES */}
      {solicitacoes.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          background: "#f7f8fa",
          borderRadius: 12,
          border: "1px solid #e2e8f0"
        }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#1a202c", marginTop: 16 }}>
            Nenhuma solicitação pendente
          </p>
          <p style={{ color: "#718096", fontSize: 14 }}>
            Quando um intermediário solicitar seus produtos, aparecerá aqui.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {solicitacoes.map((s) => (
            <div key={s.id} style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: 32 }}>
              
              {/* PERFIL DO INTERMEDIÁRIO */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <img
                  src={s.imgPerfil}
                  alt={s.nome}
                  style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15, color: "#1a202c", margin: 0 }}>{s.nome}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                    <Estrelas quantidade={s.estrelas} />
                    <span style={{ fontSize: 13, color: "#718096" }}>({s.avaliacao})</span>
                  </div>
                </div>
              </div>

              {/* PRODUTO SOLICITADO */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#f7f8fa",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                padding: "12px 16px",
                marginBottom: 16
              }}>
                <img
                  src={s.imgProduto}
                  alt={s.produto}
                  style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover" }}
                />
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#718096", textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>
                    SOLICITOU VENDA DE:
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#1a202c", margin: 0 }}>{s.produto}</p>
                </div>
                {s.data_solicitacao && (
                  <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <p style={{ fontSize: 11, color: "#718096", margin: 0 }}>
                      {new Date(s.data_solicitacao).toLocaleDateString('pt-MZ')}
                    </p>
                  </div>
                )}
              </div>

              {/* BOTÕES */}
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <button
                  onClick={() => handleAprovar(s.id)}
                  disabled={processandoId === s.id}
                  style={{
                    background: "#2d4a6e",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "10px 24px",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: processandoId === s.id ? "not-allowed" : "pointer",
                    opacity: processandoId === s.id ? 0.6 : 1
                  }}
                >
                  {processandoId === s.id ? "Processando..." : "✓ Aprovar"}
                </button>
                <button
                  onClick={() => handleRejeitar(s.id)}
                  disabled={processandoId === s.id}
                  style={{
                    background: "#fff",
                    color: "#e53e3e",
                    border: "2px solid #e53e3e",
                    borderRadius: 6,
                    padding: "10px 24px",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: processandoId === s.id ? "not-allowed" : "pointer",
                    opacity: processandoId === s.id ? 0.6 : 1
                  }}
                >
                  {processandoId === s.id ? "..." : "✗ Rejeitar"}
                </button>
              </div>

              {/* VER PERFIL */}
              <button
                onClick={() => handleVerPerfil(s.intermediario_id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#2d4a6e",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  marginTop: 12,
                  textDecoration: "underline"
                }}
              >
                Ver Perfil Completo
              </button>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
