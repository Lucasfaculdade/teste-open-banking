import React, {useState} from 'react';
import { Sidebar } from './Sidebar';
import { MainClientContent } from '../AccoutsPage/MainClientContent';
import { findAccount } from '../FunctionPage/Utils';
import { PixPage } from '../FunctionPage/PixPage';
import { GuardarPage } from '../FunctionPage/GuardarPage';
import { DepositoPage } from '../FunctionPage/DepositoPage';
import { SaquePage } from '../FunctionPage/SaquePage';

export const ClientDashboard = (props) => {
    const { logout, client, setClient } = props;
    const [users, setUsers] = useState(props.users);
    const [ page, setPage ] = useState('home');
    const [notif, setNotif] = useState({message: '', style: ''});
    

  
    const changePageHandler = (pageName) => {
      setPage(pageName);
      const currentUser = findAccount(client.number);
      setClient(currentUser);
    }
  
    if(page === 'home') {
      
      return (
        <main>
          <Sidebar changePage={changePageHandler} page={page} user={client} logoutHandler={props.logout} />
          <MainClientContent user={client} />
        </main>
      )
    }
    
    if(page === 'guardar') {
      return (
        <main>
          <Sidebar changePage={changePageHandler} page={page} user={client} logoutHandler={props.logout} />
          <GuardarPage isClient="true" client={client} setClient={setClient} users={users} setUsers={setUsers}  />
        </main>
      )
    }
    
    if(page === 'pix') {
      return (
          <main>
              <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
              <PixPage users={users} setUsers={setUsers} />
          </main>
      )
  }

  if(page === 'deposito') {
      return (
          <main>
              <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
              <DepositoPage users={users} setUsers={setUsers} notif={notif} setNotif={setNotif} type="add" page={page} />
          </main>
      )
  }

  if(page === 'saque') {
      return (
          <main>
              <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
              <SaquePage users={users} setUsers={setUsers} notif={notif} setNotif={setNotif} type="subtract" page={page} />
          </main>
      )
  }
}