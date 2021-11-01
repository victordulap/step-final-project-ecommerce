import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import SimpleCardsContainer from '../../components/SimpleCardsContainer';
import { useEffect } from 'react';
import { getAllBrands } from '../../features/brandsSlice';
import { getAllCategories } from '../../features/categoriesSlice';

export function HomePage() {
  const isLoadingBrands = useSelector((state) => state.brands.isloading);
  const brands = useSelector((state) => state.brands.value);
  const isLoadingCategories = useSelector(
    (state) => state.categories.isLoading
  );
  const categories = useSelector((state) => state.categories.value);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <main>
      <div className="container">
        <section className="hero">
          <h1>Welcome&nbsp;to VD&nbsp;Clothes</h1>
          <Button text="SHOP" size="l" dark={true} linkTo="#Categories" />
        </section>
      </div>
      <div className="categories-wrapper">
        <div className="container container-dark">
          {isLoadingCategories && categories ? (
            'loading'
          ) : (
            <SimpleCardsContainer
              cardsData={categories}
              title="Categories"
              darkCards
            />
          )}
        </div>
      </div>

      <div className="container">
        {isLoadingBrands && brands ? (
          'loading'
        ) : (
          <SimpleCardsContainer cardsData={brands} title="Brands" />
        )}
      </div>
    </main>
  );
}
