import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import './MenuTop.css';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuSide from './MenuSide';

function MenuTop({ title }) {
  const user = JSON.parse(localStorage.getItem('user'));
  let isAdmin = false;
  if (user && user.role === 'administrator') {
    isAdmin = true;
  }
  try {
    const [open, setOpen] = useState(isAdmin);// true para passar no adminprofile
    return (
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <div className="title-container">
            <h1 className="title" data-testid="top-title">
              { title }
            </h1>
            
            <MenuSide title="Trybeer" />


          </div>
        </Toolbar>
      </AppBar>
    );
  } catch (err) {
    return <Redirect to="/login" />;
  }
}

export default MenuTop;

MenuTop.propTypes = {
  title: PropTypes.string.isRequired,
};
