import React, { useEffect, useState } from 'react';
import { LoginForm } from '../components/index';
import LoginOpen from '../components/LoginOpen';

function Login() {
  const visibleInterval = 3000;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, visibleInterval);
  }, []);

  return (
    <div>
      {open ? (
        <LoginOpen />
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default Login;
