import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserDataContext } from "../context/UserDataContext";


export default function HomePage() {

  const navigate = useNavigate()
  const { userData, setUserData, setToken, token } = useContext(UserDataContext);
  const [transactions, setTransactions] = useState([]);
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/home`, config).then((user) => {
      setUserData(user.data);
      setTransactions(user.data.Transactions.reverse())
    }).catch(err => console.log(err))
  }, [])
  useEffect(() => {
    if (!token) navigate('/')
  }, [])

  function balance() {
    let balanceTotal = 0;
    transactions.map(transaction => {
      if (transaction.type === "deposit") {
        balanceTotal = balanceTotal + Number(transaction.value);
      } else {
        balanceTotal = balanceTotal - Number(transaction.value);
      }
    })
    return balanceTotal
  }


  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {userData.name}</h1>
        <BiExit data-test="logout" onClick={() => {
          setToken(null);
          localStorage.removeItem('token');
          navigate("/");
        }} />
      </Header>
      <TransactionsContainer>
        <ListaUL>
          {transactions.map(transaction =>
            <ListItemContainer key={transaction._id}>
              <div>
                <span>{transaction.date}</span>
                <strong data-test="registry-name">{transaction.description}</strong>
              </div>
              <Value data-test="registry-amount" color={transaction.type === "deposit" ? "positivo" : "negativo"}>{transaction.value.toFixed(2).replace(",", ".")}</Value>
            </ListItemContainer>
          )}
        </ListaUL>

        <article>
          <strong>Saldo</strong>
          <Value data-test="total-amount" color={balance() >= 0 ? "positivo" : "negativo"}>{balance().toFixed(2)}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button data-test="new-income" onClick={() => navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button data-test="new-expense" onClick={() => navigate("/nova-transacao/saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}
const ListaUL = styled.ul`
    overflow-y: scroll;
    max-height: 615px;
`
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  position:relative;
  article {
    display: flex;
    justify-content: space-between;  
    /* position:relative; 
    bottom:0px; */
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`