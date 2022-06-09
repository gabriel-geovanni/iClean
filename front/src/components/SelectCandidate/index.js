import React, { useEffect, useState } from 'react';
import { useAds } from '../../context/ads';
import { useAuth } from '../../context/auth';
import { formatCurrency, formatToNumber } from '../../utils/mask';

import {
  Button,
  Card, CheckView, Container, ContentInput, InfoView, Input, Text, TextButton, Title
} from './styles';

function SelectCadidate({ data, setShow }) {
  const {
    listAllCadidate, listCandidateAds, createServices
  } = useAds();
  const [select, setSelect] = useState(null);
  const [anuncio, setAnuncio] = useState(null);


  async function loadCandidates() {
    await listAllCadidate(data.id)
  }
  useEffect(() => {
    setAnuncio(data)
    loadCandidates()
  }, [])

  async function handleSelectCandidate() {
    //
  }
  return(
    <Container >
      <Card >
        <Title>
          CANDIDATOS
        </Title>
        <ContentInput>
        {
          listCandidateAds.map((candidate) => (
            <CheckView
              onClick={() => {
                if(select && select.ucpf === candidate.ucpf) {
                  setSelect(null)
                } else {
                  setSelect(candidate)
                }
              }}
              active={select && candidate.ucpf === select?.ucpf}
            >
              <InfoView style={{ justifyContent: 'space-between' }}>

              <Text>
                Nome:
                {' '}
                {candidate.user.name}
              </Text>
              <Text>
                Avaliação:
                {' '}
                {candidate.average.provider}
              </Text>
              </InfoView>
              <InfoView style={{ justifyContent: 'space-between' }}>
                <Text>
                  CPF:
                  {' '}
                  {candidate.user.cpf}
                </Text>
                <Text>
                  Email:
                  {' '}
                  {candidate.user.email}
                </Text>
              </InfoView>
            </CheckView>
          ))
        }
        </ContentInput>
        <InfoView>
        <Button onClick={() => setShow()}>
          <TextButton>
            CANCELAR
          </TextButton>
        </Button>
        <Button
          onClick={() => createServices(
            anuncio.type,
            anuncio.price,
            anuncio.availability,
            select.ucpf,
            anuncio.ucpf,
            anuncio.id,
            () => setShow()
          )}
          active={!!select}
        >
          <TextButton active={!!select}>
            CONFIRMAR
          </TextButton>
        </Button>
        </InfoView>
      </Card>
    </Container>
  );
}

export default SelectCadidate;
