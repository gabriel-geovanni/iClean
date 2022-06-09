import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import CreateAnuncio from '../../components/CreateAnuncio';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import SelectCadidate from '../../components/SelectCandidate';
import { useAds } from '../../context/ads';
import { useAuth } from '../../context/auth';
import { useMenu } from '../../context/menu';
import { anuncios } from '../../mock/anuncios';
import { loadAds, loadAdsCandidate, rateServices } from '../../services';
import themes from '../../themes';
import { formatCurrency, moedaMask } from '../../utils/mask';

import {
  Body,
  Card,
  CardContainer,
  CardContent,
  Container, Content, ContentInput, Diviser, Info, InfoView, Input, Row, Text, Title, Touch
} from './styles';

function Home() {
  const { option } = useMenu();
  const {
    listAds, loadListAds, listAdsCandidate, loadListAdsCandidate, deleteAds,
    postCadidate, deleteCadidate, listAllCadidate, listCandidateAds,
    listServices, listCandidateServices, rateService
  } = useAds();
  const { user } = useAuth();
  const [type, setType] = useState('login');
  const [rate, setRate] = useState(1);
  const [edit, setEdit] = useState(null);

  const [onCandidate, setOnCandidate] = useState(false);
  async function loadAnuncios() {
    loadListAds();
    loadListAdsCandidate(user.cpf);
  }

  useEffect(() => {
    loadAnuncios()
    listServices(user.cpf)
  }, []);

  useEffect(() => {
    if(listCandidateAds.length) { setOnCandidate(true) }
  }, [listCandidateAds]);

  useEffect(() => {
    setEdit(false)
  }, [option]);

  return(
    <Container>
      <Header/>
      <Content>
      <Menu/>
      <Body>
        {edit
          && <CreateAnuncio data={edit} setEdit={setEdit}/>}
       {(option === 'todos' || option === 'meus' || option === 'candidaturas') && !edit ? (
<CardContainer>
          {
            listAds.filter((anuncio) => (
              option === 'todos'
                ? !listAdsCandidate.includes(anuncio.id) && anuncio.ucpf !== user.cpf
                : option === 'candidaturas'
                  ? listAdsCandidate.includes(anuncio.id)
                  : anuncio.ucpf === user.cpf
            )).map((anuncio, index) => (
              <CardContent>
              <Card key={anuncio.id} >
              <InfoView style={{ justifyContent: 'space-between', width: '100%' }}>
                <InfoView>
                <Info>Titulo: </Info>
                <Text>{anuncio.type}</Text>
                </InfoView>
                <InfoView >
                <Info>Valor: </Info>
                <Text>{formatCurrency(anuncio.price)}</Text>
                </InfoView>
              </InfoView>
              <Diviser/>
                <InfoView style={{ justifyContent: 'space-between', marginBottom: 0, width: '100%' }}>
                <InfoView>
                <Info>Name: </Info>
                <Text>{anuncio.user.name}</Text>
                </InfoView>
                <InfoView>
                <Info>Avaliação: </Info>
                <Text>{anuncio.average.provider}</Text>
                </InfoView>
                </InfoView>
                <InfoView>
                <Info>Email: </Info>
                <Text>{anuncio.user.email}</Text>
                </InfoView>

                <InfoView>
                <Info>Disponibilidade: </Info>
                <Text>{anuncio.availability}</Text>
                </InfoView>
                <InfoView>
                <Info>Descrição: </Info>
                <Text>{anuncio.description}</Text>
                </InfoView>
              </Card>
              {anuncio.ucpf !== user.cpf && listAdsCandidate.includes(anuncio.id) ? (
              <Row>
                <Touch
                  onClick={() => deleteCadidate(anuncio.id, user.cpf)}
                  active={type === 'candidatar'}
                  style={{
                    backgroundColor: themes.colors.red
                  }}
                >
                  <Title active={type === 'candidatar'}>Remover candidatura</Title>
                </Touch>
              </Row>
              ) : anuncio.ucpf !== user.cpf ? (
                <Row>
                <Touch onClick={() => postCadidate(anuncio.id, user.cpf)} active={type === 'candidatar'}>
                  <Title active={type === 'candidatar'}>Candidatar</Title>
                </Touch>
                </Row>
              )
                : (
                <Row style={{ justifyContent: 'space-between' }}>
                  <Touch
                    onClick={() => {
                      listAllCadidate(anuncio.id);
                      setOnCandidate(anuncio)
                    }}
                    style={{
                      backgroundColor: themes.colors.white
                    }}
                  >
                    <Title
                      style={{
                        color: themes.colors.black
                      }}
                    >
                        Candidatos

                    </Title>
                  </Touch>
                  <Touch
                    onClick={() => {
                      setEdit(anuncio);
                    }}
                    style={{
                      backgroundColor: themes.colors.white
                    }}
                  >
                    <Title
                      style={{
                        color: themes.colors.black
                      }}
                    >
                      Editar anuncio

                    </Title>
                  </Touch>
                  <Touch
                    onClick={() => {
                      deleteAds(anuncio.id);
                    }}
                    style={{
                      backgroundColor: themes.colors.red
                    }}
                  >
                    <Title active={type === 'candidatar'}>Excluir anuncio</Title>
                  </Touch>

                </Row>
                )}
              </CardContent>
            ))
          }
</CardContainer>
       )
         : option === 'services' ? (
          <>
          {listCandidateServices.map((service) => (
          <CardContent>
          <Card key={service.id} >
          <InfoView style={{ justifyContent: 'space-between', width: '100%' }}>
            <InfoView>
            <Info>Titulo: </Info>
            <Text>{service.type}</Text>
            </InfoView>
            <InfoView >
            <Info>Valor: </Info>
            <Text>{formatCurrency(service.price)}</Text>
            </InfoView>
          </InfoView>
          <Diviser/>
            <InfoView style={{ justifyContent: 'space-between', marginBottom: 0, width: '100%' }}>
            <InfoView>
            <Info>Prestador: </Info>
            <Text>{service.provider.name}</Text>
            </InfoView>
            <InfoView>
            <Info>Avaliação: </Info>
            <Text>{service.averageProvider.provider}</Text>
            </InfoView>
            </InfoView>
            <InfoView style={{ justifyContent: 'space-between', marginBottom: 0, width: '100%' }}>
            <InfoView>
            <Info>Anúnciante: </Info>
            <Text>{service.customer.name}</Text>
            </InfoView>
            <InfoView>
            <Info>Avaliação: </Info>
            <Text>{service.averageCustomer.provider}</Text>
            </InfoView>
            </InfoView>
            {/* <InfoView>
            <Info>Email: </Info>
            <Text>{service.provider.email}</Text>
            </InfoView> */}


            <InfoView>
            <Info>Data de realização: </Info>
            <Text>{format(new Date(service.date), 'yyyy-MM-dd')}</Text>
            </InfoView>
            <InfoView>
            <Info>Descrição: </Info>
            <Text>{service.description}</Text>
            </InfoView>
          </Card>
          {user.cpf === service.provider.cpf ? !service.rateCustomer : !service.rateProvider && (
<>
            <ContentInput>
            <Info>
                Digite a sua avaliação do
                {user.cpf === service.provider.cpf ? 'Anunciante' : 'Prestador'}
            </Info>

            <Input
              placeholder={`Digite a sua avaliação do ${user.cpf === service.provider.cpf ? 'Anunciante' : 'Prestador'}`}
              onChange={(e) => setRate(e.target.value < 1
                ? 1
                : e.target.value > 5
                  ? 5
                  : e.target.value)}
              value={rate}
              type='number'
            />
            </ContentInput>
            <Row style={{ alignItens: 'flex-end' }}>
            <Touch
              onClick={() => rateService({
                id: service.id,
                totalRatingsProvider: user.cpf === service.provider.cpf ? 0 : rate,
                totalRatingsCustomer: user.cpf === service.provider.cpf ? rate : 0,
                cpf: user.cpf === service.provider.cpf ? service.customer.cpf : service.provider.cpf
              })}
              active={type === 'candidatar'}
              style={{
                marginTop: 10
              }}
            >
              <Title active={type === 'candidatar'}>Avaliar serviço</Title>
            </Touch>
            </Row>
</>
          )}
          </CardContent>

          ))}
          </>
         )
           : option !== 'meus' ? <CreateAnuncio/> : null}
      </Body>
      </Content>
      {
        !!onCandidate
        && <SelectCadidate data={onCandidate} setShow={() => setOnCandidate(false)}/>
      }
    </Container>
  );
}

export default Home;
