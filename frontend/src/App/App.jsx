import { Routes, Route } from 'react-router-dom';
import AuthPage from '../pages/Auth/AuthPage';
import DashboardVendedor from '../pages/Vendedor/DashboardVendedor';
import ClienteDashboardPage from '../pages/Cliente/ClienteDashboardPage';
import DashboardIntermediario from '../pages/Intermediario/DashboardIntermediario';
import SolicitacoesVendedor from '../pages/Vendedor/SolicitacoesVendedor';
import SolicitacoesIntermediario from '../pages/Intermediario/SolicitacoesIntermediario';
import SolicitacoesCliente from '../pages/Cliente/SolicitacoesCliente';
import TelaChat from '../pages/Chat/TelaChat';
import TelaSobre from '../pages/Outras/TelaSobre';
import TelaTC from '../pages/Outras/TelaTC';
import TelaPrincipal from '../pages/Principal/TelaPrincipal';
import TelaPrivacidade from "../pages/Outras/TelaPrivacidade";
import TelaContacto from "../pages/Outras/TelaContacto";
import TelaFAQ from "../pages/Outras/TelaFAQ";
import TelaCarreiras from "../pages/Outras/TelaCarreiras";

function App() {
  return (
    <Routes> 
      <Route path="/" element={<AuthPage />} />
      <Route path="/auth" element={<AuthPage />} />
      {/* PRINCIPAL*/}
      <Route path="/principal" element={<TelaPrincipal />} />
      {/* CHAT */}
      <Route path="/chat" element={<TelaChat />} />
      {/* Outras */}
      <Route path="/carreiras" element={<TelaCarreiras />} />
      <Route path="/faq" element={<TelaFAQ />} />
      <Route path="/contacto" element={<TelaContacto />} />
      <Route path="/privacidade" element={<TelaPrivacidade />} />
      <Route path="/tc" element={<TelaTC />} />
      <Route path="/sobre" element={<TelaSobre />} />
      {/* VENDEDOR */}
      <Route path="/cadastro-produto" element={<DashboardVendedor />} />
      <Route path="/vendedor/dashboard" element={<DashboardVendedor />} />
      {/* CLIENTE */}
      <Route path="/cliente/dashboard" element={<ClienteDashboardPage />} />
      {/* INTERMEDIÁRIO */}
      <Route path="/intermediario/dashboard" element={<DashboardIntermediario />} />
      <Route path="/vendedor/solicitacoes" element={<SolicitacoesVendedor />} />
      <Route path="/intermediario/solicitacoes" element={<SolicitacoesIntermediario />} />
      <Route path="/cliente/solicitacoes" element={<SolicitacoesCliente />} />
      
      {/* FALLBACK */}
      <Route path="*" element={<div>Rota não encontrada</div>} />
    </Routes>
  );
}

export default App;