import { useState, useMemo } from "react";
import "./ListagemProduto.css";

// ─── DATA ────────────────────────────────────────────────────────────────────

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB – Blue Titanium",
    price: 85000,
    badge: "INTERMEDIÁRIO",
    rating: 4.9,
    location: "Maputo, MZ",
    condition: "Usado",
    category: "Smartphones",
    bgColor: "#0d3d3d",
    label: "safe\nwork",
    isPro: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra 512GB – Cream",
    price: 52500,
    badge: "VENDA DIRETA",
    rating: 4.7,
    location: "Beira, MZ",
    condition: "Usado",
    category: "Smartphones",
    gradient: "linear-gradient(135deg,#1a237e 0%,#00bcd4 50%,#1a237e 100%)",
    isPro: false,
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro – Porcelain",
    price: 72000,
    badge: "INTERMEDIÁRIO",
    rating: 5.0,
    location: "Nampula, MZ",
    condition: "Usado",
    category: "Smartphones",
    gradient: "linear-gradient(135deg,#ff6f00,#e040fb,#00e5ff,#76ff03)",
    isPro: true,
  },
  {
    id: 4,
    name: "Sony WH-1000XM5 Noise Canceling",
    price: 22800,
    badge: "VENDA DIRETA",
    rating: 4.5,
    location: "Matola, MZ",
    condition: "Usado",
    category: "Acessórios",
    bgColor: "#1a1a1a",
    iconType: "headphone",
    isPro: false,
  },
  {
    id: 5,
    name: "iPhone 14 128GB – Midnight",
    price: 48000,
    badge: "INTERMEDIÁRIO",
    rating: 4.8,
    location: "Maputo, MZ",
    condition: "Novo",
    category: "Smartphones",
    gradient: "linear-gradient(135deg,#0d47a1,#1565c0)",
    isPro: true,
  },
  {
    id: 6,
    name: "Samsung Galaxy Tab S9 – Graphite",
    price: 45000,
    badge: "VENDA DIRETA",
    rating: 4.6,
    location: "Beira, MZ",
    condition: "Novo",
    category: "Tablets",
    bgColor: "#263238",
    iconType: "tablet",
    isPro: false,
  },
  {
    id: 7,
    name: "Apple AirPods Pro 2ª Geração",
    price: 18500,
    badge: "INTERMEDIÁRIO",
    rating: 4.9,
    location: "Maputo, MZ",
    condition: "Novo",
    category: "Acessórios",
    bgColor: "#e8e8e8",
    iconType: "airpods",
    isPro: true,
  },
  {
    id: 8,
    name: "Xiaomi 13 Pro 256GB – Ceramic White",
    price: 39900,
    badge: "VENDA DIRETA",
    rating: 4.4,
    location: "Nampula, MZ",
    condition: "Usado",
    category: "Smartphones",
    gradient: "linear-gradient(135deg,#283593,#512da8)",
    isPro: false,
  },
  {
    id: 9,
    name: "iPad Air 5ª Geração 256GB – Blue",
    price: 62000,
    badge: "INTERMEDIÁRIO",
    rating: 4.7,
    location: "Maputo, MZ",
    condition: "Novo",
    category: "Tablets",
    bgColor: "#1565c0",
    iconType: "ipad",
    isPro: true,
  },
];

const CATEGORIES = [
  { name: "Smartphones", count: 843 },
  { name: "Acessórios", count: 241 },
  { name: "Tablets", count: 185 },
];

const SORT_OPTIONS = ["Mais recentes", "Menor preço", "Maior preço", "Melhor avaliação"];

function fmtMT(v) {
  return v.toLocaleString("pt-MZ") + " MT";
}

// ─── ICONES (design) ─────────────────────────────────────────────────────────

const IconHeadphone = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const IconTablet = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12" y2="18" />
  </svg>
);

const IconAirpods = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
    <path d="M6 8c0-3.3 2.7-6 6-6s6 2.7 6 6v2c0 3.3-2.7 6-6 6s-6-2.7-6-6V8z" />
    <path d="M12 14v6" />
    <path d="M9 20h6" />
  </svg>
);

