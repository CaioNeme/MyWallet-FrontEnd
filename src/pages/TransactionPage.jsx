import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"
import { UserDataContext } from "../context/UserDataContext";
import styled from "styled-components"
import { useContext, useEffect, useState } from "react";

export default function TransactionsPage() {

  const parms = useParams();
  const navigate = useNavigate();
  const { token } = useContext(UserDataContext);
  const [transaction, setTransaction] = useState({
    valor: "",
    description: "",
  })

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  function handleChange(event) {
    const newTransaction = { ...transaction };
    newTransaction[event.target.name] = event.target.value;
    setTransaction(newTransaction);
  }
  useEffect(() => {
    if (!token) navigate('/')
  }, [])

  return (
    <TransactionsContainer>
      <h1>Nova {parms.type} </h1>
      <form onSubmit={event => {
        event.preventDefault();
        if (transaction.valor === "0") return alert("Zero não é um numero valido")
        if (transaction.valor.includes(",")) transaction.valor = transaction.valor.replace(",", ".")
        transaction.valor = Number(transaction.valor).toFixed(2)
        axios.post(`http://localhost:5000/nova-transacao/${parms.type}`, transaction, config).then(() => {
          navigate("/home")
        }).catch((error) => {
          const erro = (error.response.status);
          if (erro === 422) return alert("Dados incorretos");

        })

      }}>
        <input data-test="registry-amount-input" required onChange={handleChange} value={transaction.valor} name="valor" placeholder="Valor" type="text" min={1} />
        <input data-test="registry-name-input" required onChange={handleChange} value={transaction.description} name="description" placeholder="Descrição" type="text" />
        <button data-test="registry-save">Salvar {parms.tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
