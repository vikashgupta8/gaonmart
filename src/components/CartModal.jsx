import React from 'react'

export default function CartModal({
  isOpen,
  onClose,
  cart,
  setCart,
  userName,
  setUserName,
  userPhone,
  setUserPhone,
  userAddress,
  setUserAddress,
  paymentMethod,
  setPaymentMethod,
  onCheckout
}) {
  if (!isOpen) return null

  // 1. Cart ka kul jod (Total) yahan calculate hota hai
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  
  // 2. Delivery Charge rule (₹300 se upar Free, warna ₹20)
  const deliveryFee = cartTotal >= 300 ? 0 : 20
  const grandTotal = cartTotal + deliveryFee

  // Quantity badhane ka function
  const updateQty = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta
            return newQty > 0 ? { ...item, qty: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const [locLoading, setLocLoading] = useState(false)

const handleGetLocation = () => {
  if (!navigator.geolocation) {
    alert('Aapke browser mein GPS support nahi hai!')
    return
  }

  setLocLoading(true)

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords
      const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`
      setUserAddress((prev) => (prev ? `${prev}\n📍 Map: ${mapsUrl}` : `📍 Map: ${mapsUrl}`))
      setLocLoading(false)
    },
    (err) => {
      setLocLoading(false)
      if (err.code === 1) {
        alert('Location permission block hai. Chrome settings mein jaakar location allow karein.')
      } else {
        alert('Location prapt nahi ho saki. Kripya phone ka GPS on rakhein.')
      }
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  )
}

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '480px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '20px',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', color: '#111' }}>🛒 Aapka Cart</h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#666' }}
          >
            ✕
          </button>
        </div>

        {/* Cart Item List */}
        {cart.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '20px 0' }}>Aapka cart khali hai!</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: '1px solid #f0f0f0'
                }}
              >
                <div>
                  <div style={{ fontWeight: '600' }}>{item.name}</div>
                  <div style={{ fontSize: '13px', color: '#666' }}>
                    ₹{item.price} / {item.unit || 'unit'}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #ccc', background: '#f9f9f9', cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #ccc', background: '#f9f9f9', cursor: 'pointer' }}
                  >
                    +
                  </button>
                  <span style={{ minWidth: '55px', textAlign: 'right', fontWeight: 'bold' }}>
                    ₹{item.price * item.qty}
                  </span>
                </div>
              </div>
            ))}

            {/* Bill Summary */}
            <div style={{ padding: '12px 0', borderTop: '1px dashed #ccc', marginTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Samaan Ka Total:</span>
                <strong>₹{cartTotal}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: deliveryFee === 0 ? '#0b8f08' : '#e65100' }}>
                <span>Delivery Charge:</span>
                <strong>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</strong>
              </div>
              {cartTotal < 300 && (
                <p style={{ fontSize: '11px', color: '#666', margin: '4px 0 0' }}>
                  💡 ₹{300 - cartTotal} ka samaan aur jodein aur payein <strong>FREE Delivery</strong>!
                </p>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', marginTop: '8px', borderTop: '1px solid #eee', paddingTop: '8px' }}>
                <strong>Kul Rakam (Total):</strong>
                <strong style={{ color: '#0b8f08' }}>₹{grandTotal}</strong>
              </div>
            </div>

            {/* Customer Information Form */}
            <div style={{ marginTop: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Aapka Naam:</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Jaise: Vikash Kumar"
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '10px', boxSizing: 'border-box' }}
              />

              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Mobile Number:</label>
              <input
                type="tel"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                placeholder="10 digit mobile number"
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '10px', boxSizing: 'border-box' }}
              />

              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Ghar / Gaon ka Pata:</label>
              <textarea
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                placeholder="Ghar no., Ward no., ya Landmark"
                rows="2"
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '10px', boxSizing: 'border-box' }}
              />

              {/* 📍 GPS Location Auto-detect Button */}
<button
  type="button"
  onClick={() => {
    if (!navigator.geolocation) {
      alert('Aapke browser mein GPS support nahi hai!')
      return
    }
    
    // Button par loading text dikhane ke liye
    const btn = document.getElementById('gps-loc-btn')
    if (btn) btn.innerText = '⏳ Location li ja rahi hai...'

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        const mapsLink = `https://maps.google.com/?q=${lat},${lng}`
        
        // Pata ke sath Maps link jod do
        setUserAddress((prev) => prev ? `${prev}\n📍 Map: ${mapsLink}` : `📍 Map: ${mapsLink}`)
        if (btn) btn.innerText = '✅ Location Jud Gayi!'
      },
      (error) => {
        alert('GPS location lene ki anumati (permission) nahi mili. Kripya phone mein location on karein.')
        if (btn) btn.innerText = '📍 Meri Current Location Lein'
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }}
  id="gps-loc-btn"
  style={{
    background: '#e0f2fe',
    color: '#0284c7',
    border: '1px solid #bae6fd',
    padding: '7px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '12px'
  }}
>
  📍 Meri Current Location Lein (Google Maps)
</button>

<button
  type="button"
  onClick={handleGetLocation}
  disabled={locLoading}
  style={{
    background: '#e0f2fe',
    color: '#0369a1',
    border: '1px solid #bae6fd',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: locLoading ? 'not-allowed' : 'pointer',
    width: '100%',
    marginBottom: '12px'
  }}
>
  {locLoading ? '⏳ Location li ja rahi hai...' : '📍 Meri Current Location Lein (Google Maps)'}
</button>
            </div>

            {/* Payment Method Selection */}
            <div style={{ margin: '14px 0', borderTop: '1px solid #eee', paddingTop: '12px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                💳 Payment ka Tareeqa:
              </label>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="paymentMode"
                    value="Cash on Delivery"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={() => setPaymentMethod('Cash on Delivery')}
                  />
                  💵 Cash on Delivery
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="paymentMode"
                    value="Online UPI"
                    checked={paymentMethod === 'Online UPI'}
                    onChange={() => setPaymentMethod('Online UPI')}
                  />
                  📱 UPI / QR Code
                </label>
              </div>

              {/* Dynamic QR Code */}
            {paymentMethod === 'Online UPI' && (
  <div style={{
    background: '#f8fafc',
    border: '2px dashed #16a34a',
    padding: '14px',
    borderRadius: '10px',
    textAlign: 'center',
    marginTop: '10px'
  }}>
    <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#15803d', fontWeight: 'bold' }}>
      Scan karke ₹{grandTotal} Pay Karein:
    </p>

    <div style={{ display: 'inline-block', background: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <QRCodeSVG
        value={`upi://pay?pa=9876543210@ybl&pn=VikashMart&am=${grandTotal}&cu=INR`}
        size={170}
        level="M"
      />
    </div>

    <p style={{ margin: '8px 0 2px', fontSize: '13px', color: '#333' }}>
      UPI ID: <strong>9876543210@ybl</strong>
    </p>
    <span style={{ fontSize: '11px', color: '#dc2626', fontWeight: 'bold', display: 'block' }}>
      *Payment ke baad WhatsApp par screenshot zaroor bhejein!
    </span>
  </div>
)}
            </div>

            {/* Checkout Button */}
            <button
              onClick={onCheckout}
              style={{
                width: '100%',
                background: '#0b8f08',
                color: '#fff',
                border: 'none',
                padding: '14px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              WhatsApp Par Order Bhejein (₹{grandTotal})
            </button>
          </div>
        )}
      </div>
    </div>
  )
}