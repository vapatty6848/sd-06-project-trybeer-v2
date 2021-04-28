import React from 'react';

import { FaStreetView } from 'react-icons/fa';
import { AiOutlineFieldNumber } from 'react-icons/ai';

import Input from '../../Components/Input';

import S from './styles';

export default function form(params) {
  const {
    valueTotal,
    setStreet,
    setNumberHouse,
    cardsProductsValues,
    checkOut,
    stateSideBar,
  } = params;

  const theme = JSON.parse(localStorage.getItem('@trybeer:theme'));

  return (
    <S.ContainerMain stateSideBar={ stateSideBar }>
      {checkOut ? (
        <S.CompletedSale>Compra realizada com sucesso!</S.CompletedSale>
      ) : (
        <S.ContainerProducts>
          <h1>Produtos</h1>
          {cardsProductsValues}
          <S.Total data-testid="order-total-value">
            Total: R$
            {' '}
            {(valueTotal).toFixed(2).replace('.', ',')}
          </S.Total>
          <S.ContainerAddress>
            <h1>Endereço</h1>
            <Input
              id="Rua"
              type="text"
              label="Rua"
              width="100%"
              dataTestid="checkout-street-input"
              themeStorage={ theme && theme.title }
              widthDivLabel="100%"
              icon={ FaStreetView }
              onChange={ ({ target }) => setStreet(target.value) }
            />
            <Input
              id="Número da casa"
              type="number"
              label="Número da casa"
              width="100%"
              dataTestid="checkout-house-number-input"
              themeStorage={ theme && theme.title }
              widthDivLabel="100%"
              icon={ AiOutlineFieldNumber }
              onChange={ ({ target }) => setNumberHouse(target.value) }
            />
          </S.ContainerAddress>
        </S.ContainerProducts>
      )}
    </S.ContainerMain>
  );
}
