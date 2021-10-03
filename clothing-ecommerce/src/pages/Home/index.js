import './style.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';

export function HomePage() {
  const brands = useSelector((state) => state.brands.value);
  const categories = useSelector((state) => state.categories.value);

  console.log(categories);

  return (
    <main>
      <div className="container">
        <section className="hero">
          <h1>Welcome&nbsp;to VD&nbsp;Clothes</h1>
          <Button text="SHOP" size="l" dark={true} linkTo="#categories" />
        </section>
      </div>
      <div className="container container-dark">
        <section className="categories" id="categories">
          <h2>Categories</h2>
          <div className="categories-cards">
            {categories.map((category) => (
              <div className="category-card" key={category.id}>
                <main className="category-image-container">
                  <img src={category.imageUrl} alt={category.name} />
                </main>
                <footer className="category-text">{category.name}</footer>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
