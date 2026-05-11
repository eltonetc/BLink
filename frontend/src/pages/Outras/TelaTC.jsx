import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TelaTC.css";

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

// ── Componente Header ──────────────────────────────────────────────────────
function Header() {
  return (
    <header className="termos-header">
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

// ── Conteúdo dos Termos ────────────────────────────────────────────────────
const termosConteudo = {
  intermediario: {
    titulo: "Termos e Condições - Intermediário",
    descricao: "Ao se cadastrar como intermediário na plataforma BLINK, você concorda com os seguintes termos:",
    secoes: [
      {
        titulo: "1. Cadastro e Verificação",
        conteudo: "Para se tornar um intermediário, você deve passar por um processo de verificação de identidade e background check. A BLINK reserva-se o direito de aprovar ou recusar qualquer cadastro a seu critério."
      },
      {
        titulo: "2. Comissões",
        conteudo: "Os intermediários recebem uma comissão sobre cada venda concluída com sucesso. A porcentagem da comissão é definida pelo vendedor no momento da publicação do produto e varia entre 5% a 15% do valor da venda."
      },
      {
        titulo: "3. Responsabilidades",
        conteudo: "O intermediário é responsável por: (a) Mediar a comunicação entre vendedor e comprador; (b) Verificar a autenticidade do produto; (c) Garantir a entrega segura do produto; (d) Reportar qualquer problema à plataforma imediatamente."
      },
      {
        titulo: "4. Pagamentos",
        conteudo: "Os pagamentos das comissões são processados semanalmente, transferidos para a conta bancária indicada no cadastro. A BLINK retém o valor até a confirmação da entrega pelo comprador."
      },
      {
        titulo: "5. Conduta Proibida",
        conteudo: "É expressamente proibido: (a) Falsificar produtos ou informações; (b) Contatar compradores fora da plataforma; (c) Compartilhar dados sensíveis; (d) Praticar qualquer ato de má-fé."
      },
      {
        titulo: "6. Cancelamento",
        conteudo: "O intermediário pode cancelar seu cadastro a qualquer momento. A BLINK pode suspender ou cancelar contas que violem estes termos sem aviso prévio."
      },
      {
        titulo: "7. Atualizações dos Termos",
        conteudo: "A BLINK pode atualizar estes termos periodicamente. Os intermediários serão notificados com antecedência e devem aceitar as novas condições para continuar usando a plataforma."
      }
    ]
  },
  vendedor: {
    titulo: "Termos e Condições - Vendedor",
    descricao: "Ao publicar produtos na plataforma BLINK como vendedor, você concorda com os seguintes termos:",
    secoes: [
      {
        titulo: "1. Cadastro de Produtos",
        conteudo: "O vendedor é responsável por fornecer informações precisas e verdadeiras sobre seus produtos, incluindo fotos, descrição, preço e condição do item. Informações falsas podem resultar em suspensão da conta."
      },
      {
        titulo: "2. Comissões e Taxas",
        conteudo: "A BLINK cobra uma taxa de 3% sobre o valor total de cada venda realizada. O vendedor define a comissão do intermediário (entre 5% a 15%). O valor líquido é pago ao vendedor após a confirmação da entrega."
      },
      {
        titulo: "3. Garantia dos Produtos",
        conteudo: "O vendedor garante que os produtos são originais, estão em boas condições (ou informa claramente defeitos) e que possui direito legal de vendê-los. Produtos falsificados ou roubados são estritamente proibidos."
      },
      {
        titulo: "4. Prazo de Entrega",
        conteudo: "O vendedor deve disponibilizar o produto para entrega ao intermediário em até 48 horas após a confirmação da venda. Atrasos recorrentes podem resultar em penalidades."
      },
      {
        titulo: "5. Reembolsos e Devoluções",
        conteudo: "Em caso de produto defeituoso ou não conforme, o comprador tem direito a reembolso integral. O vendedor deve aceitar a devolução e a BLINK reembolsará o comprador usando fundos retidos do vendedor."
      },
      {
        titulo: "6. Propriedade Intelectual",
        conteudo: "O vendedor mantém todos os direitos sobre seus produtos, mas concede à BLINK uma licença para usar imagens e descrições para promoção da plataforma."
      },
      {
        titulo: "7. Suspensão da Conta",
        conteudo: "A BLINK pode suspender contas de vendedores que recebam muitas reclamações, violem os termos ou ajam de má fé. O vendedor pode recorrer da decisão em até 30 dias."
      }
    ]
  },
  cliente: {
    titulo: "Termos e Condições - Cliente",
    descricao: "Ao comprar produtos através da plataforma BLINK, você concorda com os seguintes termos:",
    secoes: [
      {
        titulo: "1. Cadastro e Verificação",
        conteudo: "O cliente deve fornecer informações verdadeiras durante o cadastro. A BLINK pode solicitar verificação adicional para compras de alto valor para segurança de todas as partes."
      },
      {
        titulo: "2. Processo de Compra",
        conteudo: "Ao confirmar a compra, o cliente autoriza a retenção do valor pagamento pela BLINK. O intermediário será notificado e coordenará a entrega. O pagamento só é liberado ao vendedor após confirmação do cliente."
      },
      {
        titulo: "3. Prazo para Reclamação",
        conteudo: "O cliente tem até 7 dias após o recebimento do produto para reportar qualquer problema ou solicitar devolução. Após esse prazo, a transação é considerada concluída com sucesso."
      },
      {
        titulo: "4. Devoluções e Reembolsos",
        conteudo: "Se o produto não corresponder à descrição, estiver danificado ou for falsificado, o cliente tem direito a reembolso integral. A BLINK mediará o processo de devolução com o vendedor."
      },
      {
        titulo: "5. Taxas Adicionais",
        conteudo: "O cliente não paga taxas adicionais à BLINK. O preço final é o valor combinado com o intermediário. O cliente é responsável por eventuais custos de envio, quando aplicável."
      },
      {
        titulo: "6. Privacidade e Dados",
        conteudo: "Os dados do cliente são protegidos conforme nossa Política de Privacidade. As informações de contato são compartilhadas apenas com o intermediário para fins da transação."
      },
      {
        titulo: "7. Conduta do Cliente",
        conteudo: "O cliente deve agir de boa fé durante a negociação e compra. Cancelamentos repetidos ou falsas reclamações podem resultar em suspensão da conta."
      },
      {
        titulo: "8. Segurança nas Transações",
        conteudo: "Todas as transações são monitoradas pela BLINK. Recomenda-se que o cliente nunca realize pagamentos fora da plataforma, pois isso anula a proteção oferecida."
      }
    ]
  }
};

// ── Componente Principal ────────────────────────────────────────────────────
export default function TermosCondicoes() {
  const [tipoAtivo, setTipoAtivo] = useState("intermediario");
  
  const conteudo = termosConteudo[tipoAtivo];

  return (
    <div className="termos-page">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="termos-hero">
          <div className="hero-content-left">
            <h1 className="hero-title">
              Termos e <span className="accent">Condições</span>
            </h1>
            <p className="hero-sub">
              Conheça as regras e diretrizes para uso da plataforma BLINK.<br />
              Selecione seu perfil abaixo para ver os termos específicos.
            </p>
          </div>
        </section>

        {/* Tabs para selecionar o perfil */}
        <section className="tabs-section">
          <div className="container">
            <div className="tabs-container">
              <button 
                className={`tab-btn ${tipoAtivo === "intermediario" ? "active" : ""}`}
                onClick={() => setTipoAtivo("intermediario")}
              >
                Para Intermediários
              </button>
              <button 
                className={`tab-btn ${tipoAtivo === "vendedor" ? "active" : ""}`}
                onClick={() => setTipoAtivo("vendedor")}
              >
                Para Vendedores
              </button>
              <button 
                className={`tab-btn ${tipoAtivo === "cliente" ? "active" : ""}`}
                onClick={() => setTipoAtivo("cliente")}
              >
                Para Clientes
              </button>
            </div>
          </div>
        </section>

        {/* Conteúdo dos Termos */}
        <section className="termos-conteudo-section">
          <div className="container">
            <div className="termos-card">
              <h2 className="termos-titulo">{conteudo.titulo}</h2>
              <p className="termos-descricao">{conteudo.descricao}</p>
              
              <div className="termos-secoes">
                {conteudo.secoes.map((secao, index) => (
                  <div className="termo-item" key={index}>
                    <h3 className="termo-titulo">{secao.titulo}</h3>
                    <p className="termo-conteudo">{secao.conteudo}</p>
                  </div>
                ))}
              </div>
              
              <div className="termos-footer-card">
                <p>Data da última atualização: 15 de Maio de 2026</p>
                <p>Ao continuar usando a plataforma, você concorda com estes termos.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
            <Link to="/faq">FAQ</Link>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">LEGAL</p>
            <Link to="/termos/intermediario">Termos de Uso</Link>
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
    </div>
  );
}