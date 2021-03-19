import React from "react";
import image from "../../images/logo2.png";
import { Bars, Nav, NavLink, NavMenu } from "./NavBarElements";
function NavBar() {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <img src={image} style={{ height: 50, width: 50 }} alt="logo" />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/" activeStyle>
            Página Inicial
          </NavLink>
          <NavLink to="/services" activeStyle>
            Agendamento Online
          </NavLink>
          <NavLink to="/Administrator" activeStyle>
            Adminstrador
          </NavLink>
        </NavMenu>
        {/* <NavBtn>
          <NavBtnLink to="/signin"> Entrar</NavBtnLink>
        </NavBtn> */}
      </Nav>
    </>
  );
}

export default NavBar;
