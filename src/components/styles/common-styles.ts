import styled from "styled-components";

export const Home = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  color: #3e2723;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.label`
  display: flex;
  width: 85%;
  margin-bottom: 8px;
  font-weight: bold;

  > .required {
    color: red;
  }
`;

export const Input = styled.input`
  line-height: 2.5;
  border-radius: 5px;
  border: 0;
  width: 85%;
  background-color: #EEDDF1;
  font-size: 14px;

  &:hover {
    background-color: white;
  }

  &:focus {
    outline: none;
  }
`;
