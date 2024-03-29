import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"

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
        const { name, email, password, confirmPassword } = register;

        if (password !== confirmPassword) {
          alert("As senhas são diferentes");
          return
        }

        const user = { name, email, password }

        axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, user).then(() => navigate("/")).catch(error => {
          const erro = (error.response.status);
          if (erro === 422) return alert("Os dados são inválidos tente novamente")
          if (erro === 409) return alert("Esse email já esta em uso")
        });

      }}>
        <MyWalletLogo />
        <input data-test="name" required onChange={handleChange} value={register.name} name="name" placeholder="Nome" type="text" />
        <input data-test="email" required onChange={handleChange} value={register.email} name="email" placeholder="E-mail" type="email" />
        <input data-test="password" required onChange={handleChange} value={register.password} name="password" placeholder="Senha" type="password" autoComplete="new-password" />
        <input data-test="conf-password" required onChange={handleChange} value={register.confirmPassword} name="confirmPassword" placeholder="Confirme a senha" type="password" autoComplete="new-password" />
        <button data-test="sign-up-submit" type="submit">Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer >
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
