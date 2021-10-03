import './style.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';

export function HomePage() {
  const brands = useSelector((state) => state.brands.value);

  return (
    <main>
      <div className="container">
        <div className="hero">
          <h1>Welcome to VD&nbsp;Clothes</h1>
          <Button text="SHOP" size="l" dark={true} />
        </div>
      </div>
    </main>
  );
}
