import React from 'react';

import { BiUser } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi';

import S from './styles';

export default function profile(name, email) {
  return (
    <S.ContextProfile>

      <S.ContextName>
        <div>
          <BiUser />
        </div>
        <span data-testid="profile-name">{ name }</span>
      </S.ContextName>

      <S.ContextEmail>
        <div>
          <FiMail />
        </div>
        <span data-testid="profile-email">{ email }</span>
      </S.ContextEmail>

    </S.ContextProfile>
  );
}
