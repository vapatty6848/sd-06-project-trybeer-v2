import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { findAllProducts } from '../../Services/Apis';
import { GlobalContext } from '../../Contexts/GlobalContext';

import MenuTop from '../../Components/MenuTop';
import SideBar from '../../Components/SideBar';
import CardProducts from '../../Components/CardProducts';
import Button from '../../Components/Button';

import S from './styles';

const saveCart = (cartList, history) => {
  localStorage.setItem('infosCheckout', JSON.stringify(cartList));

  history.push('/checkout');
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const {
    stateSumPrice,
    stateSideBar,
    cartList,
  } = useContext(GlobalContext);

  const history = useHistory();

  useEffect(() => {
    const priceTotal = Number(localStorage.getItem('total'));

    if (priceTotal !== 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [stateSumPrice]);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user'));

    if (!userToken) history.push('/login');

    findAllProducts()
      .then((res) => setProducts(res));
  }, [history]);

  return (
    <S.Container>

      <MenuTop />

      <SideBar />

      <S.ContainerProducts className="content">
        <S.ContainerCards stateSideBar={ stateSideBar }>
          {products && (
            products.map((product) => (
              <CardProducts
                key={ product.id }
                product={ product }
              />
            ))
          )}
        </S.ContainerCards>

        <S.ContainerButton stateSideBar={ stateSideBar }>
          <Button
            type="button"
            color="green"
            fontSize="20px"
            width="93%"
            heigth="40px"
            botton="0"
            position="fixed"
            marginBottom="10px"
            disabled={ isDisabled }
            onClick={ () => saveCart(cartList, history) }
            dataTestid="checkout-bottom-btn"
          >
            Ver Carrinho -
            {' '}
            <span data-testid="checkout-bottom-btn-value">
              {localStorage.getItem('total') !== null
                ? `R$ ${(Number(localStorage.getItem('total'))
                  .toFixed(2)).replace('.', ',')}`
                : `R$ ${(stateSumPrice.toFixed(2)).replace('.', ',')}`}
            </span>
          </Button>
        </S.ContainerButton>
      </S.ContainerProducts>
    </S.Container>
  );
};

export default Products;
