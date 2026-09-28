import React from 'react'

export default function Navbar({
  search,
  setSearch,
  isScanning,
  startVoiceSearch,
  handleParchiScan,
  cartCount,
  onOpenCart,
}) {
  return (
    <nav>
      <div className="brand-logo-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <img src="/logo.svg" alt="Vikash Mart Logo" style={{ width: '38px', height: '38px', borderRadius: '8px' }} />
  <span className="brand-title" style={{ fontSize: '20px', fontWeight: 'bold', color: '#8f0837' }}>
    Vikash <span style={{ color: '#f59e0b' }}>Mart</span>
  </span>
</div>

      <p className="location-badge">📍 Nonaur, Bihar</p>

      <div className="search-wrapper">
        <input
          type="text"
          placeholder={
            isScanning
              ? 'Parchi scan ho rahi hai...'
              : '🔍 Search for products...'
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={isScanning}
        />

        <div className="search-actions">
          <button
            type="button"
            className="action-btn"
            onClick={startVoiceSearch}
            title="Bol kar search karein"
          >
            🎙️
          </button>

          <label className="action-btn" title="Parchi ki photo upload karein">
            📷
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleParchiScan}
            />
          </label>
        </div>
      </div>

      <div className="cart" onClick={onOpenCart} style={{ cursor: 'pointer' }}>
        🛒 Cart: {cartCount}
      </div>
    </nav>
  )
}