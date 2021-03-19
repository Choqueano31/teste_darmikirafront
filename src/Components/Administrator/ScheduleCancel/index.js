import { Button, Card } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import fireDb from "../../../firebase";
import image from "../../../images/admin.jpg";
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
            <Title> ÁREA ADMINISTRATIVA</Title>
          </Container>
          <Label>
            <div>
              <Button
                style={{ borderRadius: 5, marginTop: 25 }}
                onClick={() => {
                  returnPage();
                }}
                type="danger"
              >
                Voltar
              </Button>
            </div>
            <div>
              <SubTitle style={{ marginLeft: 10 }}>
                {" "}
                LISTA DE AGENDAMENTOS CANCELADOS
              </SubTitle>
            </div>
            <div></div>
          </Label>
          <Paragraph>
            <Line></Line>
          </Paragraph>
          {Object.keys(dataList).map((id) => {
            if (dataList[id].status === "CANCELADO") {
              return (
                <>
                  <Paragraph style={{ color: "black" }}>
                    <Card style={{ width: 700 }}>
                      <Label>
                        <div style={{ width: "60%" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                            }}
                          >
                            <p style={{ fontWeight: "bold" }}>Nome: </p>
                            {"  "}
                            <p style={{ marginLeft: 10 }}>
                              {" "}
                              {dataList[id].name}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                            }}
                          >
                            <p style={{ fontWeight: "bold" }}>Placa: </p>
                            {"  "}
                            <p style={{ marginLeft: 10 }}>
                              {" "}
                              {dataList[id].placa}
                            </p>
                            <p style={{ marginLeft: 10 }}></p>
                            <p style={{ fontWeight: "bold" }}> Motor: </p>
                            {"  "}
                            <p style={{ marginLeft: 10 }}>
                              {" "}
                              {dataList[id].motor}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                            }}
                          >
                            <p style={{ fontWeight: "bold" }}>
                              Tipo de Atendimento:{" "}
                            </p>
                            {"  "}
                            <p style={{ marginLeft: 10 }}>
                              {" "}
                              {dataList[id].atendimento}
                            </p>
                          </div>{" "}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                            }}
                          >
                            <p style={{ fontWeight: "bold" }}>
                              Data de Atendimento:{" "}
                            </p>
                            {"  "}
                            <p style={{ marginLeft: 10 }}>
                              {" "}
                              {dataList[id].date}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                            }}
                          >
                            <p style={{ fontWeight: "bold" }}>Motivo: </p>
                            {"  "}
                            <p style={{ marginLeft: 10 }}>
                              {" "}
                              {dataList[id].descricao}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                            }}
                          >
                            <p style={{ fontWeight: "bold" }}>Status: </p>
                            {"  "}
                            <p style={{ marginLeft: 10 }}>
                              {" "}
                              {dataList[id].status}
                            </p>
                          </div>
                        </div>
                        {/* <p>
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
                        </p> */}
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
