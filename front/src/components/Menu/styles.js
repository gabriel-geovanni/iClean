import styled from 'styled-components';
import themes from '../../themes';

export const Container = styled.div`
  width: 30%;
  margin-top: -100px;
  min-height: 100vh;
  padding-top: 140px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${themes.colors.primary}50;
  position: fixed;
  z-index: 5;
`;

export const Touch = styled.button`
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 7px;
  padding: 15px 20px;
  width: 90%;
  margin-bottom: 20px;
  background-color: ${(props) => (props.active ? themes.colors.blue : themes.colors.white)};
  border: ${(props) => (props.error ? `2px solid ${themes.colors.red}` : 'none')};
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  color: ${(props) => (props.active ? themes.colors.white : themes.colors.black)};
  text-align: center;
`;

export const Diviser = styled.div`
  border: 2px solid ${themes.colors.black};
  width: 90%;
  margin: 10px 0;
  margin-bottom: 25px;
`;
