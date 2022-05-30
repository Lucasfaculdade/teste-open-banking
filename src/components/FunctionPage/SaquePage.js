import { useState } from "react";
import { Notif } from "../LoginPage/Notif";
import { formatNumber, findAccount, transact, trim } from "./Utils";

export const SaquePage = (props) => {
    const users = JSON.parse(localStorage.getItem('users'));
    const setNotif = props.setNotif;
    const notif = props.notif;
    const [accounts, setAccounts] = useState(users);
    const [selectedAccount, setSelectedAccount] = useState({balance: 0});
    const [saqueAmount, setSaqueAmount] = useState(0);

    const options = accounts.map(user => {
        return <option value={user.number}>{user.fullname} #{user.number}</option>
    });

    const displayBalance = (e) => {
        setNotif(notif);
        const selectedNumber = e.target.value;
        
        for(const user of accounts) {
            if(user.number === selectedNumber) {
                setSelectedAccount(user);
                break;
            }
        }
    }

    const onSaque = (e) => {
        const amount = formatNumber(trim(e.target.value));
        setSaqueAmount(amount);
    }

    const processTransfer = (e) => {
        e.preventDefault();
        const amount = trim(e.target.elements.amount.value);
        const accountNumber = e.target.elements.account.value;

        if(amount > 0 && accountNumber !== "0") {
            for(const user of accounts) {
                if(user.number === accountNumber) {
                    transact(user.number, amount, props.type, props.setUsers);
                    setSelectedAccount(findAccount(user.number));
                    setAccounts(JSON.parse(localStorage.getItem('users')));
                    setSaqueAmount(0);
                    setNotif({message: `Saque Efetuada com Sucesso.`, style: 'success'});
                    break;
                }
            }
        } 
        else {
            setNotif({message: `Ocorreu um erro, por favor verificar dados informados.`, style: 'danger'});
        }
    }
    const icon = props.page === 'withdraw' ? 'bx bx-down-arrow-alt' : 'bx bx-up-arrow-alt';

    return (
        <section id="main-content">
            <form id="form" onSubmit={processTransfer}>
                <h1>Efetuar um {props.page}</h1>
                <Notif message={notif.message} style={notif.style} />
                <label>Conta</label>
                <select name="account" onChange={displayBalance}>
                    <option value="0">-- Selecione Conta --</option>
                    {options}
                </select>

                <label>Saldo Atual</label>
                <input type="text" className="right" value={formatNumber(selectedAccount.balance)} disabled />
                
                <div className="transfer-icon"><i className={icon}></i></div>
                <label>Quantidade para Saque</label>
                <input type="text" name="amount" value={saqueAmount} onChange={onSaque} autoComplete="off" className="right big-input" />
                <button type="submit" className="btn">Efetuar {props.page}</button>
            </form>
        </section>
    )
}