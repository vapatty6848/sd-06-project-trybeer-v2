import React, { useContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';

function ProductCard({ indexId, id, price, name, img }) {
  const [quantity, setQuantity] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const { cart, updateProduct } = useContext(Context);

  const changedPrice = price.replace('.', ',');

  useEffect(() => {
    const findItemById = cart.find((item) => item.id === id);
    if (findItemById !== undefined) {
      setQuantity(findItemById.qtd);
      setTotalValue(findItemById.totalPrice);
    }
  }, [cart, id, totalValue]);

  function calculatePrice(quantitie) {
    const preco = parseFloat(price).toFixed(2);
    const total = quantitie * preco;
    return total;
  }

  function increaseQtd() {
    const qtd = quantity + 1;
    const totalPrice = calculatePrice(qtd);
    setQuantity(qtd);
    updateProduct({ id, price, nome: name, qtd, totalPrice });
  }

  function decreaseQtd() {
    if (quantity > 0) {
      const qtd = quantity - 1;
      const totalPrice = calculatePrice(qtd);
      setQuantity(qtd);
      updateProduct({ id, price, nome: name, qtd, totalPrice });
    }
  }

  return (
    <div
      data-testid={ `${indexId}-product-card` }
      className="card flex-fill my-3 product-card-main-div"
    >
      <div className="card-header font-weight-bold text-monospace">
        <p data-testid={ `${indexId}-product-price` }>{`R$ ${changedPrice}`}</p>
      </div>
      <img
        data-testid={ `${indexId}-product-img` }
        src={ img }
        alt="Product cover"
        className="card-img-top p-4"
      />
      <div className="card-body d-flex">
        <p data-testid={ `${indexId}-product-name` } className="align-self-end">
          {name}
        </p>
      </div>
      <div className="card-footer d-flex justify-content-around rounded-bottom">
        <button
          type="button"
          data-testid={ `${indexId}-product-minus` }
          className="btn btn-product"
          onClick={ () => decreaseQtd() }
        >
          -
        </button>
        <p
          data-testid={ `${indexId}-product-qtd` }
          className="font-weight-bold text-monospace"
        >
          {quantity}
        </p>
        <button
          type="button"
          data-testid={ `${indexId}-product-plus` }
          className="btn btn-product"
          onClick={ () => increaseQtd() }
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  indexId: propTypes.number.isRequired,
  price: propTypes.string.isRequired,
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
};

export default ProductCard;
