import { Input, notification } from "antd";
import "antd/dist/antd.css";
import { useFormik } from "formik";
import React, { useState } from "react";
import image from "../../../images/agenda.webp";
import { SubTitle } from "../../Administrator/styles";
import VisitorsStep2 from "../step2";
import { Container, Label, Line, Paragraph, Title } from "../styles";
const validate = (values) => {
  const errors = {};

  console.log(values);
  if (!values.motor) {
    errors.motor = <p style={{ color: "red" }}>obrigatório</p>;
  }
  if (!values.placa) {
    errors.placa = <p style={{ color: "red" }}>obrigatório</p>;
  }

  if (!values.nome) {
    errors.nome = <p style={{ color: "red" }}>obrigatório</p>;
  }

  return errors;
};

function Visitors({ name1, placa1, motor1 }) {
  const [motor, setMotor] = useState("");
  const [next, setNext] = useState(false);
  const [motorValue, setMotorValue] = useState("");
  const [placa, setPlaca] = useState("");
  const [name, setName] = useState("");
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Dados Salvos com Sucesso",
      description: " Prossiga para a próxima tela ",
    });
  };
  function newPage() {
    setNext(!next);
  }
  console.log(name, placa, motorValue);
  const formik = useFormik({
    initialValues: {
      motor: motor1 || "",

      nome: name1 || "",

      placa: placa1 || "",
    },

    validate,

    onSubmit: (values) => {
      setMotorValue(values.motor);
      setPlaca(values.placa);
      setName(values.nome);

      openNotificationWithIcon("success");
      setTimeout(() => {
        newPage();
      }, 1000);
    },
  });
  return (
    <>
      {next === false ? (
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

          <form onSubmit={formik.handleSubmit}>
            <SubTitle> INFORMAÇÕES SOBRE SEU VEÍCULO</SubTitle>
            <Paragraph>
              <Line></Line>
            </Paragraph>

            <Label>
              <p> Informe o Motor do seu Carro</p>
              <div>
                <select
                  id="motor"
                  name="motor"
                  placeholder="Motor"
                  style={{ width: 200 }}
                  onChange={formik.handleChange}
                  value={formik.values.motor}
                >
                  <option value="0">Selecionar</option>
                  <option value="1.0">1.0</option>
                  <option value="1.6">1.6</option>
                  <option value="2.0">2.0</option>
                </select>
                {formik.errors.motor ? (
                  <div style={{ marginLeft: 10 }}>{formik.errors.motor}</div>
                ) : null}
              </div>
            </Label>

            <Label>
              <p> Informe a Placa do seu carro</p>
              <div>
                <Input
                  id="placa"
                  name="placa"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.placa}
                  style={{ width: 200, marginLeft: 5 }}
                  placeholder="Insira a placa do Veículo"
                />
                {formik.errors.placa ? (
                  <div style={{ marginLeft: 10 }}>{formik.errors.placa}</div>
                ) : null}
              </div>
            </Label>

            <Label>
              <p>Informe seu Nome completo</p>
              <div>
                <Input
                  id="nome"
                  name="nome"
                  style={{ width: 200, marginLeft: 5 }}
                  placeholder="Nome Completo"
                  type="text"
                  inputMode="text"
                  onChange={formik.handleChange}
                  value={formik.values.nome}
                />
                {formik.errors.nome ? (
                  <div style={{ marginLeft: 10 }}>{formik.errors.nome}</div>
                ) : null}
              </div>
            </Label>
            <Label />
            <Label />

            <Label>
              {/* <Button
                style={{ borderRadius: 5, width: 200 }}
                type="submit"
                onClick={() => {
                  // newPage();
                }}
                // type="primary"
              >
                Avançar
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
                Avançar
              </button>
            </Label>
            <Label />
            <Label />
          </form>
        </div>
      ) : (
        <>
          <VisitorsStep2 motor={motorValue} name={name} placa={placa} />
        </>
      )}
    </>
  );
}

export default Visitors;
