import React from 'react';
import proptypes from 'prop-types';

const BodyContainer = (props) => {
  const { children } = props;
  return (
    <div
      className="flex items-center justify-center px-4 w-full relative"
    >
      { children }
    </div>
  );
};

BodyContainer.propTypes = {
  children: proptypes.node.isRequired,
};

export default BodyContainer;
