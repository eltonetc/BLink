import React, { useState, useEffect, useRef } from "react";
import "./TelaPrincipal.css";
import { Link } from "react-router-dom";
import PopUpCookie from "../Outras/PopUpCookies.jsx";

// ── Icons (inline SVGs to avoid extra deps) ──────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
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

// Category icons
const ElectronicsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);
const FashionIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.86H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.86l.58-3.57a2 2 0 0 0-1.34-2.11z"/>
  </svg>
);
const HomeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const CarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M19 17H5v-5l2-6h10l2 6v5z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>
  </svg>
);

// Ecosystem icons
const PublishIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    <line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
  </svg>
);
const VerifiedIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
  </svg>
);
const NegotiateIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

// ── Data vazia para conexão com BD ──────────────────────────────────────────
const CATEGORIES_VAZIAS = [];

const PRODUTOS_VAZIOS = [];

const ECOSYSTEM_FIXO = [
  {
    icon: <PublishIcon />,
    title: "Vendedor Publica",
    desc: "O vendedor cadastra seu produto com fotos e detalhes, definindo o valor em MZM e a comissão.",
  },
  {
    icon: <VerifiedIcon />,
    title: "Intermediário Verificado",
    desc: "Nossa rede de especialistas locais avalia o produto e se candidata para mediar a venda com segurança.",
  },
  {
    icon: <NegotiateIcon />,
    title: "Cliente Negocia",
    desc: "O comprador entra em contato via WhatsApp com o intermediário para fechar o negócio presencialmente ou via entrega.",
  },
];

// ── Components ────────────────────────────────────────────────────────────────

