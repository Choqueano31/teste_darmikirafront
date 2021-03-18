import React from "react";
import {
  Bars,
  Nav,
  NavBtn,
  NavBtnLink,
  NavLink,
  NavMenu,
} from "./NavBarElements";
import image from "../../images/logo2.png";
function NavBar() {
  return (
    <>
      <Nav>
        <NavLink to="/Home">
          <img src={image} style={{ height: 50, width: 50 }} alt="logo" />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/Home" activeStyle>
            Página Inicial
          </NavLink>
          <NavLink to="/services" activeStyle>
            Agendamento Online
          </NavLink>
          <NavLink to="/Administrator" activeStyle>
            Adminstrador
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/signin"> Entrar</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
}

export default NavBar;
