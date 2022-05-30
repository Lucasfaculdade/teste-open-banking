import { useState } from "react";
import { Notif } from "../LoginPage/Notif";
import { formatNumber, getDateToday } from "./Utils";

export const PixPage = (props) => {
    const {isClient, client} = props;
    const [users, setUsers] = useState(props.users); 
    const [receivers, setReceivers] = useState(users);
    const [sender, setSender] = useState( isClient ? client : {balance: 0});
    const [receiver, setReceiver] = useState({balance: 0});
    const [notif, setNotif] = useState({message: 'Efetue pix para alguém.', style: 'left'});
    const [transferAmount, setTransferAmount] = useState(0);

    const senderSelected = (event) => {
        const accountNumber = event.target.value;

        let sender = null; 

        users.forEach(user => {
            if(user.number === accountNumber) {
                sender = user;        
            }
        })

        const newUsers = users.filter((user, index) => {
            return user.number !== accountNumber;
        });

        setSender(sender);
        setReceivers(newUsers);
        setReceiver({number: 0, balance: 0});
    }

    const receiverSelected = event => {
        const accountNumber = event.target.value;

        let receiver = null;

        users.forEach(user => {
            if(user.number === accountNumber) {
                receiver = user;
            }
        })

        setReceiver(receiver);
    }
    

    let senders = null;
    if(!isClient) {
        senders = users.map(user => {
            return (
                <option value={user.number}>{user.fullname}</option>
                
            )
        });
    }

    const newReceivers = receivers.map(receiver => {
        if(sender.number !== receiver.number) {
            return (
                <option value={receiver.number}>#{receiver.number}</option>
            )
        }
        
    })

    const transferFund = event => {
        event.preventDefault();
        const amount = parseFloat(event.target.elements.amount.value.replace(/,/g, ''));
        if(amount <= 0) return false;

        const users = JSON.parse(localStorage.getItem('users'));

        if(sender.number !== 0 && receiver.number !== 0 && receiver.number) {
          
            let senderSuccess = false;
            users.forEach(user => {
                if(user.number === sender.number) {
                    if(user.balance - amount >= 0) {
                        user.balance -= amount;

                        console.log(user.transactions);
                        user.transactions.unshift({
                            title: `Pix Enviado para  ${receiver.fullname} #${receiver.number}`, 
                            amount: amount, 
                            type: "Debito", 
                            date: getDateToday()
                        });

                        setSender(user);
                        senderSuccess = true;
                        
                    }
                }
            });

         
            if(senderSuccess) {
                users.forEach(user => {
                    if(user.number === receiver.number) {
                        user.balance += amount;
                        
                        user.transactions.unshift({
                            title: `Pix enviado para ${sender.fullname} #${receiver.number}`, 
                            amount: amount, 
                            type: "Credito", 
                            date: getDateToday()
                        });

                        setReceiver(user);
                    }
                });

                setNotif({ message: 'Pix eftuado com sucesso.', style: 'success' });
                setUsers(users);
                props.setUsers(users);
                localStorage.setItem('users', JSON.stringify(users));
                setTransferAmount(0);
            } 
            else {
                setNotif({message: 'Ocorreu um erro com o envio do pix, por favor verifique os dados informados.', style: 'danger'});
            }
        }
        else {
            setNotif({message: 'Falta informações por favor verifique os dados', style: 'danger' });
        }
    }

    const onTransfer = (e) => {
        const transfer = parseFloat(e.target.value.replace(/,/g, '')) || 0;
        setTransferAmount(transfer);
    }

    let senderField = 
        <select onChange={senderSelected} name="Envio" placeholder="-- Selecione a Conta --">
            {senders}
        </select>;
    
    if(isClient) {
        senderField = <input type="text" name="sender" value={`${client.fullname} #${client.number}`} disabled />
    }

    return (
        <section id="main-content">
            <form id="form" onSubmit={transferFund}>
                <h1>Transferencia via PIX</h1>
                
                <Notif message={notif.message} style={notif.style} />
                <h2>Remetente</h2>
                <label>De:</label>
                {senderField}

                <label>Saldo Atual</label>
                <input type="text" className="right" value={formatNumber(sender.balance)} disabled />

                <label>Quantidade para transação</label>
                <input type="text" name="amount" value={formatNumber(transferAmount)} onChange={onTransfer} autoComplete="off" className="right big-input" />

                <div className="transfer-icon"><i className='bx bx-down-arrow-alt'></i></div>
                <h2>Destinatario</h2>
                <label>Para chave :</label>
                <select value={receiver.number || 0} onChange={receiverSelected} name="receiver" placeholder="-- Selecione a Conta --">
                    {newReceivers}
                </select>
                <input type="submit" className="btn" value="Efetuar transferencia" />
            </form>
        </section>
    )
}