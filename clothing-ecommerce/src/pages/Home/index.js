import './style.scss';
import { Link } from 'react-router-dom';
import { brands } from '../../data/brands';

export function HomePage() {
  return (
    <div style={{ fontSize: 20 }}>
      {brands.map((brand) => (
        <p>
          {brand.name}, id: {brand.id}
        </p>
      ))}
    </div>
  );
}
