import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListagemIntermediarios from "./pages/Intermediario/ListagemIntermediarios";
import PerfilIntermediario from './pages/intermediario/PerfilIntermediario';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Menu de navegação - NÃO AFETA O PERFIL */}
        <div className="menu-navegacao">
          <Link to="/" className="menu-link">📋 Listagem</Link>
          <Link to="/perfil" className="menu-link">👤 Perfil</Link>
        </div>

        <Routes>
          <Route path="/" element={<ListagemIntermediarios />} />
          <Route path="/perfil" element={<PerfilIntermediario />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;