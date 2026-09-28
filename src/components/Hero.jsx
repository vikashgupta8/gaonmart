import React from 'react'

export default function Hero({ onShopNow }) {
  return (
    <section className="hero">
      <div className="hero-text">
        <h2>Gaon ki har zarurat, ab ghar baithe!</h2>
        <p>Apne aas-paas ki dukaan se samaan mangayein, bina ghar se nikle.</p>
        <button onClick={onShopNow}>🛒 Shop Now</button>
      </div>
      <div className="hero-icon">🏡</div>
    </section>
  )
}