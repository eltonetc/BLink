import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TelaContacto.css";

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

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

// ── Componente Header ──────────────────────────────────────────────────────
function Header() {
  return (
    <header className="contacto-header">
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
          <a href="#">Carreiras</a>
          <a href="#">FAQ</a>
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

// ── Tela de Contacto ────────────────────────────────────────────────────────
export default function TelaContacto() {
  const [formData, setFormData] = useState({
    nome: "",
    contacto: "",
    empresa: "",
    endereco: "",
    pergunta: ""
  });
  
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Por agora, apenas simula o envio sem conexão com BD
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setFormData({ nome: "", contacto: "", empresa: "", endereco: "", pergunta: "" });
    }, 3000);
  };

  return (
    <div className="contacto-page">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="contacto-hero">
          <div className="hero-content-left">
            <h1 className="hero-title">
              Fale <span className="accent">Conosco</span>
            </h1>
            <p className="hero-sub">
              Estamos aqui para ajudar. Entre em contato através dos canais abaixo<br />
              ou envie sua pergunta pelo formulário.
            </p>
          </div>
        </section>

        {/* Informações de Contacto */}
        <section className="info-section">
          <div className="container">
            <div className="info-grid">
              <div className="info-card">
                <div className="info-icon"><MailIcon /></div>
                <h3>Email</h3>
                <p>geral@blink.co.mz</p>
                <p>suporte@blink.co.mz</p>
                <small>Respondemos em até 24h</small>
              </div>
              
              <div className="info-card">
                <div className="info-icon"><PhoneIcon /></div>
                <h3>Telefone / WhatsApp</h3>
                <p>+258 84 345 6789</p>
                <p>+258 82 123 4567</p>
                <small>Segunda a Sexta, 8h às 17h</small>
              </div>
              
              <div className="info-card">
                <div className="info-icon"><MapPinIcon /></div>
                <h3>Endereço</h3>
                <p>Avenida Julius Nyerere, nº 123</p>
                <p>Maputo, Moçambique</p>
                <small>Edifício BLINK, 3º Andar</small>
              </div>
              
              <div className="info-card">
                <div className="info-icon"><ClockIcon /></div>
                <h3>Horário de Funcionamento</h3>
                <p>Segunda a Sexta: 8h - 18h</p>
                <p>Sábado: 9h - 13h</p>
                <small>Domingo: Fechado</small>
              </div>
            </div>
          </div>
        </section>

        {/* Formulário de Contacto */}
        <section className="form-section">
          <div className="container">
            <div className="form-container">
              <div className="form-header">
                <h2 className="form-title">Envie sua Pergunta</h2>
                <p className="form-subtitle">Preencha os campos abaixo e responderemos assim que possível.</p>
              </div>

              {enviado ? (
                <div className="success-message">
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#0C4A6E" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                  <h3>Mensagem Enviada!</h3>
                  <p>Agradecemos pelo seu contacto. Responderemos em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contacto-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nome Completo *</label>
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Digite seu nome completo"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Contacto (Telefone/WhatsApp) *</label>
                      <input
                        type="tel"
                        name="contacto"
                        value={formData.contacto}
                        onChange={handleChange}
                        placeholder="+258 84 123 4567"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Empresa (opcional)</label>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        placeholder="Nome da sua empresa"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Endereço (opcional)</label>
                      <input
                        type="text"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleChange}
                        placeholder="Cidade, Bairro, Rua"
                      />
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label>Pergunta / Mensagem *</label>
                    <textarea
                      name="pergunta"
                      value={formData.pergunta}
                      onChange={handleChange}
                      placeholder="Descreva sua dúvida ou mensagem..."
                      rows="5"
                      required
                    ></textarea>
                  </div>

                  <div className="form-note">
                    <p>* Campos obrigatórios</p>
                  </div>

                  <button type="submit" className="btn-enviar">
                    <SendIcon />
                    Enviar Mensagem
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}