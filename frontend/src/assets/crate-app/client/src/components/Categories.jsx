export default function Categories({ categories, onSelect }) {
  return (
    <section className="cat-section" id="categories">
      <div className="cat-inner">
        <div className="cat-grid">
          {categories.map((cat) => (
            <button key={cat.id} className="cat-stamp" onClick={() => onSelect(cat.id)}>
              <span className="ico">{cat.icon}</span>
              <span className="lbl">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
