import './style.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function HomePage() {
  const brands = useSelector((state) => state.brands.value);

  return (
    <div className="container">
      {brands.map((brand) => (
        <p key={brand.id}>
          {brand.name}, id: {brand.id}
        </p>
      ))}
    </div>
  );
}
