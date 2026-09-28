import React from 'react'

export default function ProductList({ products, onAddToCart }) {
  return (
    <section className="products">
      <h2>Products ({products.length})</h2>
      <div className="product-list">
        {products.map((product) => {
          const isAvailable = product.inStock !== false

          return (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.img} alt={product.name} />
                {!isAvailable && (
                  <span className="out-of-stock-badge">Out of Stock</span>
                )}
              </div>

              <h3>{product.name}</h3>
              <p>
                ₹{product.price} / {product.unit}
              </p>

              <button
                disabled={!isAvailable}
                onClick={() => onAddToCart(product)}
                className={!isAvailable ? 'btn-disabled' : 'btn-add'}
              >
                {!isAvailable ? 'Khatam Hai' : 'Add to Cart +'}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}