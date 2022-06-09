import React, { useEffect, useState } from 'react';
import { useAds } from '../../context/ads';
import { useAuth } from '../../context/auth';
import { formatCurrency, formatToNumber } from '../../utils/mask';

import {
  Button,
  Card, Container, ContentInput, Input, TextButton, Title
} from './styles';

function CreateAnuncio({ data, setEdit }) {
  const { createAds, editAds } = useAds();
  const { user } = useAuth();
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState('');

  useEffect(() => {
    if(data) {
      setType(data.type);
      setPrice(data.price);
      setAvailability(data.availability);
      setDescription(data.description);
    }
  }, [data])

  async function handleCreateAds() {
    if(data) {
      console.log('2');
      await editAds(type, price, description, availability, user.cpf, data.id, () => {
        alert('ANUNCIO EDITADO COM SUCESSO');
      })
      setEdit(false)
    } else {
      await createAds(type, price, description, availability, user.cpf, () => {
        alert('ANUNCIO CRIADO COM SUCESSO');
        setType('');
        setPrice('');
        setAvailability('');
        setDescription('');
      })
    }
  }
  return(
    <Container>
      <Card>
        <Title>
          {data ? 'EDITAR' : 'CADASTRAR'}
          {' '}
          ANUNCIO
        </Title>
        <ContentInput>
          <Input
            placeholder='Digite o titulo'
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <Input
            placeholder='Digite o preço'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            placeholder='Digite a descrição'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder='Digite a disponibilidade'
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
        </ContentInput>
        <Button onClick={() => handleCreateAds()}>
          <TextButton>
          {data ? 'EDITAR' : 'CRIAR'}
            {' '}
            ANUNCIO

          </TextButton>
        </Button>
      </Card>
    </Container>
  );
}

export default CreateAnuncio;
