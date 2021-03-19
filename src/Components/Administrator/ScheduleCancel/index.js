import { Button, Card } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import fireDb from "../../../firebase";
import image from "../../../images/adm.png";
import Adminstrador from "../index";
import { Container, Label, Line, Paragraph, SubTitle, Title } from "../styles";
function ScheduleCancel() {
  const [returnAdm, setReturnAdm] = useState(false);
  const [dataList, setDataList] = useState({});

  function returnPage() {
    setReturnAdm(!returnAdm);
  }

  useEffect(() => {
    fireDb.child("schedule").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setDataList({ ...snapshot.val() });
      }
    });
  }, []);

  return (
    <>
      {returnAdm === false ? (
        <div>
          <Container
            style={{
              backgroundImage: ` url(${image})`,
            }}
          >
            <Title> AREA ADMINISTRATIVA</Title>
          </Container>
          <Label>
            <Button
              style={{ borderRadius: 5, marginTop: 25 }}
              onClick={() => {
                returnPage();
              }}
              type="danger"
            >
              Voltar
            </Button>

            <SubTitle style={{ marginRight: 250 }}>
              {" "}
              LISTA DE AGENDAMENTOS CANCELADOS
            </SubTitle>
          </Label>
          <Paragraph>
            <Line></Line>
          </Paragraph>
          {Object.keys(dataList).map((id) => {
            if (dataList[id].status === "CANCELADO") {
              return (
                <>
                  <Paragraph style={{ color: "black" }}>
                    <Card>
                      <Label>
                        <p>
                          {" "}
                          Nome: {dataList[id].name} <br />
                          Placa do Veículo: {dataList[id].placa} / Motor:{" "}
                          {dataList[id].motor} <br />
                          Solicitação de Atendimento: {
                            dataList[id].atendimento
                          }{" "}
                          <br /> Data Solicitada: {dataList[id].date} <br />
                          Descrição Relatada: {dataList[id].descricao}
                          <br />
                          STATUS: {dataList[id].status}
                        </p>
                      </Label>
                    </Card>
                  </Paragraph>
                </>
              );
            } else {
              return null;
            }
          })}
        </div>
      ) : (
        <>
          <Adminstrador />
        </>
      )}
    </>
  );
}

export default ScheduleCancel;
