import styled from 'styled-components';
import themes from '../../themes';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${themes.colors.blue};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

export const CardLogin = styled.div`
  background-color: ${themes.colors.white};
  width: 500px;
  padding: 20px 0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  box-shadow: 0 2px 4px #545454;
`;

export const Row = styled.div`
  display: flex;
  width: 500px;
justify-content: space-evenly;
`;

export const Touch = styled.button`
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 7px;
  padding: 10px 20px;
  width: 35%;
  background-color: ${(props) => (props.active ? themes.colors.blue : themes.colors.white)};
  border: ${(props) => (props.error ? `2px solid ${themes.colors.red}` : 'none')};
`;

export const ContentInput = styled.div`
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 40px;
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  color: ${(props) => (props.active ? themes.colors.white : themes.colors.black)};
  text-align: center;
`;
export const Input = styled.input`
   line-height: 1.6rem;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 7px;
  padding: 15px 20px;
  width: 80%;
  color: ${themes.colors.text};
  border: ${(props) => (props.error ? `2px solid ${themes.colors.red}` : 'none')};
  font-weight: 400;
  font-size: 1.4rem;
  margin-top: 10px;

  :focus {
    outline-color: ${(props) => (props.error ? themes.colors.red : themes.colors.blue)};
  }

`;
export const InputPass = styled.input`
margin-top: 10px;
  line-height: 1.6rem;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 7px;
  padding: 15px 20px;
  width: 80%;
  color: ${themes.colors.text};
  border: ${(props) => (props.error ? `2px solid ${themes.colors.red}` : 'none')};
  font-weight: 400;
  font-size: 1.4rem;

  :focus {
    outline-color: ${(props) => (props.error ? themes.colors.red : themes.colors.blue)};
  }

`;

export const Button = styled.button`
  background-color: ${themes.colors.blue};
  border-radius: 8px;
  height: 40px;
  width: 80%;
  box-shadow: 0 2px 4px #545454;
`;

export const TextButton = styled.h3`
  font-size: 1.6rem;
  color: ${themes.colors.white};
  text-align: center;
`;