function Navbar({ categoriasRef, ecosystemRef }) {
  // Função para rolar suavemente até a seção
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <a href="#" className="logo">BLINK</a>
          <div className="search-bar">
            <SearchIcon />
            <input type="text" placeholder="Buscar produtos..." />
            <button className="cat-btn">CATEGORIAS <ChevronDown /></button>
          </div>
        </div>
        <div className="navbar-right">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(categoriasRef);
            }}
          >
            Categorias
          </a>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(ecosystemRef);
            }}
          >
            Como Funciona
          </a>
          <a href="#">Seja Intermediário</a>
          <a href="#" className="nav-login">Login</a>
          <a href="#" className="nav-cta">Registrar</a>
        </div>
      </div>
      <div className="navbar-divider"></div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-image-card">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80"
            alt="Plataforma BLINK"
          />
        </div>
        <div className="hero-content">
          <span className="hero-badge">PLATAFORMA B2B2C LÍDER</span>
          <h1 className="hero-title">
            Conectando <span className="accent">Vendedores</span>,<br />
            Intermediários e<br />
            Compradores.
          </h1>
          <p className="hero-sub">
            A forma mais segura e eficiente de escalar suas vendas
            através de uma rede nacional de intermediários certificados.
          </p>
          <div className="hero-actions">
            <a href="#" className="btn-primary">Começar a Vender</a>
            <a href="#" className="btn-secondary">Encontrar Produtos</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const [categorias, setCategorias] = useState(CATEGORIES_VAZIAS);
  const [dbConnected, setDbConnected] = useState(false);

  useEffect(() => {
    const verificarBD = async () => {
      // Muda para true e preenche os dados quando a BD estiver pronta
      const bdEstaConectada = false;

      if (bdEstaConectada) {
        setDbConnected(true);
        setCategorias([
          // Aqui vêm as categorias da BD
        ]);
      } else {
        setDbConnected(false);
        setCategorias([]);
      }
    };

    verificarBD();
  }, []);

  return (
    <section id="categorias-section" className="categories-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Categorias Populares</h2>
          <p className="section-sub">Explore as oportunidades por setor de atuação</p>
        </div>
        {categorias.length > 0 && <a href="#" className="ver-todas">Ver todas</a>}
      </div>
      
      {!dbConnected || categorias.length === 0 ? (
        <div className="empty-state-categories">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="21" x2="9" y2="9"/>
          </svg>
          <p>Categorias indisponíveis</p>
          <small>Aguardando conexão com a base de dados...</small>
        </div>
      ) : (
        <div className="categories-grid">
          {categorias.map((cat) => (
            <div className="category-card" key={cat.name}>
              <div className="cat-icon">{cat.icon}</div>
              <p className="cat-name">{cat.name}</p>
              <p className="cat-count">{cat.count}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function Products() {
  const [price, setPrice] = useState(100000);
  const [isNew, setIsNew] = useState(true);
  const [isUsed, setIsUsed] = useState(false);
  const [produtos, setProdutos] = useState(PRODUTOS_VAZIOS);
  const [dbConnected, setDbConnected] = useState(false);

  useEffect(() => {
    const verificarBD = async () => {
      // Muda para true e preenche os dados quando a BD estiver pronta
      const bdEstaConectada = false;

      if (bdEstaConectada) {
        setDbConnected(true);
        setProdutos([
          // Aqui vêm os produtos da BD
        ]);
      } else {
        setDbConnected(false);
        setProdutos([]);
      }
    };

    verificarBD();
  }, []);

  return (
    <section className="products-section">
      <h2 className="section-title">Produtos em Destaque</h2>
      <div className="products-layout">
        {/* Filters */}
        <div className="filters-card">
          <p className="filters-title">FILTROS</p>
          <div className="filter-group">
            <label className="filter-label">PREÇO (MZM)</label>
            <div className="price-range-labels">
              <span>0 MT</span>
              <span>100.000+ MT</span>
            </div>
            <input
              type="range"
              min="0"
              max="100000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="range-slider"
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">ESTADO</label>
            <label className="checkbox-label">
              <input type="checkbox" checked={isNew} onChange={() => setIsNew(!isNew)} />
              <span>Novo</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" checked={isUsed} onChange={() => setIsUsed(!isUsed)} />
              <span>Usado</span>
            </label>
          </div>
          <button className="clear-btn">Limpar Filtros</button>
        </div>

        {/* Product Cards */}
        {!dbConnected || produtos.length === 0 ? (
          <div className="empty-state-products">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.18A3 3 0 0 0 8.18 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              <circle cx="12" cy="13" r="3"/>
            </svg>
            <p>Produtos indisponíveis</p>
            <small>Aguardando conexão com a base de dados...</small>
          </div>
        ) : (
          <div className="product-cards">
            {produtos.map((p) => (
              <div className="product-card" key={p.name}>
                <div className="product-img-wrap">
                  {p.badge && <span className={`product-badge ${p.badge === "NOVO" ? "badge-new" : "badge-featured"}`}>{p.badge}</span>}
                  <img src={p.img} alt={p.name} />
                </div>
                <div className="product-info">
                  <span className="intermediaries-tag">{p.intermediaries} Intermediários</span>
                  <p className="product-name">{p.name}</p>
                  <p className="product-price">{p.price},00 MZM</p>
                  <button className="btn-details">
                    Ver Detalhes <ArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section id="ecosystem-section" className="ecosystem-section">
      <div className="ecosystem-inner">
        <h2 className="section-title">Como Funciona o Ecossistema</h2>
        <p className="section-sub">Três pilares integrados para garantir a melhor experiência de negociação.</p>
        <div className="ecosystem-grid">
          {ECOSYSTEM_FIXO.map((item) => (
            <div className="eco-card" key={item.title}>
              <div className="eco-icon">{item.icon}</div>
              <h3 className="eco-title">{item.title}</h3>
              <p className="eco-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ onOpenCookieModal }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#" className="logo footer-logo">Marketplace</a>
          <p className="footer-tagline">A maior plataforma de conexão comercial entre vendedores e intermediários.</p>
          <div className="footer-icons">
            <ShareIcon />
            <MailIcon />
          </div>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">EMPRESA</p>
          <Link to="/sobre">Sobre</Link>
          <a href="#">Carreiras</a>
          <a href="#">Contato</a>
          <a href="#">FAQ</a>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">LEGAL</p>
          <a href="#">Termos de Uso</a>
          <a href="#">Privacidade</a>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            onOpenCookieModal();
          }}>Cookies</a>
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

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  // Criar referências para as seções
  const categoriasRef = useRef(null);
  const ecosystemRef = useRef(null);
  
  // State para controle do modal de cookies
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  return (
    <div className="app">
      <Navbar categoriasRef={categoriasRef} ecosystemRef={ecosystemRef} />
      <main>
        <Hero />
        <div ref={categoriasRef}>
          <Categories />
        </div>
        <Products />
        <div ref={ecosystemRef}>
          <Ecosystem />
        </div>
      </main>
      <Footer onOpenCookieModal={() => setCookieModalOpen(true)} />
      
      {/* PopUpCookie integrado */}
      <PopUpCookie 
        isOpen={cookieModalOpen} 
        onClose={() => setCookieModalOpen(false)} 
      />
    </div>
  );
}