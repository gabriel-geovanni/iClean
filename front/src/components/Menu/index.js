import React, { useState } from 'react';
import { useMenu } from '../../context/menu';

import {
  Container, Diviser, Title, Touch
} from './styles';

function Menu() {
  const { option, setOption } = useMenu();

  return(
    <Container>

        <Touch onClick={() => setOption('todos')} active={option === 'todos'}>
          <Title active={option === 'todos'}>TODOS OS ANÚNCIOS</Title>
        </Touch>
        <Touch onClick={() => setOption('meus')} active={option === 'meus'}>
          <Title active={option === 'meus'}>SEUS ANÚNCIOS</Title>
        </Touch>
        <Touch onClick={() => setOption('candidaturas')} active={option === 'candidaturas'}>
          <Title active={option === 'candidaturas'}>SUAS CANDIDATURAS</Title>
        </Touch>
        <Touch onClick={() => setOption('services')} active={option === 'services'}>
          <Title active={option === 'services'}>SEUS SERVIÇOS</Title>
        </Touch>
        <Diviser/>
        <Touch onClick={() => setOption('criaranuncio')} active={option === 'criaranuncio'}>
          <Title active={option === 'criaranuncio'}>CRIAR ANÚNCIO</Title>
        </Touch>

    </Container>
  );
}

export default Menu;
