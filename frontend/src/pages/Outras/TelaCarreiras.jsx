import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TelaCarreiras.css";

// ── Icons ──────────────────────────────────────────────────────────────────
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

// Ícones para benefícios
const GrowthIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 20L22 20M6 16L6 10M12 16L12 4M18 16L18 8"/>
  </svg>
);

const TeamIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const LearningIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 6v7m0 0v7m0-7h7m-7 0H5"/>
    <circle cx="12" cy="12" r="10"/>
  </svg>
);

const RemoteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10 11h4v4h-4zM4 7h16v12H4z"/>
    <path d="M8 3h8M12 19v2"/>
  </svg>
);

const HealthIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 12h-4l-3 9-4-18-3 9H2"/>
  </svg>
);

const InnovationIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

// ── Componente Header ──────────────────────────────────────────────────────
function Header() {
  return (
    <header className="carreiras-header">
      <div className="header-inner">
        <div className="header-left">
          <Link to="/" className="logo">BLINK</Link>
        </div>
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
          <Link to="/carreiras">Carreiras</Link>
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

// ── Tela de Carreiras ──────────────────────────────────────────────────────
export default function TelaCarreiras() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("carreiras@blink.co.mz");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="carreiras-page">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="carreiras-hero">
          <div className="hero-content-left">
            <h1 className="hero-title">
              Carreiras na <span className="accent">BLINK</span>
            </h1>
            <p className="hero-sub">
              Construa o futuro do comércio digital em Moçambique.<br />
              Junte-se a uma equipa inovadora e faça a diferença.
            </p>
          </div>
        </section>

        {/* Benefícios Section */}
        <section className="beneficios-section">
          <div className="container">
            <h2 className="section-title">Benefícios de Trabalhar na BLINK</h2>
            <p className="section-subtitle">O que oferecemos aos nossos colaboradores</p>
            
            <div className="beneficios-grid">
              <div className="beneficio-card">
                <div className="beneficio-icon"><GrowthIcon /></div>
                <h3>Crescimento Profissional</h3>
                <p>Plano de carreira estruturado, oportunidades de promoção interna e desenvolvimento contínuo de habilidades.</p>
              </div>
              
              <div className="beneficio-card">
                <div className="beneficio-icon"><TeamIcon /></div>
                <h3>Ambiente Colaborativo</h3>
                <p>Trabalhe com uma equipe jovem, dinâmica e multicultural, onde suas ideias são valorizadas.</p>
              </div>
              
              <div className="beneficio-card">
                <div className="beneficio-icon"><LearningIcon /></div>
                <h3>Aprendizagem Contínua</h3>
                <p>Acesso a cursos, workshops e certificações para manter-se atualizado no mercado digital.</p>
              </div>
              
              <div className="beneficio-card">
                <div className="beneficio-icon"><RemoteIcon /></div>
                <h3>Flexibilidade</h3>
                <p>Modelo híbrido de trabalho, com opção de home office e horários flexíveis.</p>
              </div>
              
              <div className="beneficio-card">
                <div className="beneficio-icon"><HealthIcon /></div>
                <h3>Saúde e Bem-estar</h3>
                <p>Seguro de saúde, ginásio e programas de apoio ao colaborador.</p>
              </div>
              
              <div className="beneficio-card">
                <div className="beneficio-icon"><InnovationIcon /></div>
                <h3>Inovação</h3>
                <p>Participe de projetos desafiadores e use tecnologia de ponta para transformar o comércio local.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Como é Trabalhar na BLINK */}
        <section className="cultura-section">
          <div className="container">
            <div className="cultura-grid">
              <div className="cultura-content">
                <h2>Como é Trabalhar na BLINK?</h2>
                <p>Na BLINK, acreditamos que pessoas talentosas e motivadas são o coração da nossa empresa. Aqui, você encontrará um ambiente onde a inovação, o respeito e a colaboração são pilares fundamentais.</p>
                
                <div className="cultura-itens">
                  <div className="cultura-item">
                    <div>
                      <strong>Propósito</strong>
                      <p>Trabalhamos para conectar pessoas e negócios, impulsionando o comércio em Moçambique.</p>
                    </div>
                  </div>
                  <div className="cultura-item">

                    <div>
                      <strong>Inovação</strong>
                      <p>Estimulamos a criatividade e o pensamento fora da caixa para resolver problemas reais.</p>
                    </div>
                  </div>
                  <div className="cultura-item">
                   
                    <div>
                      <strong>Colaboração</strong>
                      <p>Trabalhamos juntos, celebrando conquistas e aprendendo com os desafios.</p>
                    </div>
                  </div>
                  <div className="cultura-item">
                    
                    <div>
                      <strong>Impacto</strong>
                      <p>Seu trabalho terá impacto direto na vida de milhares de vendedores, intermediários e compradores.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cultura-image">
                <div className="image-placeholder">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#0C4A6E" strokeWidth="1">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vagas em Aberto */}
        <section className="vagas-section">
          <div className="container">
            <h2 className="section-title">Vagas em Aberto</h2>
            <p className="section-subtitle">Encontre a oportunidade perfeita para você</p>
            
            <div className="vagas-list">
              <div className="vaga-card">
                <div className="vaga-info">
                  <h3>Desenvolvedor Full Stack</h3>
                  <p>Desenvolvimento da plataforma web e mobile. Experiência com React, Node.js e bancos de dados.</p>
                  <div className="vaga-tags">
                    <span>Full-time</span>
                    <span>Híbrido</span>
                    <span>Maputo</span>
                  </div>
                </div>
              </div>
              
              <div className="vaga-card">
                <div className="vaga-info">
                  <h3>Coordenador de Intermediários</h3>
                  <p>Gestão da rede de intermediários, treinamentos e relacionamento com parceiros.</p>
                  <div className="vaga-tags">
                    <span>Full-time</span>
                    <span>Presencial</span>
                    <span>Maputo</span>
                  </div>
                </div>
              </div>
              
              <div className="vaga-card">
                <div className="vaga-info">
                  <h3>Analista de Marketing Digital</h3>
                  <p>Gestão de redes sociais, campanhas digitais e growth hacking para aquisição de usuários.</p>
                  <div className="vaga-tags">
                    <span>Full-time</span>
                    <span>Remoto</span>
                    <span>Qualquer local</span>
                  </div>
                </div>
              </div>
              
              <div className="vaga-card">
                <div className="vaga-info">
                  <h3>Suporte ao Cliente</h3>
                  <p>Atendimento a vendedores, intermediários e compradores via chat, email e WhatsApp.</p>
                  <div className="vaga-tags">
                    <span>Full-time</span>
                    <span>Híbrido</span>
                    <span>Maputo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Envio de Currículo */}
        <section className="candidatura-section">
          <div className="container">
            <div className="candidatura-card">
              <h2>Envie seu Currículo</h2>
              <p>Não encontrou uma vaga que se encaixa no seu perfil? Envie seu currículo para nosso banco de talentos.</p>
              
              <div className="email-container">
                <div className="email-box">
                  <MailIcon />
                  <span>carreiras@blink.co.mz</span>
                </div>
                <button className="btn-copy" onClick={handleCopyEmail}>
                  {copied ? "Copiado!" : "Copiar Email"}
                </button>
              </div>
              
              <p className="candidatura-note">
                Envie seu currículo com o assunto "Candidatura - [Sua Área de Interesse]"<br />
                Entraremos em contato assim que houver uma oportunidade compatível.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}