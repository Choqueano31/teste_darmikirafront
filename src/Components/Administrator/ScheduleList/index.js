import { Button, Card, Modal, notification } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import fireDb from "../../../firebase";
import image from "../../../images/page2.jpg";
import Adminstrador from "../index";
import { Container, Label, Line, Paragraph, SubTitle, Title } from "../styles";
function ScheduleList() {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [returnAdm, setReturnAdm] = useState(false);
  const [dataList, setDataList] = useState({});
  const [saveInfo, setSaveInfo] = useState({});
  const [saveId, setSaveId] = useState("");
  function returnPage() {
    setReturnAdm(!returnAdm);
  }
  const openNotificationWithIcon = (type) => {
    if (type === "error") {
      notification[type]({
        message: "Não foi Possível Concluir",
        description:
          " Verifique sua conexão com a Internet e tente novamente. ",
      });
    } else {
      notification[type]({
        message: "Agendamento Finalizado com Sucesso",
        description: " aguarde, enquanto você será redirecionado ",
      });
    }
  };
  const openNotificationWithIcon2 = (type) => {
    if (type === "error") {
      notification[type]({
        message: "Não foi Possível Concluir",
        description:
          " Verifique sua conexão com a Internet e tente novamente. ",
      });
    } else {
      notification[type]({
        message: "Agendamento Cancelado com Sucesso",
        description: " aguarde, enquanto você será redirecionado ",
      });
    }
  };
  async function finish() {
    try {
      await fireDb.child(`schedule/${saveId}`).set(
        {
          motor: saveInfo.motor,
          placa: saveInfo.placa,
          name: saveInfo.name,
          atendimento: saveInfo.atendimento,
          descricao: saveInfo.descricao,
          date: saveInfo.date,
          status: "FINALIZADO",
        },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
      openNotificationWithIcon("success");
      setTimeout(() => {
        returnPage();
      }, 1000);
    } catch {
      openNotificationWithIcon("error");
    }
  }
  async function cancel() {
    try {
      await fireDb.child(`schedule/${saveId}`).set(
        {
          motor: saveInfo.motor,
          placa: saveInfo.placa,
          name: saveInfo.name,
          atendimento: saveInfo.atendimento,
          descricao: saveInfo.descricao,
          date: saveInfo.date,
          status: "CANCELADO",
        },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
      openNotificationWithIcon2("success");
      setTimeout(() => {
        returnPage();
      }, 1000);
    } catch {
      openNotificationWithIcon2("error");
    }
  }
  useEffect(() => {
    fireDb.child("schedule").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setDataList({ ...snapshot.val() });
      }
    });
  }, []);

  function showModal(set) {
    if (set === 1) {
      setModalVisible1(!modalVisible1);
    } else if (set === 2) {
      setModalVisible2(!modalVisible2);
    }
  }
  return (
    <>
      {returnAdm === false ? (
        <div>
          <Modal
            title="Deseja Finalizar este Agendamento?"
            visible={modalVisible1}
            onOk={() => {
              finish();
              showModal(1);
            }}
            onCancel={() => {
              showModal(1);
            }}
          ></Modal>
          <Modal
            title="Deseja Cancelar esse Agendamento?"
            visible={modalVisible2}
            onOk={() => {
              cancel();
              showModal(2);
            }}
            onCancel={() => {
              showModal(2);
            }}
          ></Modal>
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
                LISTA DE AGENDAMENTOS
              </SubTitle>
            </div>{" "}
            <div></div>
          </Label>
          <Paragraph>
            <Line></Line>
          </Paragraph>
          {Object.keys(dataList).map((id) => {
            if (dataList[id].status === "AGENDADO") {
              return (
                <>
                  <Paragraph style={{ color: "black" }}>
                    <Card style={{ width: 700 }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <p style={{ fontWeight: "bold" }}>Nome: </p>
                          {"  "}
                          <p style={{ marginLeft: 10 }}> {dataList[id].name}</p>
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
                          <p style={{ marginLeft: 10 }}> {dataList[id].date}</p>
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          style={{
                            width: 100,
                            borderRadius: 5,
                            marginLeft: 10,
                          }}
                          onClick={() => {
                            showModal(1);
                            setSaveId(id);
                            setSaveInfo(dataList[id]);
                          }}
                          type="primary"
                        >
                          Finalizar
                        </Button>
                        <Button
                          style={{
                            width: 100,
                            borderRadius: 5,
                            marginLeft: 10,
                          }}
                          onClick={() => {
                            showModal(2);
                            setSaveId(id);
                            setSaveInfo(dataList[id]);
                          }}
                          type="danger"
                        >
                          Cancelar
                        </Button>
                      </div>
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

export default ScheduleList;
