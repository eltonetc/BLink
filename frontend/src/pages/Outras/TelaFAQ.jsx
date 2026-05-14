import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TelaFAQ.css";

// ── Icons ──────────────────────────────────────────────────────────────────
const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const ChevronUp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m18 15-6-6-6 6"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

// ── Componente Header (simplificado) ──────────────────────────────────────
function Header() {
  return (
    <header className="faq-header">
      <div className="header-inner">
        <Link to="/" className="logo">BLINK</Link>
        <div className="header-right">
          <Link to="/login" className="nav-login">Login</Link>
          <Link to="/registrar" className="nav-cta">Registrar</Link>
        </div>
      </div>
      <div className="navbar-divider"></div>
    </header>
  );
}

// ── Componente Footer ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="logo" style={{ color: '#0C4A6E' }}>Marketplace</Link>
          <p className="footer-tagline">A maior plataforma de conexão comercial entre vendedores e intermediários.</p>
          <div className="footer-icons">
            <ShareIcon />
            <MailIcon />
          </div>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">EMPRESA</p>
          <Link to="/sobre">Sobre</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/faq">FAQ</Link>
          <a href="#">Carreiras</a>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">LEGAL</p>
          <Link to="/termos/intermediario">Termos de Uso</Link>
          <Link to="/privacidade">Privacidade</Link>
          <Link to="/privacidade" state={{ scrollTo: "seguranca" }}>Segurança</Link>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">NEWSLETTER</p>
          <p className="footer-newsletter-sub">Receba as melhores oportunidades de 2026 por e-mail.</p>
          <input className="newsletter-input" type="email" placeholder="seu@email.com" />
          <button className="btn-primary newsletter-btn">Inscrever</button>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 BLINK. Todos os direitos reservados.</span>
        <span>Português (MZ) &nbsp;|&nbsp; MZM (MT)</span>
      </div>
    </footer>
  );
}

// ── Dados das FAQs ─────────────────────────────────────────────────────────
const faqCategories = [
  {
    id: "geral",
    nome: "Geral",
    perguntas: [
      {
        pergunta: "O que é a BLINK?",
        resposta: "A BLINK é uma plataforma B2B2C que conecta vendedores, intermediários certificados e compradores em Moçambique, facilitando negociações seguras e eficientes."
      },
      {
        pergunta: "Como funciona a plataforma?",
        resposta: "O vendedor publica seus produtos, intermediários se candidatam para mediar a venda, e o comprador negocia diretamente com o intermediário para finalizar a transação."
      },
      {
        pergunta: "A BLINK é gratuita?",
        resposta: "O cadastro na plataforma é gratuito. Cobramos apenas uma comissão sobre as vendas realizadas com sucesso."
      }
    ]
  },
  {
    id: "vendedor",
    nome: "Para Vendedores",
    perguntas: [
      {
        pergunta: "Como me cadastro como vendedor?",
        resposta: "Basta clicar em 'Registrar' no canto superior direito, escolher a opção 'Vendedor' e preencher seus dados. Após verificação, você já pode começar a publicar seus produtos."
      },
      {
        pergunta: "Quanto custa publicar um produto?",
        resposta: "A publicação é gratuita. A BLINK cobra apenas 3% de comissão sobre o valor da venda realizada."
      },
      {
        pergunta: "Como recebo o pagamento das vendas?",
        resposta: "O valor é transferido para sua conta bancária em até 3 dias úteis após a confirmação da entrega pelo comprador."
      }
    ]
  },
  {
    id: "intermediario",
    nome: "Para Intermediários",
    perguntas: [
      {
        pergunta: "Como me torno um intermediário?",
        resposta: "Cadastre-se na plataforma, passe pelo processo de verificação e conclua o treinamento obrigatório. Após aprovação, você já pode começar a receber oportunidades."
      },
      {
        pergunta: "Qual a comissão do intermediário?",
        resposta: "O vendedor define a comissão no momento da publicação, geralmente entre 5% a 15% do valor da venda. A BLINK não cobra taxa adicional do intermediário."
      },
      {
        pergunta: "Preciso ter NUIT?",
        resposta: "Não é obrigatório para iniciar, mas é altamente recomendado, especialmente para transações de maior valor."
      }
    ]
  },
  {
    id: "comprador",
    nome: "Para Compradores",
    perguntas: [
      {
        pergunta: "Como comprar na BLINK?",
        resposta: "Navegue pelos produtos, entre em contato com o intermediário via WhatsApp ou chat da plataforma, negocie e finalize a compra. O pagamento é protegido pela BLINK."
      },
      {
        pergunta: "É seguro comprar na BLINK?",
        resposta: "Sim! O pagamento fica retido na plataforma até a confirmação da entrega. Se o produto não corresponder à descrição, você tem direito a reembolso."
      },
      {
        pergunta: "Posso devolver o produto?",
        resposta: "Sim, você tem até 7 dias após o recebimento para solicitar devolução caso o produto não esteja conforme anunciado."
      }
    ]
  },
  {
    id: "pagamento",
    nome: "Pagamentos",
    perguntas: [
      {
        pergunta: "Quais formas de pagamento são aceitas?",
        resposta: "Aceitamos transferência bancária, depósito em conta M-Pesa, e pagamento presencial ao intermediário (com garantia da plataforma)."
      },
      {
        pergunta: "Quando o vendedor recebe o pagamento?",
        resposta: "Após a confirmação da entrega pelo comprador, o pagamento é liberado em até 3 dias úteis."
      },
      {
        pergunta: "O pagamento é seguro?",
        resposta: "Sim, o valor fica retido na BLINK até a confirmação da entrega, garantindo segurança tanto para comprador quanto para vendedor."
      }
    ]
  },
  {
    id: "seguranca",
    nome: "Segurança",
    perguntas: [
      {
        pergunta: "Como a BLINK protege meus dados?",
        resposta: "Utilizamos criptografia de ponta a ponta, autenticação de dois fatores e seguimos rigorosamente a Lei de Proteção de Dados. Seus dados nunca são vendidos."
      },
      {
        pergunta: "O que fazer em caso de fraude?",
        resposta: "Entre em contato imediatamente com nosso suporte através do email suporte@blink.co.mz ou WhatsApp +258 84 345 6789."
      },
      {
        pergunta: "Os intermediários são verificados?",
        resposta: "Sim, todos os intermediários passam por um rigoroso processo de verificação de identidade e background check antes de serem aprovados."
      }
    ]
  }
];

