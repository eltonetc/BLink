import React, { useState } from "react";
import "./TelaSobre.css";

// ── Icons (inline SVGs) ──────────────────────────────────────────────────
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

// Stats Icons
const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const ProductsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const IntermediaryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
    <path d="M22 11l-3-3-3 3"/>
    <path d="M2 11l3-3 3 3"/>
  </svg>
);

const SatisfactionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 17a5 5 0 0 0 4-2"/>
    <line x1="8" y1="9" x2="8.01" y2="9"/>
    <line x1="16" y1="9" x2="16.01" y2="9"/>
  </svg>
);

const MapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const SalesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

// Missão/Vissão/Valores Icons
const TargetIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="12" cy="12" r="1"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const DiamondIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2l-6 8 6 8 6-8-6-8z"/>
    <path d="M6 10h12M12 2v18"/>
  </svg>
);

// Diferenciais Icons
const SecurityIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const TechnologyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const LocalIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const TrustIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

// Impacto Social Icons
const TrainingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 6v7m0 0v7m0-7h7m-7 0H5"/>
  </svg>
);

const GrowthIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9h-4m-7 9a9 9 0 0 1-9-9m9 9v-4M3 12a9 9 0 0 1 9-9m-9 9h4m7-9a9 9 0 0 1 9 9"/>
  </svg>
);

// Compartilhar e Email Icons para o Footer
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

// ── Dados ──────────────────────────────────────────────────────────────────

const statsNumbers = [
  { valor: "500+", label: "Vendedores Ativos", icone: <UsersIcon /> },
  { valor: "1.200+", label: "Produtos Catalogados", icone: <ProductsIcon /> },
  { valor: "150+", label: "Intermediários Certificados", icone: <IntermediaryIcon /> },
  { valor: "98%", label: "Taxa de Satisfação", icone: <SatisfactionIcon /> },
  { valor: "10+", label: "Províncias Atendidas", icone: <MapIcon /> },
  { valor: "2.400+", label: "Negociações Bem-sucedidas", icone: <SalesIcon /> },
];

const diferenciais = [
  {
    titulo: "Intermediários Certificados",
    descricao: "Todos os intermediários passam por um rigoroso processo de seleção e capacitação.",
    icone: <TrustIcon />
  },
  {
    titulo: "Segurança nas Transações",
    descricao: "Proteção para vendedores e compradores com nosso sistema de verificação.",
    icone: <SecurityIcon />
  },
  {
    titulo: "Suporte Local",
    descricao: "Equipe dedicada em Maputo e representantes nas principais províncias.",
    icone: <LocalIcon />
  },
  {
    titulo: "Tecnologia Avançada",
    descricao: "Plataforma otimizada para negociação segura e gestão de comissões.",
    icone: <TechnologyIcon />
  }
];

const depoimentos = [
  {
    nome: "Carlos Silva",
    papel: "Vendedor",
    texto: "A BLINK transformou meu negócio. Consegui aumentar minhas vendas em 200 por cento.",
    avatar: "CS"
  },
  {
    nome: "Amélia Santos",
    papel: "Intermediária",
    texto: "Ser intermediária na BLINK me permitiu monetizar minha rede de contatos.",
    avatar: "AS"
  },
  {
    nome: "João Macuacua",
    papel: "Comprador",
    texto: "Encontrei produtos que não achava em lugar nenhum, com total segurança.",
    avatar: "JM"
  }
];

const faqItems = [
  {
    pergunta: "Como me torno um intermediário?",
    resposta: "Basta se cadastrar na plataforma, passar pelo processo de verificação e concluir o treinamento obrigatório. Após aprovação, você já pode começar a receber oportunidades de venda."
  },
  {
    pergunta: "Quanto custa usar a plataforma?",
    resposta: "O cadastro é gratuito. A BLINK cobra apenas uma comissão sobre as vendas realizadas com sucesso, com taxas a partir de 5 por cento."
  },
  {
    pergunta: "Como funciona a garantia?",
    resposta: "Oferecemos garantia de segurança para ambas as partes. O pagamento fica retido na plataforma até a confirmação da entrega do produto."
  },
  {
    pergunta: "Qual o prazo para receber o pagamento?",
    resposta: "Vendedores recebem em até 3 dias úteis após a confirmação da entrega pelo comprador."
  }
];

