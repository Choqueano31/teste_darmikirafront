import React from "react";
import { Container, Paragraph, Title } from "./styles";
import image from "../../images/agenda.webp";
function Visitors() {
  return (
    <>
      <Container
        style={{
          backgroundImage: ` url(${image})`,
        }}
      >
        <Title> AGENDAMENTO ONLINE</Title>
      </Container>
      <Paragraph>
        {" "}
        Para Marcar seu Agendamento conosco, preencha os campos abaixo
      </Paragraph>
      <Container>
        <div>
          <p> teste</p>
        </div>
      </Container>
    </>
  );
}

export default Visitors;
