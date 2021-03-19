import { Button, Card, Modal, notification } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import fireDb from "../../../firebase";
import image from "../../../images/adm.png";
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

                    <SubTitle> LISTAR TIPOS DE ATENDIMENTOS</SubTitle>
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
                  {Object.keys(dataList).map((id) => {
                    return (
                      <>
                        <Paragraph style={{ color: "black" }}>
                          <Card>
                            <Label>
                              <p>
                                {" "}
                                Nome do Atendimento: {dataList[id].name} <br />
                                Descrição do Atendimento:{" "}
                                {dataList[id].descricao} <br />
                                Data de Criação: {dataList[id].data} <br />
                                Preço Base: {dataList[id].preco}
                              </p>
                              <Button
                                style={{
                                  borderRadius: 5,
                                  marginLeft: 10,
                                  marginTop: 30,
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
                                  borderRadius: 5,
                                  marginLeft: 10,
                                  marginTop: 30,
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
                            </Label>
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
