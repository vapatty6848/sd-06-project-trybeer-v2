import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { GlobalContext } from '../../Contexts/GlobalContext';
import { updateStatus } from '../../Services/Apis';

import S from './styles';

const redirectOrderDetails = ({ history, id, address, number, setStateDetailsSale }) => {
  setStateDetailsSale({ id, address, number });

  history.push(`/admin/orders/${id}`);
};

const modifyStatus = async (setPending, id) => {
  setPending(false);

  await updateStatus(id);
};

const CardAdminStatus = ({
  id,
  number,
  status,
  address,
  totalValue,
  index,
}) => {
  const [pending, setPending] = useState(true);
  const { stateSideBarAdmin, setStateDetailsSale } = useContext(GlobalContext);

  useEffect(() => {
    if (status === 'Entregue') setPending(false);
  }, [status]);

  const history = useHistory();

  const params = {
    id,
    number,
    address,
    history,
    setStateDetailsSale,
  };

  return (
    <S.Container
      pending={ pending }
      onClick={ () => redirectOrderDetails(params) }
    >

      <S.ColorStatus
        pending={ pending }
        stateSideBarAdmin={ stateSideBarAdmin }
      />

      <S.ContentLeft className="content-left">
        <h2 data-testid={ `${index}-order-number` }>
          {`Pedido ${id}`}
        </h2>
        {pending ? (
          <span data-testid={ `${index}-order-status` }>
            {status}
          </span>
        ) : (
          <span>
            Entregue
          </span>
        )}
      </S.ContentLeft>

      <S.ContentRight>
        <span data-testid={ `${index}-order-address` }>
          {`${address}, ${number}`}
        </span>
        <p data-testid={ `${index}-order-total-value` }>
          R$
          {' '}
          {(totalValue).replace('.', ',')}
        </p>
      </S.ContentRight>

      <S.ConfirmButton
        className="confirm"
        onClick={ () => modifyStatus(setPending, id) }
      >
        Confirmar entrega
      </S.ConfirmButton>

    </S.Container>
  );
};

CardAdminStatus.propTypes = {
  id: PropTypes.number.isRequired,
  number: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  totalValue: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardAdminStatus;
