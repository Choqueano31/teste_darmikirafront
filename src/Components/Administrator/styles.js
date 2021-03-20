import styled from "styled-components";

export const Container = styled.div`
  background: "#000";
  height: 500px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-width: 100%;
  min-height: 100%;
  background-size: cover;
  background-position: center;
`;
export const Title = styled.h1`
  color: white;
  text-shadow: black 0.2em 0.1em 0.2em;
  margin-bottom: 100px;
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

export const List = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  border: 2px solid powderblue;
  border-radius: 2px;
  padding: 5px;
`;

export const Column = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
`;
export const ButtonGreen = styled.button`
  border-radius: 5px;
  width: 300px;
  height: 30px;
  margin-top: 30px;
  background-color: #28c86a;
  color: white;
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: green;
    /* color: #010606; */
    color: #fff;
  }
`;
export const ButtonBlue = styled.button`
  border-radius: 5px;
  width: 300px;
  height: 30px;
  margin-top: 30px;
  background-color: #2f66fa;
  color: white;
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: blue;
    color: #fff;
  }
`;
export const ButtonRed = styled.button`
  border-radius: 5px;
  width: 300px;
  height: 30px;
  margin-top: 30px;
  background-color: #e72929;
  color: white;
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: red;
    color: #fff;
  }
`;
export const SubTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  font-weight: bold;
  font-size: 15px;
`;
