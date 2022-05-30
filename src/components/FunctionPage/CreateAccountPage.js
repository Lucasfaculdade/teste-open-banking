import { useState } from "react";
import { Notif } from "../LoginPage/Notif";
import {formatNumber, trim} from './Utils';

export const CreateAccountPage = (props) => {
    const createRandomAccount = () => {
        return Math.floor(1000000000 + Math.random() * 9000000000);
    }
    
    const [notif, setNotif] = useState({message: 'Dados do Novo Cliente', style: 'left'});
    const [initialBalance, setInitialBalance] = useState(0);
    const [initialAccountNumber, setInitialAccountNumber] = useState(createRandomAccount());

    const createNewAccount = (user) => {

        const emptyInputs = Object.values(user).filter(input => {
            return input === ''
        });

        const localUsers = props.users;

        let alreadyExists = false;
        localUsers.forEach(row => {
            if(row.email === user.email) {
                alreadyExists = true;
            }
        });

        if(alreadyExists) {
            setNotif({message: 'Esse e-mail já existe, por favor verifique as credencias corretas', style: 'danger'});
            return false;
        } else if(emptyInputs.length > 0) {
            setNotif({message: 'Preencha todos os campos', style: 'danger'});
            return false;
        } else {
            setNotif('');
            localUsers.unshift(user);
            props.setUsers(localUsers); 
            localStorage.setItem('users', JSON.stringify(localUsers));
            setNotif({message: 'Foi salvo com sucesso', style: 'success'});
            return true;
        }
    }

    const handleCreateAccount = (event) => {
        event.preventDefault();
        const user = event.target.elements;

        const account = {
            email: user.email.value,
            password: user.password.value,
            fullname: user.fullname.value,
            type: user.accountType.value,
            number: user.accountNumber.value,
            isAdmin: false,
            balance: trim(user.initialBalance.value), 
            transactions: []
        }

        const isSaved = createNewAccount(account);
        if(isSaved) {
            user.email.value = '';
            user.password.value = '';
            user.fullname.value = ''; 
            user.accountNumber.value = setInitialAccountNumber(createRandomAccount());
            user.initialBalance.value = setInitialBalance(0);
        }
    }

    const onInitialBalance = event => {
        const amount = trim(event.target.value) || 0;
        setInitialBalance(amount);
    }

    return (
        <section id="main-content">
            <form id="form" onSubmit={handleCreateAccount}>
                <h1>Registrar Novo Cliente</h1>
                <Notif message={notif.message} style={notif.style} />
                <label htmlFor="fullname">Nome Completo</label>
                <input id="fullname" type="text" autoComplete="off" name="fullname" />
                <hr />
                <label htmlFor="account-number">Conta Número #(Numeração Gerado Automaticamente)</label>
                <input id="account-number" name="accountNumber" className="right" value={initialAccountNumber} type="number" disabled />

                <label htmlFor="balance">Saldo inicial</label>
                <input id="balance" type="text" value={formatNumber(initialBalance)} onChange={onInitialBalance} name="initialBalance" className="right" />

                <label htmlFor="account-type">Tipo da Conta</label>
                <select name="accountType">
                    <option value="Place Holder">-- Selecione uma Conta --</option>
                    <option value="Checking Account">Conta Corrente</option>
                    <option value="Savings Accounts">Conta Poupança</option>
                </select>
                <hr />
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" />
                <label htmlFor="password">Senha</label>
                <input id="password" type="password" name="password" />
                <input value="Criar Conta" className="btn" type="submit" />
            </form>
        </section>
    )
}