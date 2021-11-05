import React, { useRef, useState } from 'react';
import './style.scss';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import validator from 'validator';

const Checkout = () => {
  const [isPaymentFormHidden, setIsPaymentFormHidden] = useState(false);
  const [isShippingFormHidden, setIsShippingFormHidden] = useState(false);
  const form = useRef('form');

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
        <input
          defaultValue={'4012 8888 8888 1881'}
          placeholder="4012 8888 8888 1881"
          type="text"
          name={fieldKeys.cardNumber}
        />
      ),
    },
    {
      label: 'expiry date',
      key: 'expiryDate',
      component: (
        <div className="split-inputs">
          <input
            defaultValue={12}
            type="number"
            name={fieldKeys.expiryMonth}
            placeholder="Month"
            min={1}
            max={12}
          />
          <input
            defaultValue={2025}
            type="number"
            name={fieldKeys.expiryYear}
            placeholder="Year"
            min={2000}
            max={2050}
          />
        </div>
      ),
    },
    {
      label: 'name on card',
      key: fieldKeys.nameOnCard,
      component: (
        <input defaultValue={123} type="text" name={fieldKeys.nameOnCard} />
      ),
    },
    {
      label: 'cvv',
      key: fieldKeys.cvv,
      component: (
        <input defaultValue={123} type="number" name={fieldKeys.cvv} />
      ),
    },
  ];
  const shippingFormFields = [
    {
      label: 'email',
      key: fieldKeys.email,
      component: (
        <input
          defaultValue={'email@gmail.com'}
          type="email"
          name={fieldKeys.email}
        />
      ),
    },
    {
      label: 'first name',
      key: fieldKeys.firstName,
      component: (
        <input defaultValue={123} type="text" name={fieldKeys.firstName} />
      ),
    },
    {
      label: 'last name',
      key: fieldKeys.lastName,
      component: (
        <input defaultValue={123} type="text" name={fieldKeys.lastName} />
      ),
    },
    {
      label: 'mobile',
      key: fieldKeys.mobile,
      component: (
        <input defaultValue={123} type="tel" name={fieldKeys.mobile} />
      ),
    },
    {
      label: 'country',
      key: fieldKeys.country,
      component: (
        <input defaultValue={123} type="text" name={fieldKeys.country} />
      ),
    },
    {
      label: 'city',
      key: fieldKeys.city,
      component: <input defaultValue={123} type="text" name={fieldKeys.city} />,
    },
    {
      label: 'address',
      key: fieldKeys.address,
      component: (
        <input defaultValue={123} type="text" name={fieldKeys.address} />
      ),
    },
    {
      label: 'postcode',
      key: fieldKeys.postcode,
      component: (
        <input defaultValue={123} type="text" name={fieldKeys.postcode} />
      ),
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    e = e.target;
    let formCompletedSuccessfully = true;

    for (const [key, value] of Object.entries(fieldKeys)) {
      if (e[key] && e[key].value) {
        console.log(`${key}: ${e[key].value}`);

        if (key === fieldKeys.cardNumber) {
          formCompletedSuccessfully = validator.isCreditCard(e[key].value);
          if (!formCompletedSuccessfully) break;
        } else if (key === fieldKeys.email) {
          formCompletedSuccessfully = validator.isEmail(e[key].value);
          if (!formCompletedSuccessfully) break;
        }
      } else {
        formCompletedSuccessfully = false;
        break;
      }
    }

    console.log('formCompletedSuccessfully: ', formCompletedSuccessfully);
  };

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
        <form ref={form} onSubmit={handleSubmit}>
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
            <button onSubmit={handleSubmit} type="submit">
              PLACE ORDER
            </button>
          </section>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
