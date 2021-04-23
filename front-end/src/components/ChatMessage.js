import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

export default function ChatMessage({ msg }) {
  return (
    <section>
      <section data-testid="nickname">
        { msg.nickname }
      </section>
      <section data-testid="text-message">
        { msg.message }
      </section>
      <section data-testid="message-time">
        <Moment date={ msg.timestamp } format="HH:mm" />
      </section>
    </section>
  );
}

ChatMessage.propTypes = {
  msg: PropTypes.objectOf(PropTypes.any).isRequired,
};
