import React from 'react';
import propTypes from 'prop-types';

function ProductCard({ indexId, price, qtd, name, img }) {
  return (
    <div
      data-testid={ `${indexId}-product-card` }
      className="card p-4 flex-fill w-25 p-3"
    >
      <div className="card-header">
        <p data-testid={ `${indexId}-product-price` }>{price}</p>
      </div>
      <img
        data-testid={ `${indexId}-product-img` }
        src={ img }
        alt="Product cover"
        className="card-img-top w-100 p-3"
      />
      <div className="card-body d-flex">
        <p data-testid={ `${indexId}-product-name` } className="align-self-end">{name}</p>
      </div>
      <div className="card-footer d-inline-flex justify-content-around">
        <button
          type="button"
          data-testid={ `${indexId}-product-minus` }
          className="btn btn-danger"
        >
          -
        </button>
        <p data-testid={ `${indexId}-product-qtd` }>{qtd}</p>
        <button
          type="button"
          data-testid={ `${indexId}-product-plus` }
          className="btn btn-primary"
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
  qtd: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
};

export default ProductCard;
