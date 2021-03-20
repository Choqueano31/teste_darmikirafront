import { Button, Card, Modal, notification } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import fireDb from "../../../firebase";
import image from "../../../images/page2.jpeg";
import Adminstrador from "../index";
import { Container, Label, Line, Paragraph, SubTitle, Title } from "../styles";
import ServiceCreate from "./ServiceCreate";
import ServiceUpdate from "./ServiceUpdate";
function ServiceType(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [returnAdm, setReturnAdm] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [pageEdit, setPageEdit] = useState(false);
  const [info, setInfo] = useState("");
  const [infoId, setInfoId] = useState("");
  const [dataList, setDataList] = useState({});
  const openNotificationWithIcon = (type) => {
    if (type === "error") {
      notification[type]({
        message: "Não foi Possível Concluir",
        description:
          " Verifique sua conexão com a Internet e tente novamente. ",
      });
    } else {
      notification[type]({
        message: "Tipo de Atendimento Removido com Sucesso",
      });
    }
  };
  async function onDelete() {
    try {
      await fireDb.child(`service/${infoId}`).remove((err) => {
        if (err) {
          console.log(err);
        }
      });
      openNotificationWithIcon("success");
    } catch {
      openNotificationWithIcon("error");
    }
  }
  useEffect(() => {
    fireDb.child("service").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setDataList({ ...snapshot.val() });
      }
    });
  }, []);
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
                    onOk={() => {
                      onDelete();
                      showModal();
                    }}
                    onCancel={() => {
                      showModal();
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
                    <Button
                      style={{ borderRadius: 5, marginTop: 30 }}
                      onClick={() => {
                        returnPage();
                      }}
                      type="danger"
                    >
                      Voltar
                    </Button>

                    <SubTitle style={{ marginLeft: 10 }}>
                      {" "}
                      LISTAR TIPOS DE ATENDIMENTOS
                    </SubTitle>
                    <Button
                      style={{ borderRadius: 5, marginTop: 30 }}
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
                  {Object.keys(dataList).map((id) => {
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
                              <div>
                                <p style={{ fontWeight: "bold" }}>
                                  Nome do Atendimento:{" "}
                                </p>
                                {"  "}
                                <p style={{ marginLeft: 10 }}>
                                  {" "}
                                  {dataList[id].name}
                                </p>
                              </div>
                              <div>
                                <p style={{ fontWeight: "bold" }}>
                                  Descrição do Atendimento:{" "}
                                </p>
                                {"  "}
                                <p style={{ marginLeft: 10 }}>
                                  {" "}
                                  {dataList[id].descricao}
                                </p>
                              </div>
                              <div>
                                <p style={{ fontWeight: "bold" }}>
                                  Preço Base:{" "}
                                </p>
                                {"  "}
                                <p style={{ marginLeft: 10 }}>
                                  {" "}
                                  R$ {dataList[id].preco}
                                </p>
                              </div>
                              <div>
                                <p style={{ fontWeight: "bold" }}>
                                  Data de Criação:{" "}
                                </p>
                                {"  "}
                                <p style={{ marginLeft: 10 }}>
                                  {" "}
                                  R$ {dataList[id].data}
                                </p>
                              </div>
                            </div>

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
                                  setInfo(dataList[id]);
                                  setInfoId(id);
                                  showPageEdit();
                                }}
                                type="primary"
                              >
                                Editar
                              </Button>
                              <Button
                                style={{
                                  width: 100,
                                  borderRadius: 5,
                                  marginLeft: 10,
                                }}
                                onClick={() => {
                                  // setInfo(dataList[id]);
                                  setInfoId(id);

                                  showModal();
                                }}
                                type="danger"
                              >
                                Excluir
                              </Button>
                            </div>
                          </Card>
                        </Paragraph>
                      </>
                    );
                  })}
                </div>
              ) : (
                <>
                  <ServiceUpdate info={info} infoId={infoId} />
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
