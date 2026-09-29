import React, { useState } from 'react'

export default function AddProductModal({ isOpen, onClose, onAddProduct }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [unit, setUnit] = useState('1 kg')
  const [category, setCategory] = useState('Ration')
  const [image, setImage] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !price) {
      alert('Kripya samaan ka naam aur daam bharein!')
      return
    }

    const newProduct = {
      id: Date.now(), // Unique ID generate karega
      name: name.trim(),
      price: Number(price),
      unit: unit.trim() || '1 unit',
      category: category.trim() || 'General',
      image: image.trim() || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'
    }

    onAddProduct(newProduct)
    setName('')
    setPrice('')
    setImage('')
    onClose()
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
      zIndex: 1100,
      padding: '16px'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '420px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#166534' }}>➕ Naya Samaan Jodein</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#666' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Samaan Ka Naam:</label>
            <input
              type="text"
              placeholder="e.g. Fortune Besan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Keemat (₹):</label>
              <input
                type="number"
                placeholder="Daam"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Unit / Wazan:</label>
              <input
                type="text"
                placeholder="e.g. 500g, 1L"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            >
              <option value="Ration">Ration (Atta, Dal, Oil)</option>
              <option value="Snacks">Snacks & Chai</option>
              <option value="Masale">Masale</option>
              <option value="Cleaning">Cleaning & Soap</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Photo URL (Optional):</label>
            <input
              type="url"
              placeholder="Online image link"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <button
            type="submit"
            style={{
              background: '#16a34a',
              color: '#fff',
              border: 'none',
              padding: '10px',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '6px'
            }}
          >
            Samaan Save Karein
          </button>
        </form>
      </div>
    </div>
  )
}