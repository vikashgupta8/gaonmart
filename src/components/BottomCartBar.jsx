import React from 'react'

export default function BottomCartBar({ cart, cartTotal, onOpenCart }) {
  if (!cart || cart.length === 0) return null

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div 
      className="bottom-cart-bar" 
      onClick={onOpenCart}
      style={{ cursor: 'pointer' }}
    >
      <div className="bottom-cart-info">
        <span className="bottom-cart-count">🛒 {totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
        <span className="bottom-cart-price">₹{cartTotal}</span>
      </div>
      <button 
        className="bottom-cart-btn" 
        type="button"
        onClick={(e) => {
          e.stopPropagation() // Bubble issue roko
          onOpenCart()
        }}
      >
        View Cart →
      </button>
    </div>
  )
}