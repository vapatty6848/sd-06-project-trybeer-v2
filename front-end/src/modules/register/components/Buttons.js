import React from 'react';
import { Link } from 'react-router-dom';

function Buttons(errorMsg, setErrorMsg, errorForm) {
  const timeout = 5000;
  if (errorMsg !== '') {
    setTimeout(() => setErrorMsg(''), timeout);
  }

  return (
    <div className="w-full mt-10 flex flex-col space-y-2">
      <p
        className={ `bg-red-500 rounded-md p-2 text-center
          text-white mt-4 ${errorMsg !== '' ? '' : 'hidden'}` }
      >
        { errorMsg }
      </p>
      <button
        data-testid="signup-btn"
        className={ `rounded-md w-full p-2 ${(!errorForm.email && !errorForm.name
          && !errorForm.password) ? 'bg-secondary' : 'bg-gray-300'}
          focus:outline-none` }
        type="submit"
        disabled={ errorForm.email || errorForm.password || errorForm.name }
      >
        <p className="hidden">Cadastrar</p>
        <p>Create Account</p>
      </button>
      <Link
        to="/login"
        className="text-xs text-gray-600"
      >
        Do you have an account?
      </Link>
    </div>
  );
}

export default Buttons;
