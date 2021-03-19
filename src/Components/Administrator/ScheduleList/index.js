import React, { useState } from "react";
import { Button, Col, Input, Row, Select, Card, Modal, message } from "antd";

import "antd/dist/antd.css";
import {
  Column,
  Container,
  Label,
  Line,
  List,
  Paragraph,
  SubTitle,
  Title,
} from "../styles";
import image from "../../../images/adm.png";
import Adminstrador from "../index";
function ScheduleList(props) {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [returnAdm, setReturnAdm] = useState(false);
  const success = () => {
    message.success("Tipo");
  };

  const error = () => {
    message.error("This is an error message");
  };
  const data = [
    {
      id: 1,
      nome: "Rafael de Almeida Tavares",
      Placa: "qye-6580",
      motor: "1.0",
      atendimento: "trocar oleo",
      descricao: "testando",
      data: "20/02/2020",
    },
    {
      id: 2,
      nome: "joao ",
      Placa: "qye-6580",
      motor: "1.0",
      atendimento: "trocar oleo",
      descricao: "testando",
      data: "20/02/2020",
    },
    {
      id: 3,
      nome: "jose",
      Placa: "qye-6580",
      motor: "1.0",
      atendimento: "trocar oleo",
      descricao: "testando",
      data: "20/02/2020",
    },
  ];
  function returnPage() {
    setReturnAdm(!returnAdm);
  }
  function showModal(set) {
    console.log(set);
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
            onOk={() => {}}
            onCancel={() => {
              showModal(1);
            }}
          >
            <p>Some contents...</p>
          </Modal>
          <Modal
            title="Deseja Cancelar esse Agendamento?"
            visible={modalVisible2}
            onOk={() => {}}
            onCancel={() => {
              showModal(2);
            }}
          >
            <p>Some contents...</p>
          </Modal>
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
              LISTA DE AGENDAMENTOS
            </SubTitle>
          </Label>
          <Paragraph>
            <Line></Line>
          </Paragraph>

          {data.map((item) => {
            const info = item;
            return (
              <>
                <Paragraph style={{ color: "black" }}>
                  <Card>
                    <Label>
                      <p>
                        {" "}
                        Nome: {item.nome} <br />
                        Placa do Veículo: {item.Placa} Motor: {item.motor}{" "}
                        <br />
                        Solicitação de Atendimento: {
                          item.atendimento
                        } <br /> Data Solicitada: {item.data} <br />
                        Descrição Relatada: {item.descricao}
                      </p>
                      <Button
                        style={{
                          borderRadius: 5,
                          marginLeft: 10,
                          marginTop: 40,
                        }}
                        onClick={() => {
                          showModal(1);
                        }}
                        type="primary"
                      >
                        Finalizar
                      </Button>
                      <Button
                        style={{
                          borderRadius: 5,
                          marginLeft: 10,
                          marginTop: 40,
                        }}
                        onClick={() => {
                          showModal(2);
                        }}
                        type="danger"
                      >
                        Cancelar
                      </Button>
                    </Label>
                  </Card>
                </Paragraph>
              </>
            );
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
