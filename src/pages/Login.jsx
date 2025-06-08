import { Container } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import InputText from '../components/InputText';
import { PrimaryButtonStyled } from '../components/styles/ButtonStyled';
import { LinkTextStyled, MainTextStyled, SecondTextStyled } from '../components/styles/TextStyled';
import api from '../axiosConfig';

const Login = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    api.post('/login/', {
      email: email,
      password: password
    }).then(response => {
        const decodedToken = jwtDecode(response.data.access_token);
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('userId', JSON.stringify(decodedToken.userId));
        localStorage.setItem('userEmail', JSON.stringify(decodedToken.email));
        localStorage.setItem('roles', JSON.stringify(decodedToken.roles));
    }).then(() => {
      window.location.href = '/';
    }).catch(error => {
        console.error('Login error:', error);
        alert('Email ou senha inválidos');
      }
    );
  }

  return (
    <>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        maxWidth: '100vw', 
        margin: '6em 8em', 
        }}
      >
        <div item style={{marginRight: '10em'}}>
          <MainTextStyled>Bem-vindo!</MainTextStyled>
          <SecondTextStyled
            style={{
              maxWidth: '400px',
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Ac placerat fringilla consectetur commodo.
            </SecondTextStyled>
          <InputText 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            type="email" 
            placeholder="contato@igrejavidanova.com.br" 
            label="E-mail"
          />
          <InputText 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            type="password" 
            placeholder="*******" 
            label="Senha"
          />
          <div
            style={{
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <LinkTextStyled href="/cadastrar" marginTop="34px">Ainda não tem cadastro?</LinkTextStyled>
            <PrimaryButtonStyled 
              marginTop="26px" 
              onClick={handleLogin}
            >
              Entrar
            </PrimaryButtonStyled>
          </div>
        </div>
        <div
          style={{
            height: '100%',
            width: '100%',
            minWidth: '400px',
            maxWidth: '700px',
          }}
        >
          <img 
            src="https://igreja-vida-nova.s3.us-east-2.amazonaws.com/images/plano-fundo-login.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA36MICLYNS7EACPKE%2F20250608%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20250608T165944Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMiJHMEUCIQCE4aaX%2BzFTo7ignM7bBB5e6mBtpEyNbJdpXbdWxeXlNgIgFzjilZ5CsSfR6l8Zejkvwrb%2F%2Bz1Z8GRvxqEiQ4jARU8q3wIIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw4MjExNjA5OTIyODMiDAEqYRRIpMJDSXqHySqzAuyaTLJJXs%2BkQOMp0f0uB%2FsdLKiANBAVZ%2BUf99IeZMzvUMoFXmIr%2FrA1yJfnYRODJ%2FBp2XkQL80ecF9jZNFx22A6nsy2GEOWUaV4gRE86Og0ra9%2BlSvwiVxtKaNOJMfMjuOXLVAjLwbIQ67ouJFRV%2B%2BxhIQPV3asLSoMGUmgFiU9QgYO38QOmQZ4W711sYq%2BcQkRddqDBdFmvLpMEVz7o1v0bs1GWWNDOQux0f%2FG1LDCuqicU87mHhtvT5H96Udha2%2Bze%2FS3NBhbjNVKZ9ASJfjw3tp3%2FELGXQHyN2KL%2FnrFDSklxijeS2Pi8lheB%2B%2BX69QD5ekt3ojSJ9DPvwHEyDg3yfqJ0qFHDMsrvww1IhfyxHl9r9NiTBEX4zD7c6oOCuCBIkxpMktX%2F34GFjN4KFL0Lxswg46WwgY6rQKfgZ%2BwfImCfl%2BWD2EjUV2NqBpJDaUoVwwghROt893cEVaSaoYlR0eDS55N%2FdsRKjrJ%2FadwXxO2zZ0Scm8ms%2FUzshgMG2zmmqAkX%2BIoxMIpUH07cBzy30qbzkoOgGTCBy3P7BdeRezPX%2FP9%2F04pezYHqXWswyarJTP%2F3y4H38tOPVFQabopaKjBbDhqPSOBUredlVw%2FKUQom%2BdmsFK1sEwbLqvVTP293enbHiWJnMXlD7U7oRrR%2BEViH6kEbrjmCxFHblnDx4eOkm0uSgh%2BW3yL6Qo2K%2BrKwxwyK9zB7xBCC0bnrOxPeEq%2F4a5ZTVejCa1w0HbXB4t74WfUO2b8KMUUINugDPjincqj8GA23yv%2FO8a5ot8959f3wswPCEAbtfMLSRBY1sEQ1rnEjByj&X-Amz-Signature=bbc28ae9e93467de2a586dc63b4cebe9c42c0301fc6e5410afd693d80182c2c9&X-Amz-SignedHeaders=host&response-content-disposition=inline" 
            alt="Login" 
            style={{
              borderRadius: '40px'
            }} 
          />
        </div>
      </div>
    </>
  );
};

export default Login;
