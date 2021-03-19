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
import ServiceCreate from "./ServiceCreate";
import ServiceUpdate from "./ServiceUpdate";
function ServiceType(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [returnAdm, setReturnAdm] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [pageEdit, setPageEdit] = useState(false);
  const [info, setInfo] = useState("");
  const success = () => {
    message.success("Tipo");
  };

  const error = () => {
    message.error("Algo deu erado");
  };
  function returnPage() {
    setReturnAdm(!returnAdm);
  }
  function next() {
    setNextPage(!nextPage);
  }
  function showPageEdit() {
    if (info !== "") {
      setPageEdit(!pageEdit);
    } else {
      setTimeout(() => {
        setPageEdit(!pageEdit);
      }, 1000);
    }
  }
  function showModal() {
    setModalVisible(!modalVisible);
  }
  const data = [
    {
      id: 1,
      nome: "Limpeza de Motor",
      descricao: "Limpeza de Cabeçotes",
      Preco: "250,00",
      Data: "25/02/2020",
    },
    {
      id: 2,
      nome: "Limpeza de vidro",
      descricao: "Limpeza de Cabeçotes",
      Preco: "250,00",
      Data: "25/02/2020",
    },
    {
      id: 3,
      nome: "Limpeza de parachoque",
      descricao: "Limpeza de Cabeçotes",
      Preco: "250,00",
      Data: "25/02/2020",
    },
  ];
  return (
    <>
      {returnAdm === false ? (
        <div>
          {nextPage === false ? (
            <div>
              {pageEdit === false ? (
                <div>
                  <Modal
                    title="Deseja Excluir esse tipo de atendimento?"
                    visible={modalVisible}
                    onOk={() => {}}
                    onCancel={() => {
                      showModal();
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

                    <SubTitle> LISTA DE ATENDIMENTOS</SubTitle>
                    <Button
                      style={{ borderRadius: 5, marginTop: 25 }}
                      onClick={() => {
                        next();
                      }}
                      type="primary"
                    >
                      Criar
                    </Button>
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
                                Nome do Atendimento: {item.nome} <br />
                                Descrição do Atendimento: {item.descricao}{" "}
                                <br /> Data de Criação: {item.data} <br />
                                Preço Base: {item.preco}
                              </p>
                              <Button
                                style={{
                                  borderRadius: 5,
                                  marginLeft: 10,
                                  marginTop: 30,
                                }}
                                onClick={() => {
                                  setInfo(info);
                                  showPageEdit();
                                }}
                                type="primary"
                              >
                                Editar
                              </Button>
                              <Button
                                style={{
                                  borderRadius: 5,
                                  marginLeft: 10,
                                  marginTop: 30,
                                }}
                                onClick={() => {
                                  showModal();
                                }}
                                type="danger"
                              >
                                Excluir
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
                  <ServiceUpdate info={info} />
                </>
              )}
            </div>
          ) : (
            <>
              <ServiceCreate />
            </>
          )}
        </div>
      ) : (
        <>
          <Adminstrador />
        </>
      )}
    </>
  );
}

export default ServiceType;
