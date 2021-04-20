import React from 'react';
import { Link } from 'react-router-dom';

function Buttons(errorMsg, errorForm) {
  return (
    <div className="w-full mt-10 flex flex-col space-y-2">
      <p
        className={ `bg-red-500 rounded-md p-2 text-center ${errorMsg ? '' : 'hidden'}` }
      >
        { errorMsg }
      </p>
      <button
        data-testid="signin-btn"
        className={ `rounded-md w-full p-2 ${(!errorForm.email
          && !errorForm.password) ? 'bg-secondary' : 'bg-gray-300'}
          focus:outline-none` }
        type="submit"
        disabled={ errorForm.email || errorForm.password }
      >
        <p className="hidden">ENTRAR</p>
        <p className="hidden">Entrar</p>
        <p>Sign In</p>
      </button>
      <Link
        data-testid="no-account-btn"
        className="rounded-md border-secondary border w-full p-2
          text-center focus:outline-none"
        to="/register"
      >
        <p>Sign Up</p>
        <p className="hidden">Ainda não tenho conta</p>
      </Link>
      <p
        className="text-xs text-gray-600"
      >
        Forgot your passsword?
      </p>
    </div>
  );
}

export default Buttons;
