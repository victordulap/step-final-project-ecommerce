import './style.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import SimpleCardsContainer from '../../components/SimpleCardsContainer';

export function HomePage() {
  const brands = useSelector((state) => state.brands.value);
  const categories = useSelector((state) => state.categories.value);

  console.log(categories);

  return (
    <main>
      <div className="container">
        <section className="hero">
          <h1>Welcome&nbsp;to VD&nbsp;Clothes</h1>
          <Button text="SHOP" size="l" dark={true} linkTo="#Categories" />
        </section>
      </div>
      <div className="container container-dark">
        <SimpleCardsContainer
          cardsData={categories}
          title="Categories"
          darkCards
        />
      </div>
      <div className="container">
        <SimpleCardsContainer cardsData={brands} title="Brands" />
      </div>
    </main>
  );
}
