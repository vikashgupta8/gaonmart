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
      <div className="logo-container">
        <img src="/logo.svg" alt="Mart Logo" className="site-logo" />
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