import React, { useState } from "react";
import { Button, Col, Input, Row, Select } from "antd";
import "antd/dist/antd.css";
import {
  Column,
  Container,
  Label,
  Line,
  Paragraph,
  Title,
} from "../Administrator/styles";
import image from "../../images/adm.png";
import ScheduleList from "../Administrator/ScheduleList";
import ServiceType from "./ServiceType";
function Adminstrador() {
  const [schedulePage, setSchedulePage] = useState(false);
  const [servicePage, setServicePage] = useState(false);
  function scheduleSet() {
    setSchedulePage(!schedulePage);
  }
  function serviceSet() {
    setServicePage(!servicePage);
  }
  return (
    <>
      {schedulePage === false ? (
        <div>
          {servicePage === false ? (
            <div>
              <Container
                style={{
                  backgroundImage: ` url(${image})`,
                }}
              >
                <Title> AREA ADMINISTRATIVA</Title>
              </Container>
              <Paragraph>
                {" "}
                Area destinada para Criar, Alterar ou Excluir os tipos de
                Atendimentos,além de Visualizar os Agendamentos cadastrados para
                que após feito o serviço, mudar seu status para Finalizado ou
                Cancelado de acordo com o pedido.
              </Paragraph>
              <h4
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 30,
                }}
              >
                {" "}
                ESCOLHA A OPÇÃO AO QUAL DESEJA PRESTAR ATENDIMENTO
              </h4>
              <Paragraph>
                <Line></Line>
              </Paragraph>

              <Column>
                <Button
                  style={{ borderRadius: 5, width: 250 }}
                  onClick={() => {
                    serviceSet();
                  }}
                  type="primary"
                >
                  Criar/Visualizar Atendimentos
                </Button>
                <Button
                  style={{
                    borderRadius: 5,
                    width: 250,
                    marginTop: 30,
                    backgroundColor: "green",
                    color: "white",
                  }}
                  onClick={() => {
                    scheduleSet();
                  }}
                >
                  Visualizar Agendamentos
                </Button>
              </Column>

              <Label />
              <Label />
            </div>
          ) : (
            <>
              <ServiceType />
            </>
          )}
        </div>
      ) : (
        <>
          <ScheduleList />
        </>
      )}
    </>
  );
}

export default Adminstrador;
