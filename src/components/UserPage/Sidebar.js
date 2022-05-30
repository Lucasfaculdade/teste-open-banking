import React from 'react'
import { Logo } from '../LoginPage/Logo'

export const Sidebar = (props) => {
    const { user, logoutHandler, changePage, page} = props;
    let menu = null;

    if(!user){
        menu = <SideMenu changePage={changePage} page={page} logoutHandler={logoutHandler} />
    }

    if(user){
        menu = <ClientMenu changePage={changePage} page={page} logoutHandler={logoutHandler} />
        
    }
  return (
    <section id="side-menu">
        <Logo />
        {menu}
    </section>
  )
}

export const ClientMenu = (props) => {
    const {changePage, logoutHandler, page} = props;

    return (
        <ul>
            <SideLink onClickHandler={changePage} active={page} page="home" icon="bx bx-home" text="Inicio" />
            <SideLink onClickHandler={changePage} active={page} page="guardar" icon="bx bx-money" text="Guardar Dinheiro" />
            <SideLink onClickHandler={changePage} active={page} page="pix" icon="bx bx-transfer" text="Efetuar Pix" />
            <SideLink onClickHandler={changePage} active={page} page="deposito" icon="bx bx-money" text="Efetuar Deposito" />
            <SideLink onClickHandler={changePage} active={page} page="saque" icon="bx bx-log-out-circle" text="Efetuar Saque" />
            <SideLink onClickHandler={logoutHandler} active={page} icon="bx bx-log-out" text="Sair" />
        </ul>
    )
}
  
export const SideMenu = (props) => {
    const {changePage, logoutHandler, page} = props;
    return (
        <ul>
            <SideLink onClickHandler={changePage} active={page} page="home" icon="bx bx-home" text="Inicio" />
            <SideLink onClickHandler={changePage} active={page} page="create-account" icon="bx bx-user-pin" text="Criar Nova Conta" />
            <SideLink onClickHandler={logoutHandler} active={page} icon="bx bx-log-out" text="Sair" />
        </ul>
    )
}
  
export const SideLink = (props) => {
    const {icon, text, page, active} = props;
    
    function clickLink(event) {
        if(page) {
            event.preventDefault();
            props.onClickHandler(page);
        } else {
            event.preventDefault();
            props.onClickHandler();
        }
    }

    return (
        <li><a onClick={clickLink} className={ active === page ? 'active' : '' } href="#"><i className={icon} ></i> {text}</a></li>
    )
}