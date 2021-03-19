import styled from "styled-components";

export const Container = styled.div`
  background: "#000";
  height: 500px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  /* position: fixed; */
  min-width: 100%;
  min-height: 100%;
  background-size: cover;
  background-position: center;
`;
export const Title = styled.h1`
  color: white;
  text-shadow: black 0.1em 0.1em 0.2em;
`;
export const Paragraph = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-left: 10px;
`;

export const Form = styled.div`
  border: 2px solid powderblue;
  border-radius: 2px;
  padding: 30px;
`;

export const Line = styled.div`
  border: 5px solid #256ce1;
  color: #fff;
  background-color: #fff;
  margin-top: 10px;
  width: 70%;
`;
export const Label = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`;
export const SubTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  font-weight: bold;
  font-size: 15px;
`;