const IconIpad = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <line x1="12" y1="15" x2="12" y2="15" />
  </svg>
);

const IconSmartphone = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
    <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12" y2="18" />
  </svg>
);

const IconSearch = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
    <circle cx="10" cy="10" r="7" />
    <line x1="15" y1="15" x2="21" y2="21" />
  </svg>
);

const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconTwitter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const IconMessage = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

function getProductIcon(iconType) {
  switch (iconType) {
    case "headphone": return <IconHeadphone />;
    case "tablet": return <IconTablet />;
    case "airpods": return <IconAirpods />;
    case "ipad": return <IconIpad />;
    default: return <IconSmartphone />;
  }
}

// ─── PRODUCT IMAGE ────────────────────────────────────────────────────────────

function ProductImage({ product }) {
  const bg = product.gradient || product.bgColor || "#222";

  if (product.label) {
    const lines = product.label.split("\n");
    return (
      <div className="bk-img-inner" style={{ background: bg }}>
        <div className="bk-safe-label">
          {lines.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </div>
    );
  }
  if (product.iconType) {
    return (
      <div className="bk-img-inner" style={{ background: bg }}>
        {getProductIcon(product.iconType)}
      </div>
    );
  }
  return (
    <div className="bk-img-inner" style={{ background: bg }}>
      <IconSmartphone />
    </div>
  );
}

// ─── TOAST ───────────────────────────────────────────────────────────────────

function Toast({ msg }) {
  if (!msg) return null;
  return <div className="bk-toast">{msg}</div>;
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────

function ProductCard({ product, isFav, onFav, onClick, viewMode }) {
  return (
    <div
      className={`bk-card${viewMode === "list" ? " bk-card--list" : ""}`}
      onClick={() => onClick(product)}
    >
      <div className="bk-card__img">
        <ProductImage product={product} />
        <button
          className={`bk-heart${isFav ? " bk-heart--on" : ""}`}
          onClick={(e) => { e.stopPropagation(); onFav(product.id); }}
          title={isFav ? "Remover favorito" : "Adicionar favorito"}
        >
          {isFav ? "♥" : "♡"}
        </button>
      </div>
      <div className="bk-card__body">
        <div className="bk-card__meta">
          <span className={`bk-badge${product.badge === "INTERMEDIÁRIO" ? " bk-badge--int" : " bk-badge--venda"}`}>
            {product.badge}
          </span>
          <span className="bk-rating">★ {product.rating.toFixed(1)}</span>
        </div>
        <div className="bk-card__name">{product.name}</div>
        <div className="bk-card__price">{fmtMT(product.price)}</div>
        <div className="bk-card__loc">
          <svg width="10" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          {product.location}
        </div>
      </div>
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────

function ProductModal({ product, isFav, onFav, onClose, onToast }) {
  if (!product) return null;
  return (
    <div className="bk-overlay" onClick={onClose}>
      <div className="bk-modal" onClick={(e) => e.stopPropagation()}>
        <button className="bk-modal__close" onClick={onClose}>✕</button>
        <div className="bk-modal__img">
          <ProductImage product={product} />
        </div>
        <div className="bk-modal__body">
          <span className={`bk-badge${product.badge === "INTERMEDIÁRIO" ? " bk-badge--int" : " bk-badge--venda"}`}>
            {product.badge}
          </span>
          <h2 className="bk-modal__title">{product.name}</h2>
          <div className="bk-modal__price">{fmtMT(product.price)}</div>
          <div className="bk-modal__meta">
            <span className="bk-rating">★ {product.rating.toFixed(1)}</span>
            <span className="bk-card__loc">
              <svg width="10" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {product.location}
            </span>
            <span className="bk-cond-pill">{product.condition}</span>
          </div>
          <div className="bk-modal__actions">
            <button className="bk-btn-buy" onClick={() => onToast("Redirecionando para compra...")}>
              Comprar Agora
            </button>
            <button
              className={`bk-btn-fav${isFav ? " active" : ""}`}
              onClick={() => onFav(product.id)}
            >
              {isFav ? "♥ Salvo" : "♡ Favoritar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function BlinkMarketplace() {
  const [activeCategory, setActiveCategory] = useState("Smartphones");
  const [priceMax, setPriceMax] = useState(50000);
  const [condNovo, setCondNovo] = useState(false);
  const [condUsado, setCondUsado] = useState(true);
  const [proToggle, setProToggle] = useState(true);
  const [minRating, setMinRating] = useState(0);
  const [locationInput, setLocationInput] = useState("");

  const [tagUsado, setTagUsado] = useState(true);
  const [tagPro, setTagPro] = useState(true);
  const [tagPrice, setTagPrice] = useState(true);

  const [sortBy, setSortBy] = useState("Mais recentes");
  const [showSort, setShowSort] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [favs, setFavs] = useState(new Set());
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState("");
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");

  const PER_PAGE = 6;

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  }

  function toggleFav(id) {
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); showToast("Removido dos favoritos"); }
      else { next.add(id); showToast("Adicionado aos favoritos ♥"); }
      return next;
    });
  }

  const filtered = useMemo(() => {
    let list = ALL_PRODUCTS.filter((p) => {
      if (p.category !== activeCategory) return false;
      if (tagPrice && p.price > priceMax) return false;
      if (tagUsado && condUsado && !condNovo && p.condition !== "Usado") return false;
      if (condNovo && !condUsado && p.condition !== "Novo") return false;
      if (tagPro && proToggle && !p.isPro) return false;
      if (minRating && p.rating < minRating) return false;
      if (locationInput && !p.location.toLowerCase().includes(locationInput.toLowerCase())) return false;
      return true;
    });
    if (sortBy === "Menor preço") list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === "Maior preço") list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === "Melhor avaliação") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCategory, priceMax, condNovo, condUsado, proToggle, tagUsado, tagPro, tagPrice, minRating, sortBy, locationInput]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function clearFilters() {
    setCondNovo(false);
    setCondUsado(false);
    setProToggle(false);
    setMinRating(0);
    setTagUsado(false);
    setTagPro(false);
    setTagPrice(false);
    setLocationInput("");
    setPriceMax(50000);
    setPage(1);
    showToast("Filtros limpos");
  }

  function handleNewsletter() {
    if (!email.includes("@")) { showToast("Insira um email válido"); return; }
    showToast("Subscrito com sucesso! ✓"); setEmail("");
  }

  return (
    <div className="bk-app">
      <Toast msg={toast} />

      <ProductModal
        product={selected}
        isFav={selected ? favs.has(selected.id) : false}
        onFav={toggleFav}
        onClose={() => setSelected(null)}
        onToast={showToast}
      />

      {/* NAV */}
      <nav className="bk-nav">
        <div className="bk-logo">BLINK</div>
        <div className="bk-nav__links">
          <a href="#" className="bk-nav__link bk-nav__link--active">Categorias</a>
          <a href="#" className="bk-nav__link">Como Funciona</a>
          <a href="#" className="bk-nav__link">Seja Intermediário</a>
        </div>
        <div className="bk-nav__right">
          <button className="bk-login" onClick={() => showToast("Abrindo login...")}>Login</button>
          <button className="bk-register" onClick={() => showToast("Abrindo registo...")}>Registrar</button>
        </div>
      </nav>

      {/* BREADCRUMB */}
      <div className="bk-breadcrumb">HOME › ELETRÔNICOS › <span>SMARTPHONES</span></div>

      {/* PAGE HEADER */}
      <div className="bk-page-header">
        <div>
          <h1 className="bk-page-title">Smartphones e Acessórios</h1>
          <p className="bk-page-sub">Mostrando {filtered.length.toLocaleString()} resultados encontrados em Moçambique</p>
        </div>
        <div className="bk-header-right">
          <div className="bk-view-btns">
            <button className={viewMode === "grid" ? "active" : ""} onClick={() => setViewMode("grid")} title="Grelha">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                <rect x="0" y="0" width="7" height="7" rx="1"/><rect x="9" y="0" width="7" height="7" rx="1"/>
                <rect x="0" y="9" width="7" height="7" rx="1"/><rect x="9" y="9" width="7" height="7" rx="1"/>
              </svg>
            </button>
            <button className={viewMode === "list" ? "active" : ""} onClick={() => setViewMode("list")} title="Lista">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                <rect x="0" y="1" width="16" height="3" rx="1"/><rect x="0" y="6" width="16" height="3" rx="1"/>
                <rect x="0" y="11" width="16" height="3" rx="1"/>
              </svg>
            </button>
          </div>
          <div className="bk-sort-wrap">
            <button className="bk-sort-btn" onClick={() => setShowSort((v) => !v)}>
              {sortBy} <span className="bk-sort-arrow">▾</span>
            </button>
            {showSort && (
              <div className="bk-sort-menu">
                {SORT_OPTIONS.map((opt) => (
                  <div key={opt} className={`bk-sort-opt${sortBy === opt ? " active" : ""}`}
                    onClick={() => { setSortBy(opt); setShowSort(false); setPage(1); }}>
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ACTIVE TAGS */}
      <div className="bk-active-filters">
        <span className="bk-filter-label">Filtros ativos:</span>
        {condUsado && <div className="bk-tag">Usado <span onClick={() => { setCondUsado(false); setTagUsado(false); showToast("Filtro removido"); }}>✕</span></div>}
        {proToggle && <div className="bk-tag">Intermediário PRO <span onClick={() => { setProToggle(false); setTagPro(false); showToast("Filtro removido"); }}>✕</span></div>}
        {tagPrice && <div className="bk-tag">Até {fmtMT(priceMax)} <span onClick={() => { setTagPrice(false); showToast("Filtro removido"); }}>✕</span></div>}
        {!condUsado && !proToggle && !tagPrice && <span className="bk-no-tags">Nenhum filtro activo</span>}
      </div>

      {/* MAIN LAYOUT */}
      <div className="bk-layout">
        {/* SIDEBAR */}
        <aside className="bk-sidebar">
          <div className="bk-sidebar__head">
            <span className="bk-sidebar__title">Filtros</span>
            <button className="bk-clear" onClick={clearFilters}>LIMPAR FILTROS</button>
          </div>

          <div className="bk-filter-block">
            <div className="bk-filter-label2">CATEGORIAS <span className="bk-chevron">∧</span></div>
            {CATEGORIES.map((cat) => (
              <div key={cat.name}
                className={`bk-filter-row${activeCategory === cat.name ? " active" : ""}`}
                onClick={() => { setActiveCategory(cat.name); setPage(1); }}>
                <span>{cat.name}</span>
                <span className={`bk-count${activeCategory === cat.name ? " bk-count--on" : ""}`}>{cat.count}</span>
              </div>
            ))}
          </div>

          <div className="bk-filter-block">
            <div className="bk-filter-label2">FAIXA DE PREÇO</div>
            <input type="range" className="bk-slider" min={1000} max={200000} step={1000}
              value={priceMax}
              onChange={(e) => { setPriceMax(Number(e.target.value)); setTagPrice(true); setPage(1); }} />
            <div className="bk-price-row">
              <span>5.000 MT</span><span className="bk-price-dash">—</span><span>{fmtMT(priceMax)}</span>
            </div>
          </div>

          <div className="bk-filter-block">
            <div className="bk-filter-label2">LOCALIZAÇÃO</div>
            <div className="bk-loc-wrap">
              <svg width="12" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <input className="bk-loc-input" placeholder="Cidade ou Província"
                value={locationInput}
                onChange={(e) => { setLocationInput(e.target.value); setPage(1); }} />
            </div>
          </div>

          {/* CONDIÇÃO - radio buttons um em baixo do outro, sem "Ambos" */}
          <div className="bk-filter-block">
            <div className="bk-filter-label2">CONDIÇÃO</div>
            <label className="bk-radio">
              <input
                type="radio"
                name="condition"
                checked={condNovo && !condUsado}
                onChange={() => { setCondNovo(true); setCondUsado(false); setTagUsado(true); setPage(1); }}
              />
              Novo
            </label>
            <label className="bk-radio">
              <input
                type="radio"
                name="condition"
                checked={!condNovo && condUsado}
                onChange={() => { setCondNovo(false); setCondUsado(true); setTagUsado(true); setPage(1); }}
              />
              Usado
            </label>
          </div>

          <div className="bk-pro-box">
            <div>
              <span className="bk-pro-pill">PRO</span>
              <div className="bk-pro-text">Intermediários Disponíveis</div>
            </div>
            <div className={`bk-toggle${proToggle ? " bk-toggle--on" : ""}`}
              onClick={() => { setProToggle((v) => !v); setTagPro(true); setPage(1); }} />
          </div>

          <div className="bk-filter-block">
            <div className="bk-filter-label2">VENDEDOR</div>
            <label className="bk-check">
              <input type="checkbox" checked={minRating === 4}
                onChange={() => { setMinRating(minRating === 4 ? 0 : 4); setPage(1); }} />
              <span className="bk-stars">★★★★★</span> & up
            </label>
          </div>
        </aside>

        {/* PRODUCTS */}
        <div className="bk-products">
          {pageItems.length === 0 ? (
            <div className="bk-empty">
              <IconSearch />
              <p>Nenhum produto encontrado.</p>
              <button className="bk-btn-buy" style={{ marginTop: 16, width: 'auto', padding: '0 20px' }} onClick={clearFilters}>Limpar Filtros</button>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "bk-grid" : "bk-list-view"}>
              {pageItems.map((p) => (
                <ProductCard key={p.id} product={p}
                  isFav={favs.has(p.id)} onFav={toggleFav}
                  onClick={setSelected} viewMode={viewMode} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="bk-pagination">
              <button className="bk-page-btn bk-page-arrow" disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}>‹</button>
              {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((n) => (
                <button key={n} className={`bk-page-btn${page === n ? " active" : ""}`}
                  onClick={() => setPage(n)}>{n}</button>
              ))}
              {totalPages > 4 && <span className="bk-page-dots">...</span>}
              {totalPages > 3 && (
                <button className={`bk-page-btn${page === totalPages ? " active" : ""}`}
                  onClick={() => setPage(totalPages)}>{totalPages}</button>
              )}
              <button className="bk-page-btn bk-page-arrow" disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>›</button>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bk-footer">
        <div className="bk-footer__grid">
          <div>
            <div className="bk-footer__logo">BLINK</div>
            <p className="bk-footer__desc">A plataforma de intermediação segura para seus negócios de alto valor em Moçambique.</p>
            <div className="bk-footer__icons">
              <IconGlobe />
              <IconTwitter />
              <IconMessage />
            </div>
          </div>
          <div>
            <div className="bk-footer__col-title">BLINK</div>
            <a href="#" className="bk-footer__link">Sobre</a>
            <a href="#" className="bk-footer__link">Como Funciona</a>
            <a href="#" className="bk-footer__link">Taxas e Comissões</a>
          </div>
          <div>
            <div className="bk-footer__col-title">AJUDA</div>
            <a href="#" className="bk-footer__link">Termos</a>
            <a href="#" className="bk-footer__link">Privacidade</a>
            <a href="#" className="bk-footer__link">FAQ</a>
            <a href="#" className="bk-footer__link">Contato</a>
          </div>
          <div>
            <div className="bk-footer__col-title">NEWSLETTER</div>
            <p className="bk-footer__desc">Receba as melhores ofertas em seu email.</p>
            <div className="bk-newsletter">
              <input type="email" placeholder="Email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNewsletter()} />
              <button onClick={handleNewsletter}>➤</button>
            </div>
          </div>
        </div>
        <div className="bk-footer__bottom">© 2026 BLINK Moçambique. Todos os direitos reservados.</div>
      </footer>
    </div>
  );
}