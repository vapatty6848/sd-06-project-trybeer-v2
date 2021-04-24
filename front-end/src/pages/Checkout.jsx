import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import MenuTop from '../components/MenuTop';
import '../styles/checkout.css';
import api from '../services/api';

export default function Checkout() {
  const [productIsInCart, setProductIsInCart] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [message, setMessage] = useState(false);
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');

  const products = JSON.parse(localStorage.getItem('productsCart'));

  const history = useHistory();

  const sumOfCart = (sum, product) => sum + product.qty * product.price;

  useEffect(() => {
    if (products && products.length === 0) setProductIsInCart(true);
    if ((products && products.reduce(sumOfCart, 0) === 0)
      || rua.length === 0 || numero.length === 0) setButtonDisabled(true);
    else setButtonDisabled(false);
  }, [products, rua, numero]);

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Redirect to="login" />;

  const changeRua = (e) => {
    const { value } = e.target;
    setRua(value);
  };

  const changeNumero = (e) => {
    const { value } = e.target;
    setNumero(value);
  };

  function removeProduct(product) {
    const newProducts = products.filter((item) => item.id !== product.id);
    localStorage.setItem('productsCart', JSON.stringify(newProducts));
    document.location.reload();
  }

  const finalizar = async () => {
    const time = 5000;
    setMessage(true);
    localStorage.setItem('productsCart', JSON.stringify([]));

    const total = products.reduce(sumOfCart, 0);

    setTimeout(() => history.push('/products'), time);

    const now = new Date();
    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}
    ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const saleId = await api.fetchAddSale({
      userId: user.id,
      total,
      street: rua,
      number: numero,
      data: date,
      status: 'Pendente',
    });

    console.log(saleId);

    const productsCart = products.map((product) => (
      {
        productId: Number(product.id),
        quantity: product.qty,
        saleId: saleId.id,
      }
    ));

    const fetch = async (product) => {
      await api.fetchAddSaleProduct(product);
    };

    productsCart.forEach((prod) => {
      fetch(prod);
    });
  };

  return (
    <div>
      <MenuTop title="Finalizar Pedido" />
      <h2>Produtos</h2>
      {products.map((item, index) => (
        <div key={ item.id } className="product">
          <span data-testid={ `${index}-product-qtd-input` }>{item.qty}</span>
          <span data-testid={ `${index}-product-name` }>{item.name}</span>
          <span
            data-testid={ `${index}-product-total-value` }
          >
            { (item.qty * item.price)
              .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
          </span>
          <span data-testid={ `${index}-product-unit-price` }>
            { `(${Number(item.price)
              .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} un)` }
          </span>
          <span data-testid={ `${index}-removal-button` }>
            <button
              type="button"
              onClick={ () => removeProduct(item) }
              className="btn btn-danger"
            >
              X
            </button>
          </span>
        </div>
      ))}
      { productIsInCart && <p>Não há produtos no carrinho</p> }
      <div className="total-price">
        <p data-testid="order-total-value">
          {`Total: ${products.reduce(sumOfCart, 0)
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          `}
        </p>
      </div>
      <form className="form-checkout">
        <h3>Endereço</h3>
        <div className="form-group">
          <label htmlFor="rua">
            Rua:
            <input
              type="text"
              id="rua"
              data-testid="checkout-street-input"
              onChange={ (e) => changeRua(e) }
              className="form-control"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="casa">
            Número da casa:
            <input
              type="text"
              id="casa"
              data-testid="checkout-house-number-input"
              onChange={ (e) => changeNumero(e) }
              className="form-control"
            />
          </label>
        </div>
      </form>
      <div className="form-button">
        <button
          data-testid="checkout-finish-btn"
          type="button"
          disabled={ buttonDisabled }
          onClick={ finalizar }
          className="btn btn-danger"
        >
          Finalizar Pedido
        </button>
      </div>
      { message && <p className="alert alert-danger">Compra realizada com sucesso!</p> }
    </div>
  );
}
