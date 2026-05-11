import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListagemIntermediarios from "./pages/Intermediario/ListagemIntermediarios";
import PerfilIntermediario from './pages/intermediario/PerfilIntermediario';
import ListagemProduto from './pages/Produto/ListagemProduto'; // ← adiciona
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="menu-navegacao">
          <Link to="/" className="menu-link">📋 Listagem</Link>
          <Link to="/perfil" className="menu-link">👤 Perfil</Link>
          <Link to="/produtos" className="menu-link">📱 Produtos</Link> {/* ← adiciona */}
        </div>

        <Routes>
          <Route path="/" element={<ListagemIntermediarios />} />
          <Route path="/perfil" element={<PerfilIntermediario />} />
          <Route path="/produtos" element={<ListagemProduto />} /> {/* ← adiciona */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;