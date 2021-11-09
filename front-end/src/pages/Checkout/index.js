import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCartFromLocalStorage } from '../../features/cartSlice';
import CartEmpty from '../../components/CartEmpty';
import { DELIEVERY_PRICE, REDUX_STATUS } from '../../utils/constants';
import { createOrder } from '../../features/checkoutSlice';
import Button from '../../components/Button';

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);
  const cartTotal = useSelector((state) => state.cart.cartTotal);
  const checkoutStatus = useSelector((state) => state.checkout.status);

  useEffect(() => {
    dispatch(getCartFromLocalStorage());
  }, [dispatch]);

  const [isPaymentFormHidden, setIsPaymentFormHidden] = useState(false);
  const [isShippingFormHidden, setIsShippingFormHidden] = useState(false);
  const form = useRef('form');

  const [formErrors, setFormErrors] = useState({});

  const fieldKeys = {
    cardNumber: 'cardNumber',
    expiryMonth: 'expiryMonth',
    expiryYear: 'expiryYear',
    nameOnCard: 'nameOnCard',
    cvv: 'cvv',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    mobile: 'mobile',
    country: 'country',
    city: 'city',
    address: 'address',
    postcode: 'postcode',
  };

  const paymentFormFields = [
    {
      label: 'card number',
      key: fieldKeys.cardNumber,
      component: (
        <>
          {formErrors[fieldKeys.cardNumber] && (
            <p className="input-error">{formErrors[fieldKeys.cardNumber]}</p>
          )}
          <input
            className={formErrors[fieldKeys.cardNumber] ? 'error-border' : ''}
            defaultValue={'4012 8888 8888 1881'}
            placeholder="4012 8888 8888 1881"
            type="text"
            name={fieldKeys.cardNumber}
          />
        </>
      ),
    },
    {
      label: 'expiry date',
      key: 'expiryDate',
      component: (
        <>
          {(formErrors[fieldKeys.expiryMonth] ||
            formErrors[fieldKeys.expiryYear]) && (
            <p className="input-error">
              {formErrors[fieldKeys.expiryMonth] ||
                formErrors[fieldKeys.expiryYear]}
            </p>
          )}
          <div className="split-inputs">
            <input
              className={
                formErrors[fieldKeys.expiryMonth] ? 'error-border' : ''
              }
              defaultValue={12}
              type="number"
              name={fieldKeys.expiryMonth}
              placeholder="Month"
              min={1}
              max={12}
            />
            <input
              className={formErrors[fieldKeys.expiryYear] ? 'error-border' : ''}
              defaultValue={new Date().getFullYear() + 2}
              type="number"
              name={fieldKeys.expiryYear}
              placeholder="Year"
              min={new Date().getFullYear()}
              max={new Date().getFullYear() + 10}
            />
          </div>
        </>
      ),
    },
    {
      label: 'name on card',
      key: fieldKeys.nameOnCard,
      component: (
        <>
          {formErrors[fieldKeys.nameOnCard] && (
            <p className="input-error">{formErrors[fieldKeys.nameOnCard]}</p>
          )}
          <input
            defaultValue={'John Doge'}
            className={formErrors[fieldKeys.nameOnCard] ? 'error-border' : ''}
            type="text"
            name={fieldKeys.nameOnCard}
          />
        </>
      ),
    },
    {
      label: 'cvv',
      key: fieldKeys.cvv,
      component: (
        <>
          {formErrors[fieldKeys.cvv] && (
            <p className="input-error">{formErrors[fieldKeys.cvv]}</p>
          )}
          <input
            className={formErrors[fieldKeys.cvv] ? 'error-border' : ''}
            defaultValue={123}
            type="password"
            name={fieldKeys.cvv}
            maxLength={3}
            minLength={3}
          />
        </>
      ),
    },
  ];
  const shippingFormFields = [
    {
      label: 'email',
      key: fieldKeys.email,
      component: (
        <>
          {formErrors[fieldKeys.email] && (
            <p className="input-error">{formErrors[fieldKeys.email]}</p>
          )}
          <input
            className={formErrors[fieldKeys.email] ? 'error-border' : ''}
            defaultValue={'test.email@gmail.com'}
            type="email"
            name={fieldKeys.email}
          />
        </>
      ),
    },
    {
      label: 'first name',
      key: fieldKeys.firstName,
      component: (
        <>
          {formErrors[fieldKeys.firstName] && (
            <p className="input-error">{formErrors[fieldKeys.firstName]}</p>
          )}
          <input
            className={formErrors[fieldKeys.firstName] ? 'error-border' : ''}
            defaultValue={'John'}
            type="text"
            name={fieldKeys.firstName}
          />
        </>
      ),
    },
    {
      label: 'last name',
      key: fieldKeys.lastName,
      component: (
        <>
          {formErrors[fieldKeys.lastName] && (
            <p className="input-error">{formErrors[fieldKeys.lastName]}</p>
          )}

          <input
            defaultValue={'Doge'}
            type="text"
            name={fieldKeys.lastName}
            className={formErrors[fieldKeys.lastName] ? 'error-border' : ''}
          />
        </>
      ),
    },
    {
      label: 'mobile',
      key: fieldKeys.mobile,
      component: (
        <>
          {formErrors[fieldKeys.mobile] && (
            <p className="input-error">{formErrors[fieldKeys.mobile]}</p>
          )}

          <input
            defaultValue={'+373 781 201 29'}
            type="tel"
            name={fieldKeys.mobile}
            placeholder="+373 781 201 29"
            className={formErrors[fieldKeys.mobile] ? 'error-border' : ''}
          />
        </>
      ),
    },
    {
      label: 'country',
      key: fieldKeys.country,
      component: (
        <>
          {formErrors[fieldKeys.country] && (
            <p className="input-error">{formErrors[fieldKeys.country]}</p>
          )}

          <input
            className={formErrors[fieldKeys.country] ? 'error-border' : ''}
            defaultValue={'Moldova'}
            type="text"
            name={fieldKeys.country}
          />
        </>
      ),
    },
    {
      label: 'city',
      key: fieldKeys.city,
      component: (
        <>
          {formErrors[fieldKeys.city] && (
            <p className="input-error">{formErrors[fieldKeys.city]}</p>
          )}
          <input
            className={formErrors[fieldKeys.city] ? 'error-border' : ''}
            defaultValue={'Chisinau'}
            type="text"
            name={fieldKeys.city}
          />
        </>
      ),
    },
    {
      label: 'address',
      key: fieldKeys.address,
      component: (
        <>
          {formErrors[fieldKeys.address] && (
            <p className="input-error">{formErrors[fieldKeys.address]}</p>
          )}
          <input
            className={formErrors[fieldKeys.address] ? 'error-border' : ''}
            defaultValue={'Bd. Stefan cel Mare 1'}
            type="text"
            name={fieldKeys.address}
          />
        </>
      ),
    },
    {
      label: 'postcode',
      key: fieldKeys.postcode,
      component: (
        <>
          {formErrors[fieldKeys.postcode] && (
            <p className="input-error">{formErrors[fieldKeys.postcode]}</p>
          )}
          <input
            className={formErrors[fieldKeys.postcode] ? 'error-border' : ''}
            defaultValue={'MD-1337'}
            type="text"
            name={fieldKeys.postcode}
          />
        </>
      ),
    },
  ];

  const getFormValues = (form) => {
    const formValues = {};
    for (const [key] of Object.entries(fieldKeys)) {
      formValues[key] = form[key].value;
    }
    return formValues;
  };

  const validateForm = (form) => {
    let formCompletedSuccessfully = true;

    for (const [key] of Object.entries(fieldKeys)) {
      if (form[key] && form[key].value && form[key].value !== '') {
        if (key === fieldKeys.cardNumber) {
          if (formCompletedSuccessfully) {
            const cardValid = validator.isCreditCard(form[key].value);
            if (!cardValid) {
              setFormErrors((old) => ({ ...old, [key]: 'card is invalid' }));
              formCompletedSuccessfully = false;
            }
          }
        } else if (key === fieldKeys.email) {
          if (formCompletedSuccessfully) {
            const emailValid = validator.isEmail(form[key].value);
            if (!emailValid) {
              setFormErrors((old) => ({ ...old, [key]: 'email is invalid' }));
              formCompletedSuccessfully = false;
            }
          }
        }
      } else {
        setFormErrors((old) => ({ ...old, [key]: 'field is required' }));
        if (formCompletedSuccessfully) formCompletedSuccessfully = false;
      }
    }

    return formCompletedSuccessfully;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors({});
    const formCompletedSuccessfully = validateForm(e.target);

    // get form field values
    if (formCompletedSuccessfully) {
      const formValues = getFormValues(e.target);
      const shippingDetails = {
        firstName: formValues[fieldKeys.firstName],
        lastName: formValues[fieldKeys.lastName],
        email: formValues[fieldKeys.email],
        mobile: formValues[fieldKeys.mobile],
        country: formValues[fieldKeys.country],
        city: formValues[fieldKeys.city],
        address: formValues[fieldKeys.address],
        postcode: formValues[fieldKeys.postcode],
      };
      const cartInfo = cart.map((cartItem) => ({
        itemId: cartItem.item._id,
        selectedSize: cartItem.selectedSize,
        count: cartItem.count,
      }));
      const total = cartTotal;
      const paymentStatusSuccess = true;

      // make post api request
      dispatch(
        createOrder({
          shippingDetails,
          cart: cartInfo,
          total,
          paymentStatusSuccess,
        })
      );
    }

    console.log('formCompletedSuccessfully: ', formCompletedSuccessfully);
  };

  useEffect(() => {
    if (checkoutStatus === REDUX_STATUS.SUCCESS) {
      dispatch(clearCart());
    }
  }, [checkoutStatus, dispatch]);

  if (checkoutStatus === REDUX_STATUS.SUCCESS) {
    return (
      <main className="checkout">
        <div className="container">
          <section className="header">
            <h1 className="letter-spacing">thanks for ordering</h1>
          </section>
          <section style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.4em', paddingBottom: '1em' }}>
              We've sent you a email with your order!
            </p>
            <Button linkTo={'/'} size="l" text="MORE ITEMS" />
          </section>
        </div>
      </main>
    );
  }

  if (checkoutStatus === REDUX_STATUS.ERROR) {
    return (
      <main className="checkout">
        <div className="container">
          <section className="header">
            <h1 className="letter-spacing">oops!</h1>
          </section>
          <section className="checkout-error">
            <p className="letter-spacing">
              something strange occured, try again later
            </p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout">
      <div className="container">
        <section className="header">
          <h1 className="letter-spacing">checkout</h1>
        </section>
        {cart.length > 0 ? (
          <>
            <section className="total">
              <p>items: {cart.length}</p>
              <p>total: {(cartTotal + DELIEVERY_PRICE).toFixed(2)}$</p>
            </section>
            <form ref={form} onSubmit={handleSubmit}>
              <section className="form-section shipping-address">
                <header>
                  <h2 className="form-title letter-spacing">
                    shipping details
                  </h2>
                  {isShippingFormHidden ? (
                    <FaChevronDown
                      className="toggle-form"
                      onClick={() => setIsShippingFormHidden(false)}
                    />
                  ) : (
                    <FaChevronUp
                      className="toggle-form"
                      onClick={() => setIsShippingFormHidden(true)}
                    />
                  )}
                </header>
                {shippingFormFields.map((field) => (
                  <div
                    style={isShippingFormHidden ? { display: 'none' } : {}}
                    className="form-item"
                    key={`form-item-ship-${field.key}`}
                  >
                    <label htmlFor={field.key}>{field.label} :</label>
                    {field.component}
                  </div>
                ))}
              </section>
              <section className="form-section payment-details">
                <header>
                  <h2 className="form-title letter-spacing">payment details</h2>
                  {isPaymentFormHidden ? (
                    <FaChevronDown
                      className="toggle-form"
                      onClick={() => setIsPaymentFormHidden(false)}
                    />
                  ) : (
                    <FaChevronUp
                      className="toggle-form"
                      onClick={() => setIsPaymentFormHidden(true)}
                    />
                  )}
                </header>
                {paymentFormFields.map((field) => (
                  <div
                    style={isPaymentFormHidden ? { display: 'none' } : {}}
                    className="form-item"
                    key={`form-item-pay-${field.key}`}
                  >
                    <label className="letter-spacing" htmlFor={field.key}>
                      {field.label} :
                    </label>
                    {field.component}
                  </div>
                ))}
              </section>
              <section className="submit-form">
                <Button
                  loading={checkoutStatus === REDUX_STATUS.LOADING}
                  text="PLACE ORDER"
                  onSubmit={handleSubmit}
                  type="submit"
                />
              </section>
            </form>
          </>
        ) : (
          <section>
            <CartEmpty />
          </section>
        )}
      </div>
    </main>
  );
};

export default Checkout;
