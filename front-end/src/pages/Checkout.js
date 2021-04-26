import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import CartItem from '../components/CartItem';
import MenuTop from '../components/MenuTop';
import context from '../context/Context';
import { createNewProduct, createNewSale } from '../services/salesServices';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [street, setStreet] = useState('');
  const [houseNR, setHouseNR] = useState(0);
  const [success, setSuccess] = useState(false);
  const { totalCart, setTotalCart } = useContext(context);

  const history = useHistory();

  const auxFunc = async () => {
    const storageUser = JSON.parse(localStorage.getItem('user'));
    console.log(storageUser);

    if (!storageUser) {
      history.push('/login');
    }
  };

  const handleDisabled = () => {
    if (street !== '' && houseNR !== 0 && totalCart !== 0) {
      return setDisabled(false);
    }
    setDisabled(true);
  };

  const getLocalStorage = () => {
    setCart(JSON.parse(localStorage.getItem('cart')));
    setTotalCart(JSON.parse(localStorage.getItem('totalCart')));
  };

  useEffect(() => {
    auxFunc();
    getLocalStorage();
  }, []);

  useEffect(() => {
    handleDisabled();
  }, [street, houseNR]);

  const handleDelay = () => {
    setSuccess(false);
    // history.push('/products');
  };

  const registerProducts = (saleId) => {
    cart.forEach((product) => {
      const newProduct = {
        saleId,
        productId: product.id,
        quantity: product.quantity,
      };
      createNewProduct(newProduct);
    });
  };

  const registerSale = async () => {
    const storageUser = JSON.parse(localStorage.getItem('user'));
    const sale = {
      userId: storageUser.id,
      totalPrice: totalCart,
      deliveryAddress: street,
      deliveryNumber: houseNR,
    };
    const saleId = await createNewSale(sale);
    await registerProducts(saleId);
  };

  const handleClick = () => {
    const twothousand = 2000;
    setSuccess(true);
    setTimeout(() => handleDelay(), twothousand);
    setTotalCart(0);
    localStorage.removeItem('cart');
    localStorage.removeItem('totalCart');
    registerSale();
  };
  const removetrue = true;

  return (
    <div>
      <MenuTop title="Finalizar Pedido" />
      <div className="checkout-container">
        <div>
          {!cart[0] ? <p>Não há produtos no carrinho</p> : cart.map((item, index) => (
            <CartItem
              key={ index }
              setCart={ setCart }
              index={ index }
              name={ item.name }
              quantity={ item.quantity }
              price={ item.price }
              unitPriceID="product-unit-price"
              qtdID="product-qtd-input"
              removeButton={ removetrue }
            />))}
        </div>
        <p
          className="total-checkout"
          data-testid="order-total-value"
        >
          {`Total: R$ ${totalCart.toFixed(2).replace('.', ',')}`}
        </p>
        <form className="checkout-form">
          <h2>Endereço</h2>
          <label htmlFor="street">
            Rua:
            <input
              className="street-input"
              data-testid="checkout-street-input"
              type="text"
              name="street"
              onChange={ (e) => setStreet(e.target.value) }
            />
          </label>
          <label htmlFor="number">
            Número da casa:
            <input
              data-testid="checkout-house-number-input"
              type="number"
              name="number"
              onChange={ (e) => setHouseNR(e.target.value) }
            />
          </label>
          <button
            className="btn btn-success finish-checkout-btn"
            disabled={ disabled }
            type="button"
            data-testid="checkout-finish-btn"
            onClick={ handleClick }
          >
            Finalizar Pedido
          </button>
        </form>
        {success ? <p>Compra realizada com sucesso!</p> : null}
      </div>
    </div>
  );
}

export default Checkout;
