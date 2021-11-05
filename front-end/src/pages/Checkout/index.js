import React, { useState } from 'react';
import './style.scss';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const Checkout = () => {
  const [isPaymentFormHidden, setIsPaymentFormHidden] = useState(false);
  const [isShippingFormHidden, setIsShippingFormHidden] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});

  const paymentFormFields = [
    {
      label: 'card number',
      key: 'cardNumber',
      component: (
        <input
          type="text"
          name="cardNumber"
          onChange={({ target }) =>
            setOrderDetails((old) => ({
              ...old,
              pay: { ...old.pay, cardNumber: target.value },
            }))
          }
        />
      ),
    },
    {
      label: 'expiry date',
      key: 'expiryMonth',
      component: (
        <div className="split-inputs">
          <input
            type="number"
            name="expiryMonth"
            placeholder="Month"
            onChange={({ target }) =>
              setOrderDetails((old) => ({
                ...old,
                pay: { ...old.pay, expiryMonth: target.value },
              }))
            }
          />
          <input
            type="number"
            name="expiryYear"
            placeholder="Year"
            onChange={({ target }) =>
              setOrderDetails((old) => ({
                ...old,
                pay: { ...old.pay, expiryYear: target.value },
              }))
            }
          />
        </div>
      ),
    },
    {
      label: 'name on card',
      key: 'nameOnCard',
      component: (
        <input
          type="text"
          name="nameOnCard"
          onChange={({ target }) =>
            setOrderDetails((old) => ({
              ...old,
              pay: { ...old.pay, nameOnCard: target.value },
            }))
          }
        />
      ),
    },
    {
      label: 'cvv',
      key: 'cvv',
      component: (
        <input
          type="number"
          name="cvv"
          onChange={({ target }) =>
            setOrderDetails((old) => ({
              ...old,
              pay: { ...old.pay, cvv: target.value },
            }))
          }
        />
      ),
    },
  ];
  const shippingFormFields = [
    {
      label: 'email',
      key: 'email',
      component: (
        <input
          type="email"
          name="email"
          onChange={({ target }) =>
            setOrderDetails((old) => ({
              ...old,
              ship: { ...old.ship, email: target.value },
            }))
          }
        />
      ),
    },
    {
      label: 'first name',
      key: 'firstName',
      component: (
        <input
          type="text"
          name="firstName"
          onChange={({ target }) =>
            setOrderDetails((old) => ({
              ...old,
              ship: { ...old.ship, firstName: target.value },
            }))
          }
        />
      ),
    },
    {
      label: 'last name',
      key: 'lastName',
      component: (
        <input
          type="text"
          name="lastName"
          onChange={({ target }) =>
            setOrderDetails((old) => ({
              ...old,
              ship: { ...old.ship, lastName: target.value },
            }))
          }
        />
      ),
    },
    {
      label: 'mobile',
      key: 'mobile',
      component: (
        <input
          type="tel"
          name="mobile"
          onChange={({ target }) =>
            setOrderDetails((old) => ({
              ...old,
              ship: { ...old.ship, mobile: target.value },
            }))
          }
        />
      ),
    },
    {
      label: 'country',
      key: 'country',
      component: (
        <input
          type="text"
          name="country"
          onChange={({ target }) =>
            setOrderDetails((old) => ({
              ...old,
              ship: { ...old.ship, country: target.value },
            }))
          }
        />
      ),
    },
    {
      label: 'city',
      key: 'city',
      component: (
        <input
          type="text"
          name="city"
          onChange={({ target }) =>
            setOrderDetails((old) => ({
              ...old,
              ship: { ...old.ship, city: target.value },
            }))
          }
        />
      ),
    },
    {
      label: 'address',
      key: 'address',
      component: (
        <input
          type="text"
          name="address"
          onChange={({ target }) =>
            setOrderDetails((old) => ({
              ...old,
              ship: { ...old.ship, address: target.value },
            }))
          }
        />
      ),
    },
    {
      label: 'postcode',
      key: 'postcode',
      component: (
        <input
          type="text"
          name="postcode"
          onChange={({ target }) =>
            setOrderDetails((old) => ({
              ...old,
              ship: { ...old.ship, postcode: target.value },
            }))
          }
        />
      ),
    },
  ];

  return (
    <main className="checkout">
      <div className="container">
        <section className="header">
          <h1 className="letter-spacing">checkout</h1>
        </section>
        <section className="total">
          <p>items: 10</p>
          <p>total: 150.00$</p>
        </section>
        <section className="form-section shipping-address">
          <header>
            <h2 className="form-title letter-spacing">shipping details</h2>
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
          <form>
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
          </form>
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
          <form>
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
          </form>
        </section>
      </div>
    </main>
  );
};

export default Checkout;