// ── Tela de FAQ ────────────────────────────────────────────────────────────
export default function TelaFAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("geral");
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleQuestion = (categoryId, index) => {
    const key = `${categoryId}-${index}`;
    setOpenQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const activeFaq = faqCategories.find(cat => cat.id === activeCategory);
  
  // Filtrar perguntas por busca
  const filteredQuestions = activeFaq.perguntas.filter(q =>
    q.pergunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.resposta.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="faq-page">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="faq-hero">
          <div className="hero-content-left">
            <h1 className="hero-title">
              Perguntas <span className="accent">Frequentes</span>
            </h1>
            <p className="hero-sub">
              Tire suas dúvidas sobre a plataforma BLINK. Se não encontrar a resposta,<br />
              entre em contato conosco através da página de contacto.
            </p>
          </div>
        </section>

        {/* Busca */}
        <section className="search-section">
          <div className="container">
            <div className="search-container">
              <SearchIcon />
              <input
                type="text"
                placeholder="Buscar perguntas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Categorias e Conteúdo */}
        <section className="faq-content-section">
          <div className="container">
            <div className="faq-layout">
              {/* Sidebar de Categorias */}
              <aside className="faq-sidebar">
                <h3>Categorias</h3>
                <div className="category-list">
                  {faqCategories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`category-btn ${activeCategory === cat.id ? "active" : ""}`}
                      onClick={() => setActiveCategory(cat.id)}
                    >
                      {cat.nome}
                    </button>
                  ))}
                </div>
              </aside>

              {/* Lista de Perguntas */}
              <div className="faq-questions">
                <h2 className="category-title">{activeFaq.nome}</h2>
                
                {filteredQuestions.length === 0 ? (
                  <div className="no-results">
                    <p>Nenhuma pergunta encontrada para "{searchTerm}"</p>
                    <small>Tente buscar por outra palavra</small>
                  </div>
                ) : (
                  <div className="questions-list">
                    {filteredQuestions.map((item, index) => {
                      const key = `${activeCategory}-${index}`;
                      const isOpen = openQuestions[key];
                      
                      return (
                        <div className={`faq-item ${isOpen ? "open" : ""}`} key={index}>
                          <button
                            className="faq-question"
                            onClick={() => toggleQuestion(activeCategory, index)}
                          >
                            <span>{item.pergunta}</span>
                            {isOpen ? <ChevronUp /> : <ChevronDown />}
                          </button>
                          <div className="faq-answer">
                            <p>{item.resposta}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contato Adicional */}
        <section className="contact-cta">
          <div className="container">
            <div className="contact-cta-card">
              <h3>Ainda tem dúvidas?</h3>
              <p>Não encontrou a resposta que procura? Entre em contato diretamente com nossa equipe.</p>
              <Link to="/contacto" className="btn-contact">Falar com Suporte</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}