import React, { useState } from 'react';
import DATA from './data';
import { LoginPage } from '../components/LoginPage/LoginPage';
import { ClientDashboard } from '../components/UserPage/ClientDashboard';
import { Dashboard } from '../components/UserPage/Dashboard';

export const Authenticate = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notif, setNotif] = useState({message: '', style: ''});
  const [isAdmin, setIsAdmin] = useState(false);
  const [client, setClient] = useState(null);
  const localUsers = localStorage.getItem('users');

  if(!localUsers){
     localStorage.setItem('users', JSON.stringify(DATA));
  }
  
  const clients = JSON.parse(localStorage.getItem('users'));

  const isLoginSucess = (email, password) => {
    let isFound = false;

    clients.forEach(user =>{
      if(user.email === email && user.password === password){
        if(user.isAdmin){
          setIsAdmin(true);
          setClient(user);
          isFound = true;
        }
        else{
          setIsAdmin(false);
          setClient(user);
          isFound = true;
        }
      }
      setNotif('');
    });

    if(!isFound) setNotif({message: 'Usuário ou senha incorreta, por favor verifique e tente novamente !', style: 'danger'}); 
    return isFound;
  }

  const login = (username, password) => {
    if(isLoginSucess(username, password)){
      setIsLoggedIn(true);
    }
  }
  
  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('client');
    setNotif({message: 'Você deslogou com sucesso!', style: 'sucess'});
  }

  if(isLoggedIn) {
    localStorage.setItem('currentUser', JSON.stringify(client));
    if(isAdmin) {
      return <Dashboard users={clients} logoutHandler={logout} />
    } else {
      
      return <ClientDashboard client={client} users={clients} setClient={setClient} logout={logout} />
    }
  } else {
    return <LoginPage loginHandler={login} notif={notif} isLoggedIn={isLoggedIn} />
  }
}
