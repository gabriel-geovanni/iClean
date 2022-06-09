import { createGlobalStyle } from 'styled-components';
import themes from '../themes';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Baloo da 2';
    font-weight: 400;
    :focus {
      outline-color: ${themes.colors.blue};
    }
  }
  html{
    font-size: 10px;
    line-height: 12px;
    background: ${themes.colors.background};
  }
  h1{
  }

`;
