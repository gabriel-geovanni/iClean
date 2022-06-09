import styled from 'styled-components';
import themes from '../../themes';

export const Container = styled.div`
  width: 100vw;
  height: 100vmin;
  background-color: ${themes.colors.white};
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;

`;
export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;
export const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  height: 100%;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-bottom: 60px;
  position: absolute;
  right: 0;
`;
export const Diviser = styled.div`
  width: 100%;
  border: 2px solid #545454;
`;
export const Row = styled.div`
  display: flex;
  width: 100%;
  margin-top: -10px;
  justify-content: flex-end;
  margin-bottom: 30px;
  width: 500px;

`;

export const Touch = styled.button`
  box-shadow: 1px 2px 8px ${themes.colors.shadow};
  border-radius: 7px;
  padding: 10px 20px;
  width: 30%;
  background-color: ${themes.colors.blue};
  border: ${(props) => (props.error ? `2px solid ${themes.colors.red}` : 'none')};
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  color: ${themes.colors.white};
  text-align: center;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-bottom: 60px;

`;
export const CardContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
flex-direction: column;
`;
export const Card = styled.div`
  background-color: ${themes.colors.white};
  width: 35%;
  min-width: 500px;
  margin: 20px 0;
  padding: 20px 20px;
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-direction: column;
  box-shadow: 1px 2px 8px ${themes.colors.shadow};
`;

export const Text = styled.h3`
  font-size: 1.6rem;
  line-height: 1.7rem;
  color: ${themes.colors.black};
  margin-left: 5px;
`;
export const Info = styled.h3`
  font-size: 1.6rem;
  line-height: 1.7rem;

  color: ${themes.colors.black};
  font-weight: bold;
`;
export const InfoView = styled.div`
  display: flex;
  margin: 5px 0 ;

`;
export const ContentInput = styled.div`
width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 10px;
`;


export const Input = styled.input`
   line-height: 1.6rem;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 7px;
  padding: 15px 20px;
  width: 30%;
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


