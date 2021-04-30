import React from 'react';
import logo from '../images/tb-logo.png';
import '../styles/login.css';

function LoginOpen() {
  return (
    <div className="maincontainer">
      <div className="transparence">
        <img width="350px" src={ logo } alt="logo" className="logoimageOpen" />
      </div>
    </div>
  );
}

export default LoginOpen;
