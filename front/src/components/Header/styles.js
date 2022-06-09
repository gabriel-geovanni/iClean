import styled from 'styled-components';
import themes from '../../themes';

export const Container = styled.div`
  width: 100vw;
  min-height: 100px;
  box-shadow: 0 2px 4px ${themes.colors.shadow};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${themes.colors.white};
  padding: 0 20px;
  z-index: 10;
`;


export const Title = styled.h1`
  font-size: 5rem;
  line-height: 5rem;
  margin-top: 7px;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  vertical-align: bottom;
  color:${themes.colors.title};
  h3{
    color:${themes.colors.blue};
  }
  `;
