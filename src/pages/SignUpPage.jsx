import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"

export default function SignUpPage() {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const navigate = useNavigate();

  function handleChange(event) {
    const newRegister = { ...register };
    newRegister[event.target.name] = event.target.value;
    setRegister(newRegister);
  }

  return (
    <SingUpContainer>
      <form onSubmit={event => {
        event.preventDefault();
        // req axios

        navigate("/")
      }}>
        <MyWalletLogo />
        <input required onChange={handleChange} value={register.name} name="name" placeholder="Nome" type="text" />
        <input required onChange={handleChange} value={register.email} name="email" placeholder="E-mail" type="email" />
        <input required onChange={handleChange} value={register.password} name="password" placeholder="Senha" type="password" autocomplete="new-password" />
        <input required onChange={handleChange} value={register.confirmPassword} name="confirmPassword" placeholder="Confirme a senha" type="password" autocomplete="new-password" />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
