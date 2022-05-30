import React, { useEffect, useState } from 'react'
import { Sidebar } from './Sidebar';
import { MainContent } from '../AccoutsPage/MainContent';
import { CreateAccountPage } from '../FunctionPage/CreateAccountPage';
import { PixPage } from '../FunctionPage/PixPage';
import { DepositoPage } from '../FunctionPage/DepositoPage';
import { SaquePage } from '../FunctionPage/SaquePage';

export const Dashboard = (props) => {
  const [page, setPage] = useState('home');
  const [users, setUsers] = useState(props.users);
  const [notif, setNotif] = useState({message: '', style: ''});
  const [editingUser, setEditingUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false); 
  const [newAccount, setNewAccount] = useState(null); 

  const changePageHandler = (pageName) => {
      setPage(pageName);

      if(pageName === 'saque') {
          setNotif({message: 'Informe a quantidade de dinheiro para sacar.', style: 'left'});
      } 

      if(pageName === 'deposito') {
          setNotif({message: 'Informar quantidade para deposito.', style: 'left'});
      }
  }

  useEffect(() => {
      if(deleteUser !== null) {
          const filteredUsers = users.filter((user, index) => {
              return index !== deleteUser
          });

          setUsers(filteredUsers);
          setDeleteUser(null);
      
          localStorage.setItem('users', JSON.stringify(filteredUsers));
      }
  }, [deleteUser]);

  useEffect(() => {
      if(isUpdate) {
          const filteredUsers = users.map((user, index) => {
              if(user.number === newAccount.number) {
                  user = {...user, ...newAccount};
              }
              return user;
          });

          setUsers(filteredUsers);
          setIsUpdate(false);

          localStorage.setItem('users', JSON.stringify(filteredUsers));
      }
  }, [isUpdate]);

  let modal = null;
  if(editingUser !== null && editModal) {
      const user = users[editingUser];
      modal = <AccountEditModal 
          accountName={user.fullname} 
          accountNumber={user.number} 
          balance={user.balance} setEditModal={setEditModal} 
          setIsUpdate={setIsUpdate} setNewAccount={setNewAccount}  />
  }

  if(page === 'home') {
      return (
          <main>
            <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
            <MainContent users={users} editingUser={editingUser} 
              setEditModal={setEditModal} 
              setEditingUser={setEditingUser} setDeleteUser={setDeleteUser} />
            {modal}
          </main>
      )
  }

  if(page === 'create-account') {
      return (
          <main>
            <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
            <CreateAccountPage user={users} setUsers={setUsers} />
          </main>
      )
  }
}

const AccountEditModal = (props) => {
  const { accountName, accountNumber, balance, setEditModal, setNewAccount, setIsUpdate } = props;
  const [account, setAccount] = useState({fullname: accountName, number: accountNumber, balance: balance});

  const closeModal = () => {
      setEditModal(false);
  }

  const updateAccount = (e) => {
      e.preventDefault();
      console.log("Update");
      setNewAccount(account);
      setIsUpdate(true);
      setEditModal(false);
  }

  const editAccountName = (e) => {
      const name = e.target.value;
      setAccount({...account, ...{fullname: name}});
  }

  const editAccountNumber = (e) => {
      const number = e.target.value;
      setAccount({...account, ...{number: number}});
  }

  const editAccountBalance = (e) => {
      const balance = e.target.value;
      setAccount({...account, ...{balance: parseFloat(balance) || 0}});
  }

  return (
      <div className="overlay">
      <div className="modal">
          <form onSubmit={updateAccount}>
              <h2 className="title">Editar Conta</h2>
              <label>Nome Completo</label>
              <input name="account-name" onChange={editAccountName} value={account.fullname} autoComplete="off" />
              
              <label>Número da Conta</label>
              <input type="text" name="amount" onChange={editAccountNumber} disabled value={account.number} autoComplete="off" />

              <label>Saldo da Conta</label>
              <input type="text" name="balance" onChange={editAccountBalance} value={account.balance} autoComplete="off" />

              <button type="submit" className="btn2">Atualizar Conta</button>
              <button type="button" onClick={() => closeModal()} className="btn2 btn-muted">Cancelar</button>
          </form>
      </div>
  </div>
  )
}