import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  
  header {
    display: flex;
    align-self: center
    align-items: center;
    padding-bottom: 100px;

    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      collor: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      color: #f64c75;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0);
      margin: 10px 0 20px;
    }

    button {
      width: 200px;
      margin: 5px 200px 0;
      height: 44px;
      background: #32CD32;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.3s;

      &:hover {
        background: ${darken(0.2, '#32CD32')};
      }
    }
  
`;
