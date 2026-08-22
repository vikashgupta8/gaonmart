import { useState } from 'react'
import './App.css'

function App() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  return (
    <>
      {/* Navbar */}
      <nav>
        <h1>GaonMart 🏡</h1>

        <p>📍 Agiaon, Bihar</p>

        <input
          type="text"
          placeholder="🔍 Search for products..."
        />

        <div
  className="cart"
  onClick={() => setShowCart(!showCart)}
>
  🛒 Cart: {cart.length}
</div>
      </nav>

     {showCart && (
  <div className="cart-box">
    <h2>🛒 My Cart</h2>

    {cart.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      cart.map((item, index) => (
        <p key={index}>✅ {item}</p>
      ))
    )}
  </div>
)}


      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h2>Gaon ki har zarurat, ab ghar baithe!</h2>

          <p>
            Apne aas-paas ki dukaan se samaan mangayein,
            bina ghar se nikle.
          </p>

          <button>🛒 Shop Now</button>
        </div>

        <div className="hero-icon">
          🏡
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Shop by Category</h2>

        <div className="category-list">

          <div className="category-card">
            <span>🥦</span>
            <h3>Grocery</h3>
            <p>Daily needs</p>
          </div>

          <div className="category-card">
            <span>🥛</span>
            <h3>Dairy</h3>
            <p>Milk & more</p>
          </div>

          <div className="category-card">
            <span>💊</span>
            <h3>Medicine</h3>
            <p>Health products</p>
          </div>

          <div className="category-card">
            <span>👕</span>
            <h3>Clothes</h3>
            <p>Fashion & wear</p>
          </div>

          <div className="category-card">
            <span>🔧</span>
            <h3>Hardware</h3>
            <p>Tools & items</p>
          </div>

          <div className="category-card">
            <span>📱</span>
            <h3>Electronics</h3>
            <p>Mobile & more</p>
          </div>

        </div>
      </section>

      {/* Popular Products */}
      <section className="products">
        <h2>Popular Products</h2>

        <div className="product-list">

          <div className="product-card">
            <div className="product-image">🥔</div>
            <h3>Fresh Potato</h3>
            <p>₹30 / kg</p>

            <button
              onClick={() => setCart([...cart, 'Fresh Potato'])}
            >
              Add to Cart
            </button>
            <p>Available for home delivery 🚚</p>
          </div>

          <div className="product-card">
            <div className="product-image">🍚</div>
            <h3>Rice</h3>
            <p>₹60 / kg</p>

            <button
              onClick={() => setCart([...cart, 'Rice'])}
            >
              Add to Cart
            </button>
          </div>

          <div className="product-card">
            <div className="product-image">🥛</div>
            <h3>Fresh Milk</h3>
            <p>₹60 / litre</p>

            <button
              onClick={() => setCart([...cart, 'Fresh Milk'])}
            >
              Add to Cart
            </button>
          </div>

          <div className="product-card">
            <div className="product-image">🫗</div>
            <h3>Cooking Oil</h3>
            <p>₹140 / litre</p>

            <button
              onClick={() => setCart([...cart, 'Cooking Oil'])}
            >
              Add to Cart
            </button>
          </div>

        </div>
      </section>
    </>
  )
}

export default App

