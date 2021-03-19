import React from "react";
import { useHistory } from "react-router-dom";
import image from "../../images/neg3.jpg";
import { Button } from "../NavBar/NavBarElements";

function Home() {
  const history = useHistory();

  return (
    <div
      style={{
        width: 1354,
        height: 749,
        backgroundImage: ` url(${image})`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: "white",
            marginTop: 50,
            textShadow: "black 0.1em 0.1em 0.2em",
          }}
        >
          BEM VINDO
          <h5
            style={{
              color: "white",
              textShadow: "black 0.1em 0.1em 0.2em",
            }}
          >
            Você está no Nosso Serviço de Atendimento Online <br />
          </h5>
        </h2>
        <Button
          onClick={() => {
            history.push("/services");
          }}
          style={{
            marginTop: 150,
            height: 50,
            fontWeight: "bold",
            fontSize: 15,
          }}
        >
          {" "}
          CADASTRAR AGENDAMENTO ONLINE
        </Button>
      </div>
    </div>
  );
}

export default Home;
