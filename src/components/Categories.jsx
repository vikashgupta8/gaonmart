import React from 'react'

export default function Categories({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <section className="categories">
      <h2>Shop by Category</h2>
      <div className="category-list">
        {/* All Products Card */}
        <div
          className={`category-card ${selectedCategory === 'All' ? 'active-cat' : ''}`}
          onClick={() => onSelectCategory('All')}
        >
          <span>🧺</span>
          <h3>All</h3>
        </div>

        {/* Dynamic Categories */}
        {categories.map((cat) => (
          <div
            className={`category-card ${selectedCategory === cat.name ? 'active-cat' : ''}`}
            key={cat.id}
            onClick={() =>
              onSelectCategory(selectedCategory === cat.name ? 'All' : cat.name)
            }
          >
            <span>{cat.icon}</span>
            <h3>{cat.name}</h3>
            {cat.desc && <p>{cat.desc}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}