import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { UserDataContext } from "../context/UserDataContext";


export default function SignInPage() {
  const { setToken, lsToken } = useContext(UserDataContext);
  const navigate = useNavigate()
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });


  function handleChange(event) {
    const newLogin = { ...login };
    newLogin[event.target.name] = event.target.value;
    setLogin(newLogin);
  }

  function loged() {
    if (lsToken !== null) {
      navigate("/home")

    }
  }
  loged()

  return (
    <SingInContainer>
      <form onSubmit={event => {
        event.preventDefault();
        axios.post("http://localhost:5000/", login).then((user) => {
          setToken(user.data)
          localStorage.setItem("token", user.data)
          navigate("/home")
        }).catch((error) => {
          const erro = (error.response.status);
          if (erro === 422) return alert("Confira os dados!");
          if (erro === 404) return alert("Email não encontrado");
          if (erro === 401) return alert("Senha incorreta");
        })
      }}>
        <MyWalletLogo />
        <input required onChange={handleChange} value={login.email} name="email" placeholder="E-mail" type="email" />
        <input required onChange={handleChange} value={login.password} name="password" placeholder="Senha" type="password" autocomplete="new-password" />
        <button>Entrar</button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
