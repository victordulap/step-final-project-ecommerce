import React from 'react';
import './style.scss';

const Checkout = () => {
  const paymentFormFields = [
    {
      label: 'card number',
      key: 'cardNumber',
      component: <input type="text" name="cardNumber" />,
    },
    {
      label: 'expiry date',
      key: 'expiryMonth',
      component: (
        <div className="split-inputs">
          <input type="number" name="expiryMonth" placeholder="Month" />
          <input type="number" name="expiryYear" placeholder="Year" />
        </div>
      ),
    },
    {
      label: 'name on card',
      key: 'nameOnCard',
      component: <input type="text" name="nameOnCard" />,
    },
    {
      label: 'cvv',
      key: 'cvv',
      component: <input type="number" name="cvv" />,
    },
  ];
  const shippingFormFields = [
    {
      label: 'first name',
      key: 'firstName',
      component: <input type="text" name="firstName" />,
    },
    {
      label: 'last name',
      key: 'lastName',
      component: <input type="text" name="lastName" />,
    },
    {
      label: 'mobile',
      key: 'mobile',
      component: <input type="tel" name="mobile" />,
    },
    {
      label: 'country',
      key: 'country',
      component: <input type="text" name="country" />,
    },
    {
      label: 'city',
      key: 'city',
      component: <input type="text" name="city" />,
    },
    {
      label: 'address',
      key: 'address',
      component: <input type="text" name="address" />,
    },
    {
      label: 'postcode',
      key: 'postcode',
      component: <input type="text" name="postcode" />,
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
          <h2 className="form-title  letter-spacing">shipping details</h2>
          <form>
            {shippingFormFields.map((field) => (
              <div className="form-item" key={`form-item-ship-${field.key}`}>
                <label htmlFor={field.key}>{field.label} :</label>
                {field.component}
              </div>
            ))}
          </form>
        </section>
        <section className="form-section payment-details">
          <h2 className="form-title letter-spacing">payment details</h2>
          <form>
            {paymentFormFields.map((field) => (
              <div className="form-item" key={`form-item-pay-${field.key}`}>
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
