import { Button } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import image from "../../images/page2.jpg";
import ScheduleList from "../Administrator/ScheduleList";
import {
  ButtonGreen,
  ButtonBlue,
  ButtonRed,
  Column,
  Container,
  Label,
  Line,
  Paragraph,
  Title,
} from "../Administrator/styles";
import ScheduleCancel from "./ScheduleCancel";
import ScheduleFinished from "./ScheduleFinished";
import ServiceType from "./ServiceType";
function Adminstrador() {
  const [schedulePage, setSchedulePage] = useState(false);
  const [scheduleFinished, setScheduleFinished] = useState(false);
  const [scheduleCancel, setScheduleCancel] = useState(false);
  const [servicePage, setServicePage] = useState(false);
  function scheduleSet() {
    setSchedulePage(!schedulePage);
  }
  function scheduleCancelSet() {
    setScheduleCancel(!scheduleCancel);
  }
  function scheduleFinishedSet() {
    setScheduleFinished(!scheduleFinished);
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
              {scheduleFinished === false ? (
                <div>
                  {scheduleCancel === false ? (
                    <div>
                      <Container
                        style={{
                          backgroundImage: ` url(${image})`,
                        }}
                      >
                        <Title> ÁREA ADMINISTRATIVA</Title>
                      </Container>
                      <Paragraph>
                        {" "}
                        Área destinada para Criar, Alterar ou Excluir os tipos
                        de Atendimentos,além de Visualizar os Agendamentos
                        cadastrados para que após feito o serviço, mudar seu
                        status para Finalizado ou Cancelado de acordo com o
                        pedido.
                      </Paragraph>
                      <h4
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: 30,
                        }}
                      >
                        {" "}
                        ESCOLHA A OPÇÃO A QUAL DESEJA PRESTAR ATENDIMENTO
                      </h4>
                      <Paragraph>
                        <Line></Line>
                      </Paragraph>

                      <Column>
                        <Button
                          style={{ borderRadius: 5, width: 300 }}
                          onClick={() => {
                            serviceSet();
                          }}
                          type="primary"
                        >
                          Criar/Visualizar Tipos de Atendimentos
                        </Button>
                        <ButtonGreen
                          onClick={() => {
                            scheduleSet();
                          }}
                        >
                          {" "}
                          Visualizar Agendamentos
                        </ButtonGreen>
                        {/* <Button
                          style={{
                            borderRadius: 5,
                            width: 300,
                            marginTop: 30,
                            backgroundColor: " #28c86a  ",
                            color: "white",
                          }}
                          onClick={() => {
                            scheduleSet();
                          }}
                        >
                          Visualizar Agendamentos
                        </Button>{" "} */}
                        <ButtonBlue
                          onClick={() => {
                            scheduleFinishedSet();
                          }}
                        >
                          Agendamentos Finalizados
                        </ButtonBlue>
                        {/* <Button
                          style={{
                            borderRadius: 5,
                            width: 300,
                            marginTop: 30,
                            backgroundColor: " #2f66fa ",
                            color: "white",
                          }}
                          onClick={() => {
                            scheduleFinishedSet();
                          }}
                        >
                         
                        </Button>{" "} */}
                        <ButtonRed
                          onClick={() => {
                            scheduleCancelSet();
                          }}
                        >
                          Agendamentos Cancelados
                        </ButtonRed>
                        {/* <Button
                          style={{
                            borderRadius: 5,
                            width: 300,
                            marginTop: 30,
                            backgroundColor: "  #e72929  ",
                            color: "white",
                          }}
                          onClick={() => {
                            scheduleCancelSet();
                          }}
                        >
                          Agendamentos Cancelados
                        </Button> */}
                      </Column>

                      <Label />
                      <Label />
                    </div>
                  ) : (
                    <>
                      <ScheduleCancel />
                    </>
                  )}
                </div>
              ) : (
                <>
                  <ScheduleFinished />
                </>
              )}
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
