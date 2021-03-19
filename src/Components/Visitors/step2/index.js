import { Button, DatePicker, Input, notification } from "antd";
import "antd/dist/antd.css";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import fireDb from "../../../firebase";
import image from "../../../images/agenda.webp";
import { SubTitle } from "../../Administrator/styles";
import Visitors from "../step1";
import { Container, Label, Line, Paragraph, Title } from "../styles";
const validate = (values) => {
  const errors = {};

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
  const [dataList, setDataList] = useState({});
  const history = useHistory();
  useEffect(() => {
    fireDb.child("service").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setDataList({ ...snapshot.val() });
      }
    });
  }, []);
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

  const formik = useFormik({
    initialValues: {
      atendimento: "",
      descricao: "",

      // data: String(date),
    },

    validate,

    onSubmit: (values) => {
      if (date !== "") {
        fireDb.child("schedule").push(
          {
            motor: motor1,
            placa: placa1,
            name: name1,
            atendimento: values.atendimento,
            descricao: values.descricao,
            date: date,
            status: "AGENDADO",
          },
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
        openNotificationWithIcon("success");
        setTimeout(() => {
          history.push("/");
        }, 1000);
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
            <Label>
              <p>Informe o Tipo de Atendimento</p>
              <div>
                <select
                  id="atendimento"
                  name="atendimento"
                  placeholder="Tipos de Atendimento"
                  style={{ marginLeft: 80 }}
                  onChange={formik.handleChange}
                  value={formik.values.atendimento}
                >
                  {Object.keys(dataList).map((id) => {
                    return (
                      <option key={dataList[id].name}>
                        {dataList[id].name}
                      </option>
                    );
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
