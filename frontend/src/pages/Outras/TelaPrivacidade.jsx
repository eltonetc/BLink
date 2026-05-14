import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TelaPrivacidade.css";

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

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const DatabaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
  </svg>
);

const GlobalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const MailOutlineIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

// ── Componente Header ──────────────────────────────────────────────────────
function Header() {
  return (
    <header className="privacidade-header">
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
          <a href="#">Carreiras</a>
          <a href="#">Contato</a>
          <a href="#">FAQ</a>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">LEGAL</p>
          <Link to="/termos/intermediario">Termos de Uso</Link>
          <Link to="/privacidade">Privacidade</Link>
          <a href="#">Segurança</a>
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

// ── Tela de Privacidade ────────────────────────────────────────────────────
export default function TelaPrivacidade() {
  const [activeSection, setActiveSection] = useState("coleta");
  const [aceito, setAceito] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const sections = [
    { id: "coleta", titulo: "Coleta de Informações", icon: <DatabaseIcon /> },
    { id: "uso", titulo: "Uso das Informações", icon: <EyeIcon /> },
    { id: "compartilhamento", titulo: "Compartilhamento de Dados", icon: <GlobalIcon /> },
    { id: "direitos", titulo: "Seus Direitos", icon: <UserIcon /> },
    { id: "seguranca", titulo: "Segurança dos Dados", icon: <LockIcon /> },
    { id: "retencao", titulo: "Retenção de Dados", icon: <DatabaseIcon /> },
    { id: "menores", titulo: "Menores de Idade", icon: <ShieldIcon /> },
    { id: "contato", titulo: "Contato", icon: <MailOutlineIcon /> },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  const handleDownload = () => {
    alert("Funcionalidade em desenvolvimento. Em breve você poderá baixar seus dados.");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Tem certeza que deseja solicitar a exclusão da sua conta? Esta ação é irreversível.")) {
      alert("Solicitação de exclusão enviada. Você receberá um e-mail com as instruções.");
    }
  };

  const handleCorrigirDados = () => {
    alert("Redirecionando para página de edição de perfil...");
  };

  return (
    <div className="privacidade-page">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="privacidade-hero">
          <div className="hero-content-left">
            <h1 className="hero-title">
              Política de <span className="accent">Privacidade</span>
            </h1>
            <p className="hero-sub">
              A BLINK valoriza a sua privacidade e está comprometida em proteger os seus dados pessoais.
            </p>
            <p className="hero-date">Última atualização: Maio de 2026</p>
          </div>
        </section>

        {/* Índice / Menu de navegação */}
        <section className="indice-section">
          <div className="container">
            <div className="indice-container">
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`indice-item ${activeSection === section.id ? "active" : ""}`}
                  onClick={() => scrollToSection(section.id)}
                >
                  <span className="indice-icon">{section.icon}</span>
                  <span className="indice-label">{section.titulo}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Seções de Conteúdo */}
        <div className="container">
          {/* Coleta de Informações */}
          <section id="coleta" className="privacidade-section">
            <div className="section-card">
              <div className="section-header-left">
                <div className="section-icon"><DatabaseIcon /></div>
                <h2 className="section-title">Coleta de Informações</h2>
              </div>
              <div className="section-content">
                <p>A BLINK coleta as seguintes informações para garantir o funcionamento adequado da plataforma:</p>
                <ul>
                  <li><strong>Informações de cadastro:</strong> Nome completo, e-mail, telefone, documento de identificação (para intermediários e vendedores).</li>
                  <li><strong>Informações de perfil:</strong> Foto, endereço, tipo de conta (vendedor, intermediário, comprador).</li>
                  <li><strong>Informações de transação:</strong> Produtos visualizados, negociações realizadas, valores de venda e comissões.</li>
                  <li><strong>Informações técnicas:</strong> Endereço IP, tipo de dispositivo, navegador, sistema operacional.</li>
                  <li><strong>Informações de localização:</strong> Apenas com seu consentimento explícito, para facilitar entregas.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Uso das Informações */}
          <section id="uso" className="privacidade-section">
            <div className="section-card">
              <div className="section-header-left">
                <div className="section-icon"><EyeIcon /></div>
                <h2 className="section-title">Uso das Informações</h2>
              </div>
              <div className="section-content">
                <p>Utilizamos seus dados para:</p>
                <ul>
                  <li>Facilitar negociações entre vendedores, intermediários e compradores.</li>
                  <li>Processar pagamentos e comissões de forma segura.</li>
                  <li>Verificar identidade e prevenir fraudes.</li>
                  <li>Melhorar a plataforma e sua experiência de usuário.</li>
                  <li>Enviar notificações sobre negociações e atualizações da plataforma.</li>
                  <li>Cumprir obrigações legais e regulatórias.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Compartilhamento de Dados */}
          <section id="compartilhamento" className="privacidade-section">
            <div className="section-card">
              <div className="section-header-left">
                <div className="section-icon"><GlobalIcon /></div>
                <h2 className="section-title">Compartilhamento de Dados</h2>
              </div>
              <div className="section-content">
                <p>Seus dados podem ser compartilhados nas seguintes situações:</p>
                <ul>
                  <li><strong>Com intermediários:</strong> Nome, contato e histórico de negociação para facilitar a venda.</li>
                  <li><strong>Com vendedores:</strong> Dados necessários para conclusão da transação.</li>
                  <li><strong>Com compradores:</strong> Dados do intermediário para coordenação da entrega.</li>
                  <li><strong>Parceiros de pagamento:</strong> Dados bancários para processamento de transações.</li>
                  <li><strong>Autoridades legais:</strong> Quando exigido por lei ou ordem judicial.</li>
                </ul>
                <p className="highlight">Importante: A BLINK nunca vende seus dados pessoais para terceiros.</p>
              </div>
            </div>
          </section>

          {/* Seus Direitos */}
          <section id="direitos" className="privacidade-section">
            <div className="section-card">
              <div className="section-header-left">
                <div className="section-icon"><UserIcon /></div>
                <h2 className="section-title">Seus Direitos</h2>
              </div>
              <div className="section-content">
                <p>De acordo com a legislação aplicável, você tem os seguintes direitos:</p>
                <div className="direitos-grid">
                  <div className="direito-item">
                    <strong>Acesso</strong>
                    <p>Saber quais dados temos sobre você e como são utilizados.</p>
                  </div>
                  <div className="direito-item">
                    <strong>Correção</strong>
                    <p>Corrigir dados incompletos, inexatos ou desatualizados.</p>
                  </div>
                  <div className="direito-item">
                    <strong>Exclusão</strong>
                    <p>Solicitar a remoção dos seus dados da plataforma.</p>
                  </div>
                  <div className="direito-item">
                    <strong>Portabilidade</strong>
                    <p>Receber seus dados em formato digital para transferência.</p>
                  </div>
                  <div className="direito-item">
                    <strong>Revogação</strong>
                    <p>Retirar seu consentimento a qualquer momento.</p>
                  </div>
                  <div className="direito-item">
                    <strong>Oposição</strong>
                    <p>Recusar uso de dados para finalidades específicas.</p>
                  </div>
                </div>
    
              </div>
            </div>
          </section>

          {/* Segurança dos Dados */}
          <section id="seguranca" className="privacidade-section">
            <div className="section-card">
              <div className="section-header-left">
                <div className="section-icon"><LockIcon /></div>
                <h2 className="section-title">Segurança dos Dados</h2>
              </div>
              <div className="section-content">
                <p>Adotamos as seguintes medidas para proteger seus dados:</p>
                <ul>
                  <li>Criptografia de dados sensíveis em trânsito e em repouso.</li>
                  <li>Autenticação de dois fatores (2FA) disponível para todos os usuários.</li>
                  <li>Monitoramento 24/7 contra acessos não autorizados.</li>
                  <li>Backups seguros e redundantes.</li>
                  <li>Auditorias regulares de segurança.</li>
                  <li>Equipe dedicada à proteção de dados.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Retenção de Dados */}
          <section id="retencao" className="privacidade-section">
            <div className="section-card">
              <div className="section-header-left">
                <div className="section-icon"><DatabaseIcon /></div>
                <h2 className="section-title">Retenção de Dados</h2>
              </div>
              <div className="section-content">
                <ul>
                  <li><strong>Contas ativas:</strong> Dados mantidos durante todo o período de uso da plataforma.</li>
                  <li><strong>Contas inativas:</strong> Dados removidos após 12 meses de inatividade.</li>
                  <li><strong>Transações:</strong> Mantidas por 5 anos para fins fiscais e legais.</li>
                  <li><strong>Comprovantes:</strong> Disponíveis para consulta por 3 anos.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Menores de Idade */}
          <section id="menores" className="privacidade-section">
            <div className="section-card">
              <div className="section-header-left">
                <div className="section-icon"><ShieldIcon /></div>
                <h2 className="section-title">Menores de Idade</h2>
              </div>
              <div className="section-content">
                <p>A plataforma BLINK é destinada a maiores de 18 anos. Não coletamos conscientemente dados de menores de idade. Se você é responsável legal e acredita que um menor forneceu dados à plataforma, entre em contato conosco para solicitar a remoção.</p>
              </div>
            </div>
          </section>

          {/* Contato */}
          <section id="contato" className="privacidade-section">
            <div className="section-card">
              <div className="section-header-left">
                <div className="section-icon"><MailOutlineIcon /></div>
                <h2 className="section-title">Contato - Encarregado de Dados</h2>
              </div>
              <div className="section-content">
                <div className="contato-info">
                  <p><strong>Encarregado de Proteção de Dados (DPO):</strong></p>
                  <p>Email: <a href="mailto:privacidade@blink.co.mz">privacidade@blink.co.mz</a></p>
                  <p>WhatsApp: <a href="tel:+258843456789">+258 84 345 6789</a></p>
                  <p>Endereço: Maputo, Moçambique</p>
                </div>
                <div className="contato-info">
                  <p><strong>Ouvidoria:</strong></p>
                  <p>Email: <a href="mailto:ouvidoria@blink.co.mz">ouvidoria@blink.co.mz</a></p>
                </div>
              </div>
            </div>
          </section>

          {/* Aceitação */}
          <section className="aceitacao-section">
            <div className="aceitacao-card">
              <label className="checkbox-label-aceitacao">
                <input 
                  type="checkbox" 
                  checked={aceito} 
                  onChange={() => setAceito(!aceito)} 
                />
                <span>Li e concordo com a Política de Privacidade da BLINK</span>
              </label>
              <button className="btn-salvar" disabled={!aceito}>
                Salvar Preferências
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}