import React from 'react'

export default function CartModal({
  cart,
  onClose,
  onUpdateQty,
  cartTotal,
  minOrder,
  userName,
  setUserName,
  userPhone,
  setUserPhone,
  userAddress,
  setUserAddress,
  paymentMethod,
  setPaymentMethod,
  onCheckout,
}) {
  return (
    <div className="cart-overlay" onClick={onClose}>
      {/* stopPropagation isliye taaki dabba ke andar click karne par modal band na ho */}
      <div className="cart-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>🛒 Aapka Cart</h2>
          <button className="cart-close-btn" onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart-msg">
            <p>Cart khali hai!</p>
            <button className="btn-shop-more" onClick={onClose}>Samaan Chunein</button>
          </div>
        ) : (
          <div className="cart-body-scroll">
            <div className="cart-items-wrapper">
              {cart.map((item) => (
                <div className="cart-item-row" key={item.id}>
                  <div className="cart-item-details">
                    <strong>{item.name}</strong>
                    <p>₹{item.price} × {item.qty} = ₹{item.price * item.qty}</p>
                  </div>
                  <div className="qty-box">
                    <button onClick={() => onUpdateQty(item.id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total-box">
              <strong>Total Bill: ₹{cartTotal}</strong>
            </div>

{/* Subtotal aur Delivery status */}
<div style={{ padding: '12px 0', borderTop: '1px dashed #ccc', marginTop: '10px' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
    <span>Samaan Ka Total:</span>
    <strong>₹{cartTotal}</strong>
  </div>
  <div style={{ display: 'flex', justifyContent: 'space-between', color: cartTotal >= 300 ? '#0b8f08' : '#e65100' }}>
    <span>Delivery Fee:</span>
    <strong>{cartTotal >= 300 ? 'FREE' : '₹20'}</strong>
  </div>
  {cartTotal < 300 && (
    <p style={{ fontSize: '11px', color: '#666', margin: '4px 0 0' }}>
      💡 ₹{300 - cartTotal} ka samaan aur jodein aur payein <strong>FREE Delivery</strong>!
    </p>
  )}
  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', marginTop: '8px', borderTop: '1px solid #eee', paddingTop: '8px' }}>
    <strong>Kul Rakam (Total):</strong>
    <strong style={{ color: '#0b8f08' }}>₹{cartTotal + (cartTotal >= 300 ? 0 : 20)}</strong>
  </div>
</div>

            {cartTotal < minOrder && (
              <p className="min-order-alert">
                Kam se kam ₹{minOrder} ka order hona chahiye! (Abhi ₹{minOrder - cartTotal} baaki)
              </p>
            )}

            <div className="customer-inputs">
              <input
                type="text"
                placeholder="Aapka Naam *"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Mobile Number *"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
              />
              <input
                type="text"
                placeholder="Gaon / Ward / Pata *"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
              />
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Cash on Delivery">💵 Cash on Delivery (COD)</option>
                <option value="UPI / Online">📲 UPI / QR Code</option>
              </select>
            </div>

            <button
              className="checkout-btn"
              disabled={cartTotal < minOrder}
              onClick={onCheckout}
            >
              WhatsApp Par Order Karein
            </button>
          </div>
        )}
      </div>
    </div>
  )
}