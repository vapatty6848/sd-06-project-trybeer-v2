import React from 'react';
import PropTypes from 'prop-types';

export default function AdminChat({ match }) {
  const { email } = match.params;

  return (
    <div>{`Conversas com o cliente ${email}`}</div>
  );
}

AdminChat.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      email: PropTypes.string,
    }),
  }).isRequired,
};
