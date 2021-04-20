import React from 'react';

function Buttons(msg, setMsg, errorForm) {
  const timeout = 5000;
  if (msg.error !== '' || msg.success !== '') {
    setTimeout(() => setMsg({ error: '', success: '' }), timeout);
  }

  return (
    <div className="w-full mt-10 flex flex-col space-y-2">
      <p
        className={ `bg-red-500 rounded-md p-2 text-center
          text-white mt-4 ${msg.error !== '' ? '' : 'hidden'}` }
      >
        { msg.error }
      </p>
      <p
        className={ `bg-green-500 rounded-md p-2 text-center
          text-white mt-4 ${msg.success !== '' ? '' : 'hidden'} relative` }
      >
        <p className="absolute w-full">{ msg.success }</p>
        <p className="text-green-500">Atualização concluída com sucesso.</p>
      </p>
      <button
        data-testid="profile-save-btn"
        className={ `rounded-md w-full p-2 ${(!errorForm.email && !errorForm.name)
          ? 'bg-secondary' : 'bg-gray-300'}
          focus:outline-none` }
        type="submit"
        disabled={ errorForm.email || errorForm.name }
      >
        <p className="hidden">Salvar</p>
        <p>Save</p>
      </button>
    </div>
  );
}

export default Buttons;
