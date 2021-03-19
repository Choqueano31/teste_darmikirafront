import { Button, DatePicker, Input, Select, message, notification } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Label, Line, Paragraph, Container, Title } from "../styles";
import image from "../../../images/agenda.webp";
import Visitors from "../step1";
import { SubTitle } from "../../Administrator/styles";
const validate = (values) => {
  const errors = {};

  console.log(values);
  if (!values.atendimento) {
    errors.atendimento = <p style={{ color: "red" }}>obrigatório</p>;
  }
  if (!values.descricao) {
    errors.descricao = <p style={{ color: "red" }}>obrigatório</p>;
  }

  // if (!values.data) {
  //   errors.data = <p style={{ color: "red" }}>obrigatório</p>;
  // }

  return errors;
};

function VisitorsStep2({ name, placa, motor }) {
  const [name1] = useState(name);
  const [placa1] = useState(placa);
  const [motor1] = useState(motor);
  const [date, setDate] = useState("");
  const [returnPage, setReturnPage] = useState(false);
  function previous() {
    setReturnPage(!returnPage);
  }
  const openNotificationWithIcon = (type) => {
    if (type === "error") {
      notification[type]({
        message: "Não foi Possível prosseguir",
        description: " preencha o campo Data de Agendamento ",
      });
    } else {
      notification[type]({
        message: "Agendamento Realizado com Sucesso",
        description: " Aguarde, em pouco tempo entraremos em contato com você ",
      });
    }
  };
  const teste = [
    { value: "1", label: "teste" },
    { value: "1", label: "teste3" },
    { value: "1", label: "teste4" },
  ];
  const formik = useFormik({
    initialValues: {
      atendimento: "",
      descricao: "",

      // data: String(date),
    },

    validate,

    onSubmit: (values) => {
      if (date !== "") {
        alert(JSON.stringify(values, null, 2));
        openNotificationWithIcon("success");
      } else {
        openNotificationWithIcon("error");
      }
    },
  });

  const { TextArea } = Input;

  return (
    <>
      {returnPage === false ? (
        <div>
          <Container
            style={{
              backgroundImage: ` url(${image})`,
            }}
          >
            <Title> AGENDAMENTO ONLINE</Title>
          </Container>
          <Paragraph>
            {" "}
            Para Marcar seu Agendamento conosco a cerca de Manutenção ou reparo,
            preencha os campos abaixo escolhendo o melhor dia e horário e nós
            iremos entrar em contato com você.
          </Paragraph>
          <Label>
            <Button
              style={{ borderRadius: 5, marginTop: 25 }}
              onClick={() => {
                previous();
              }}
              type="danger"
            >
              Voltar
            </Button>

            <SubTitle style={{ marginRight: 250 }}>
              {" "}
              INFORMAÇÕES SOBRE O PROCEDIMENTO DESEJADO
            </SubTitle>
          </Label>
          <Paragraph>
            <Line></Line>
          </Paragraph>
          <form onSubmit={formik.handleSubmit}>
            <Label>
              <p>Informe o Tipo de Atendimento</p>
              <div>
                <select
                  id="atendimento"
                  name="atendimento"
                  placeholder="Tipos de Atendimento"
                  onChange={formik.handleChange}
                  value={formik.values.atendimento}
                >
                  {teste.map((item) => {
                    return <option key={item.label}>{item.label}</option>;
                  })}
                </select>
                {formik.errors.atendimento ? (
                  <div style={{ marginLeft: 10 }}>
                    {formik.errors.atendimento}
                  </div>
                ) : null}
              </div>
            </Label>
            <Label>
              <p style={{ marginLeft: 35 }}>Informe o Motivo do Atendimento</p>
              <div>
                <TextArea
                  id="descricao"
                  name="descricao"
                  style={{ width: 250 }}
                  placeholder="Descrição do Atendimento"
                  rows={1}
                  onChange={formik.handleChange}
                  value={formik.values.descricao}
                />
                {formik.errors.descricao ? (
                  <div style={{ marginLeft: 10 }}>
                    {formik.errors.descricao}
                  </div>
                ) : null}
              </div>
            </Label>
            <Label>
              <p>Escolha a hora e data para o Agendamento</p>
              <div>
                <DatePicker
                  id="data"
                  name="data"
                  format="DD-MM-YYYY HH:mm"
                  showTime={{ defaultValue: moment("00:00", "HH:mm") }}
                  onChange={(e) => {
                    setDate(moment(e).format("DD-MM-YYYY HH:mm"));
                  }}
                  // value={formik.values.data}
                />
                {/* {formik.errors.data ? (
              <div style={{ marginLeft: 10 }}>{formik.errors.data}</div>
            ) : null} */}
              </div>
            </Label>
            <Label />
            <Label />
            <Label>
              {/* <Button
          style={{ borderRadius: 5, width: 200 }}
          onClick={() => {}}
          type="primary"
        >
          Finalizar Cadastro
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
                Finalizar Agendamento
              </button>
            </Label>
            <Label /> <Label />
          </form>
        </div>
      ) : (
        <>
          <Visitors name1={name1} placa1={placa1} motor1={motor1} />
        </>
      )}
    </>
  );
}

export default VisitorsStep2;
