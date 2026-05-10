import React, { useState, useEffect } from "react";
import "./PopUpCookies.css";

// ── Componente do Modal de Cookies ─────────────────────────────────────────
export default function PopUpCookies({ isOpen, onClose }) {
  const [cookiesAceitos, setCookiesAceitos] = useState({
    essenciais: true, // Sempre true, não pode ser desligado
    analiticos: false,
    marketing: false,
    preferencias: false
  });

  if (!isOpen) return null;

  const handleCookieChange = (tipo) => {
    if (tipo !== 'essenciais') {
      setCookiesAceitos(prev => ({
        ...prev,
        [tipo]: !prev[tipo]
      }));
    }
  };

  const handleSalvarPreferencias = () => {
    // Salvar preferências no localStorage
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiesAceitos));
    localStorage.setItem('cookiesConsentido', 'true');
    onClose();
  };

  const handleAceitarTodos = () => {
    const todosAceitos = {
      essenciais: true,
      analiticos: true,
      marketing: true,
      preferencias: true
    };
    setCookiesAceitos(todosAceitos);
    localStorage.setItem('cookiePreferences', JSON.stringify(todosAceitos));
    localStorage.setItem('cookiesConsentido', 'true');
    onClose();
  };

  const handleRejeitarTodos = () => {
    const apenasEssenciais = {
      essenciais: true,
      analiticos: false,
      marketing: false,
      preferencias: false
    };
    setCookiesAceitos(apenasEssenciais);
    localStorage.setItem('cookiePreferences', JSON.stringify(apenasEssenciais));
    localStorage.setItem('cookiesConsentido', 'false');
    onClose();
  };

  return (
    <div className="cookie-modal-overlay" onClick={onClose}>
      <div className="cookie-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="cookie-modal-header">
          <h2>Configuração de Cookies</h2>
          <button className="cookie-modal-close" onClick={onClose}>×</button>
        </div>

        <div className="cookie-modal-body">
          <p className="cookie-intro">
            Utilizamos cookies para melhorar sua experiência em nossa plataforma. 
            Você pode escolher quais cookies deseja permitir.
          </p>

          {/* Cookies Essenciais (obrigatórios) */}
          <div className="cookie-group">
            <div className="cookie-group-header">
              <div className="cookie-info">
                <h3>Cookies Essenciais</h3>
                <p>Necessários para o funcionamento básico da plataforma.</p>
              </div>
              <div className="cookie-toggle">
                <span className="cookie-obrigatorio">Sempre ativos</span>
              </div>
            </div>
            <div className="cookie-details">
              <details>
                <summary>Ver detalhes</summary>
                <ul>
                  <li>Autenticação e segurança</li>
                  <li>Manter sessão do usuário</li>
                  <li>Prevenir fraudes</li>
                  <li>Funcionalidades básicas da plataforma</li>
                </ul>
              </details>
            </div>
          </div>

          {/* Cookies Analíticos */}
          <div className="cookie-group">
            <div className="cookie-group-header">
              <div className="cookie-info">
                <h3>Cookies Analíticos</h3>
                <p>Nos ajudam a entender como você usa nossa plataforma.</p>
              </div>
              <div className="cookie-toggle">
                <label className="cookie-switch">
                  <input 
                    type="checkbox" 
                    checked={cookiesAceitos.analiticos}
                    onChange={() => handleCookieChange('analiticos')}
                  />
                  <span className="cookie-slider"></span>
                </label>
              </div>
            </div>
            <div className="cookie-details">
              <details>
                <summary>Ver detalhes</summary>
                <ul>
                  <li>Páginas mais visitadas</li>
                  <li>Tempo de permanência no site</li>
                  <li>Taxa de conversão</li>
                  <li>Origem do tráfego</li>
                </ul>
              </details>
            </div>
          </div>

          {/* Cookies de Marketing */}
          <div className="cookie-group">
            <div className="cookie-group-header">
              <div className="cookie-info">
                <h3>Cookies de Marketing</h3>
                <p>Utilizados para personalizar anúncios e ofertas.</p>
              </div>
              <div className="cookie-toggle">
                <label className="cookie-switch">
                  <input 
                    type="checkbox" 
                    checked={cookiesAceitos.marketing}
                    onChange={() => handleCookieChange('marketing')}
                  />
                  <span className="cookie-slider"></span>
                </label>
              </div>
            </div>
            <div className="cookie-details">
              <details>
                <summary>Ver detalhes</summary>
                <ul>
                  <li>Anúncios personalizados</li>
                  <li>Compartilhamento com parceiros</li>
                  <li>Remarketing</li>
                  <li>Medição de campanhas</li>
                </ul>
              </details>
            </div>
          </div>

          {/* Cookies de Preferências */}
          <div className="cookie-group">
            <div className="cookie-group-header">
              <div className="cookie-info">
                <h3>Cookies de Preferências</h3>
                <p>Lembram suas escolhas e preferências.</p>
              </div>
              <div className="cookie-toggle">
                <label className="cookie-switch">
                  <input 
                    type="checkbox" 
                    checked={cookiesAceitos.preferencias}
                    onChange={() => handleCookieChange('preferencias')}
                  />
                  <span className="cookie-slider"></span>
                </label>
              </div>
            </div>
            <div className="cookie-details">
              <details>
                <summary>Ver detalhes</summary>
                <ul>
                  <li>Idioma preferido</li>
                  <li>Moeda de exibição</li>
                  <li>Preferências de notificação</li>
                  <li>Layout personalizado</li>
                </ul>
              </details>
            </div>
          </div>
        </div>

        <div className="cookie-modal-footer">
          <button className="cookie-btn cookie-btn-secondary" onClick={handleRejeitarTodos}>
            Rejeitar todos
          </button>
          <button className="cookie-btn cookie-btn-primary" onClick={handleSalvarPreferencias}>
            Salvar preferências
          </button>
          <button className="cookie-btn cookie-btn-accept" onClick={handleAceitarTodos}>
            Aceitar todos
          </button>
        </div>

        <div className="cookie-modal-footer-note">
          <p>Você pode alterar suas preferências a qualquer momento clicando em "Cookies" no rodapé da página.</p>
        </div>
      </div>
    </div>
  );
}