import React, { useContext } from 'react';
import CheckoutContext from '../../context/CheckoutContext';

function ProductCard() {
  const { products, setProdutos, sumTotal } = useContext(CheckoutContext);

  const handleRemove = (productName) => {
    const remove = products.filter((item) => item.name !== productName);
    setProdutos(remove);
  };

  const formatSumTotal = (value) => {
    const convertValue = parseFloat(value).toFixed(2);
    const sumTotalValue = String(convertValue);
    return sumTotalValue.replace('.', ',');
  };

  const formatTotalCall = formatSumTotal(sumTotal);

  return (
    <div className="margin-space">
      <div className="title-center">
        <div>
          <h3 className="title-prod">Produtos</h3>
        </div>
      </div>
      {products.length !== 0 ? products.map((item, index) => (
        <div key={ index }>
          <div className="movie-card-prod">
            <div className="space-entry">
              <p data-testid={ `${index}-product-qtd-input` }>{ item.quantity }</p>
            </div>
            <div className="space-entry">
              <p data-testid={ `${index}-product-name` }>{ item.name }</p>
            </div>
            <div className="space-entry">
              <p data-testid={ `${index}-product-total-value` }>
                {
                  `R$ ${formatSumTotal(item.totalValue)}`
                }
              </p>
            </div>
            <div className="space-entry">
              <p data-testid={ `${index}-product-unit-price` }>
                {`(R$ ${formatSumTotal(item.price)} un)`}
              </p>
            </div>
            <div>
              <button
                className="button is-dark"
                type="button"
                onClick={ () => handleRemove(item.name) }
                data-testid={ `${index}-removal-button` }
              >
                X
              </button>
            </div>
          </div>
        </div>
      )) : <h2>Não há produtos no carrinho</h2> }
      <h3 data-testid="order-total-value">
        Total:
        {`R$ ${formatTotalCall}`}
      </h3>
    </div>
  );
}

export default ProductCard;
