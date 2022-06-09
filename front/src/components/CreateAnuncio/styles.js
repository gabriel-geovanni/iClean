import styled from 'styled-components';
import themes from '../../themes';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
  display: flex;
  padding-top: 40px;
`;

export const Card = styled.div`
  width: 600px;
  padding: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  box-shadow: 0 2px 8px ${themes.colors.shadow};
  flex-direction: column;
  border-radius: 8px;
`;


export const ContentInput = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 40px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: ${(props) => (props.active ? themes.colors.white : themes.colors.black)};
  text-align: center;
`;
export const Input = styled.input`
   line-height: 1.6rem;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 7px;
  padding: 15px 20px;
  width: 100%;
  color: ${themes.colors.text};
  border: ${(props) => (props.error ? `2px solid ${themes.colors.red}` : 'none')};
  font-weight: 400;
  font-size: 1.4rem;
  margin-top: 10px;

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
