import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"

export default function TransactionsPage() {

  const parms = useParams();
  const navigate = useNavigate();

  return (
    <TransactionsContainer>
      <h1>Nova {parms.tipo} </h1>
      <form onSubmit={event => {
        event.preventDefault();
        // axios e se der certo leva pra /home
        navigate("/home")
      }}>
        <input placeholder="Valor" type="text" />
        <input placeholder="Descrição" type="text" />
        <button>Salvar {parms.tipo}</button>
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
    //text-transform:capitalize;
  }
`
