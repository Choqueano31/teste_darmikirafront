import { Button, Input, notification } from "antd";
import "antd/dist/antd.css";
import { useFormik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import fireDb from "../../../../firebase";
import image from "../../../../images/admin.jpg";
import {
  Container,
  Label,
  Line,
  Paragraph,
  SubTitle,
  Title,
} from "../../styles";
import ServiceType from "../index";
const validate = (values) => {
  const errors = {};

  if (!values.nome) {
    errors.nome = <p style={{ color: "red" }}>Obrigatório</p>;
  }
  if (!values.descricao) {
    errors.descricao = <p style={{ color: "red" }}>Obrigatório</p>;
  }

  if (!values.preco) {
    errors.preco = <p style={{ color: "red" }}>Obrigatório</p>;
  }

  return errors;
};

function ServiceCreate(props) {
  const [returnAdm, setReturnAdm] = useState(false);

  const openNotificationWithIcon = (type) => {
    if (type === "error") {
      notification[type]({
        message: "Não foi Possível Concluir",
        description:
          " Verifique sua conexão com a Internet e tente novamente. ",
      });
    } else {
      notification[type]({
        message: "Tipo de Atendimento Realizado com Sucesso",
        description: " aguarde, enquanto você será redirecionado ",
      });
    }
  };

  function returnPage() {
    setReturnAdm(!returnAdm);
  }

  const formik = useFormik({
    initialValues: {
      nome: "",
      descricao: "",
      preco: "",
      data: moment(new Date()).format("DD/MM/YYYY"),
      // data: String(date),
    },

    validate,

    onSubmit: (values) => {
      try {
        fireDb.child("service").push(
          {
            name: values.nome,
            descricao: values.descricao,
            preco: values.preco,
            data: moment(new Date()).format("DD/MM/YYYY"),
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
    },
  });

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
          <SubTitle> CRIAÇÃO DE NOVO TIPO DE ATENDIMENTO</SubTitle>
          <Paragraph>
            <Line></Line>
          </Paragraph>
          <form onSubmit={formik.handleSubmit}>
            <Label>
              <p>Informe o Nome do Atendimento</p>
              <div>
                <Input
                  id="nome"
                  name="nome"
                  style={{ width: 200, marginLeft: 5 }}
                  placeholder="Nome do Atendimento"
                  type="text"
                  inputMode="text"
                  onChange={formik.handleChange}
                  value={formik.values.nome}
                />
                {formik.errors.nome ? (
                  <div style={{ marginLeft: 10 }}>{formik.errors.nome}</div>
                ) : null}
              </div>
            </Label>{" "}
            <Label>
              <p>Informe a descrição do atendimento</p>
              <div>
                <Input
                  id="descricao"
                  name="descricao"
                  style={{ width: 200, marginRight: 10 }}
                  placeholder="Descrição do Atendimento"
                  type="text"
                  inputMode="text"
                  onChange={formik.handleChange}
                  value={formik.values.descricao}
                />
                {formik.errors.descricao ? (
                  <div style={{ marginLeft: 5 }}>{formik.errors.descricao}</div>
                ) : null}
              </div>
            </Label>{" "}
            <Label>
              <p>Informe o Preço Base</p>
              <div>
                <Input
                  id="preco"
                  name="preco"
                  type="number"
                  placeholder="Insira o Valor"
                  style={{ width: 200, marginLeft: 80 }}
                  onChange={formik.handleChange}
                  value={formik.values.preco}
                />
                {formik.errors.preco ? (
                  <div style={{ marginLeft: 85 }}>{formik.errors.preco}</div>
                ) : null}
              </div>
            </Label>
            <Label />
            <Label />
            <Label>
              <Button
                style={{ borderRadius: 5, width: 160 }}
                onClick={() => {
                  returnPage();
                }}
                type="danger"
              >
                Voltar
              </Button>
              {/* <Button
                style={{ borderRadius: 5, width: 160 }}
                onClick={() => {}}
                type="primary"
              >
                Criar Atendimento
              </Button> */}
              <button
                style={{
                  borderRadius: 5,
                  width: 200,
                  backgroundColor: "blue",
                  color: "white",
                  cursor: "pointer",
                }}
                type="submit"
              >
                Criar Atendimento
              </button>
            </Label>
            <Label />
          </form>
        </div>
      ) : (
        <>
          <ServiceType />
        </>
      )}
    </>
  );
}

export default ServiceCreate;
