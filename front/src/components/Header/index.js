import React from 'react';
import { useAuth } from '../../context/auth';

import { Container, Title } from './styles';

function Header() {
  const { user } = useAuth();
  return(
    <Container>
      <Title>
        i
        <h3>Clean</h3>
      </Title>
      <h1>
      {user?.name ? `Olá,
        ${user.name}` : ''}
      </h1>
    </Container>
  );
}

export default Header;