// ── Components ──────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="sobre-header">
      <div className="header-inner">
        <div className="header-left">
          <a href="/" className="logo" style={{ color: '#0C4A6E' }}>BLINK</a>
        </div>
        <div className="header-right">
          <a href="#" className="nav-login">Login</a>
          <a href="#" className="nav-cta">Registrar</a>
        </div>
      </div>
      <div className="navbar-divider"></div>
    </header>
  );
}

function Hero() {
  return (
    <section className="sobre-hero">
      <div className="hero-content-left">
        <h1 className="hero-title">
          Revolucionando o<br />
          <span className="accent">Comércio em Moçambique</span>
        </h1>
        <p className="hero-sub">
          Conectamos vendedores, intermediários e compradores em uma plataforma<br />
          segura e eficiente, impulsionando o comércio local.
        </p>
      </div>
    </section>
  );
}

function Historia() {
  return (
    <section className="historia-section">
      <div className="container">
        <div className="historia-grid">
          <div className="historia-content">
            <h2 className="section-title-h2-left">Nossa História</h2>
            <p className="historia-text">
              A BLINK nasceu da necessidade de resolver um problema comum em Moçambique: 
              a dificuldade de conectar vendedores qualificados a compradores interessados, 
              com a segurança de um intermediário confiável.
            </p>
            <p className="historia-text">
              Percebemos que muitos produtos de qualidade não chegavam aos compradores certos 
              por falta de canais eficientes de distribuição e confiança nas transações.
            </p>
            <p className="historia-text highlight">
              Criamos a primeira plataforma B2B2C do país que une tecnologia e uma rede 
              nacional de intermediários certificados.
            </p>
          </div>
          <div className="historia-image">
            <div className="image-placeholder">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionVision() {
  return (
    <section className="mv-section">
      <div className="container">
        <div className="mv-grid">
          <div className="mv-card">
            <div className="mv-icon"><TargetIcon /></div>
            <h3>Missão</h3>
            <p>Democratizar o acesso a produtos de qualidade através de uma rede de intermediários confiáveis, impulsionando o comércio local em Moçambique.</p>
          </div>
          <div className="mv-card">
            <div className="mv-icon"><EyeIcon /></div>
            <h3>Visão</h3>
            <p>Ser a maior plataforma de conexão comercial da África Austral, referência em segurança e eficiência nas transações B2B2C.</p>
          </div>
          <div className="mv-card">
            <div className="mv-icon"><DiamondIcon /></div>
            <h3>Valores</h3>
            <ul className="valores-list">
              <li>Transparência e Confiança</li>
              <li>Compromisso com o Vendedor Local</li>
              <li>Inovação Contínua</li>
              <li>Impacto Social Positivo</li>
              <li>Agilidade e Eficiência</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="stats-section">
      <div className="container">
        <h2 className="section-title-h2">Números que Impressionam</h2>
        <p className="section-subtitle">O impacto da BLINK em números</p>
        <div className="stats-grid">
          {statsNumbers.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-icon">{stat.icone}</div>
              <div className="stat-valor">{stat.valor}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Diferenciais() {
  return (
    <section className="diferenciais-section">
      <div className="container">
        <h2 className="section-title-h2">Nossos Diferenciais</h2>
        <p className="section-subtitle">Por que escolher a BLINK</p>
        <div className="diferenciais-grid">
          {diferenciais.map((dif, index) => (
            <div className="diferencial-card" key={index}>
              <div className="diferencial-icon">{dif.icone}</div>
              <h3>{dif.titulo}</h3>
              <p>{dif.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#" className="logo" style={{ color: '#0C4A6E' }}>Marketplace</a>
          <p className="footer-tagline">A maior plataforma de conexão comercial entre vendedores e intermediários.</p>
          <div className="footer-icons">
            <ShareIcon />
            <MailIcon />
          </div>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">EMPRESA</p>
          <a href="#">Sobre</a>
          <a href="#">Carreiras</a>
          <a href="#">Contato</a>
          <a href="#">FAQ</a>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">LEGAL</p>
          <a href="#">Termos de Uso</a>
          <a href="#">Privacidade</a>
          <a href="#">Cookies</a>
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

// ── App ────────────────────────────────────────────────────────────────────
export default function PaginaSobre() {
  return (
    <div className="sobre-page">
      <Header />
      <main>
        <Hero />
        <Historia />
        <MissionVision />
        <StatsSection />
        <Diferenciais />
      </main>
      <Footer />
    </div>
  );
}