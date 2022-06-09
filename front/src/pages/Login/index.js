import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { useAuth } from '../../context/auth';
import { login } from '../../services';

import {
  Button,
  CardLogin, Container, ContentInput, Input, InputPass, Row, TextButton, Title, Touch
} from './styles';

function Login() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [type, setType] = useState('login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');

  async function handleSignIn() {
    const user = await signIn(cpf, password);
    if(user.name) { navigate('/home') }
  }
  async function handleSignUp() {
    const user = await signUp(cpf, name, password, phone, email);
    if(user.name) { navigate('/home') }
  }

  return(
    <Container>
    <Header/>
      <CardLogin>
        <Row>
          <Touch onClick={() => setType('login')} active={type === 'login'}>
            <Title active={type === 'login'}>Login</Title>
          </Touch>
          <Touch onClick={() => setType('cadastrar')} active={type === 'cadastrar'}>
            <Title active={type === 'cadastrar'}>Cadastrar</Title>
          </Touch>
        </Row>
        {type === 'login'
          ? (
            <>
             <ContentInput>
                <Input
                  placeholder='Digite o seu cpf'
                  onChange={(e) => setCpf(e.target.value)}
                  value={cpf}
                />
                <InputPass
                  placeholder='Digite a sua senha'
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}

                />
             </ContentInput>
              <Button onClick={() => handleSignIn()}>
                <TextButton>ENTRAR</TextButton>
              </Button>
            </>

          )
          : (
            <>
              <ContentInput>
                <Input
                  placeholder='Digite o seu nome'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <Input
                  placeholder='Digite o seu cpf'
                  onChange={(e) => setCpf(e.target.value)}
                  value={cpf}
                />
                <Input
                  placeholder='Digite o seu email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Input
                  placeholder='Digite o seu phone'
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                <InputPass
                  placeholder='Digite a sua senha'
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </ContentInput>
              <Button onClick={() => handleSignUp()}>
                <TextButton>CADASTRAR</TextButton>
              </Button>
            </>
          )}
      </CardLogin>
      <div style={{ height: 100 }}/>
    </Container>

  );
}

export default Login;
