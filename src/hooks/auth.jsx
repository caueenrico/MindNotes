//isso aqui é um contexto
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext({});

//isso aqui eu vou mandar para o main.js
function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("@mindnotes:user", JSON.stringify(user));
      localStorage.setItem("@mindnotes:token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`; //IMPORTANTE //para que coloque o token do usuario no headers das demais requisições

      //preciso guardar as informações em um estado
      setData({ user, token });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("não foi possivel entrar");
      }
    }
  }

  function signOut() {
    //removendo os dados do localstorage
    localStorage.removeItem("@mindnotes:token");
    localStorage.removeItem("@mindnotes:user");

    setData({}); //setei o data como vazio
  }

  async function updateProfile({user, avatarFile}){
    try {

      if(avatarFile){
        const fileUploadForm = new FormData()
        fileUploadForm.append('avatar', avatarFile)

        const response = await api.patch("/usuarios/avatar", fileUploadForm)
        user.avatar = response.data.avatar

      }

      await api.put('/usuarios', user);
      localStorage.setItem("@mindnotes:user", JSON.stringify(user))

      setData({user, token: data.token})
      alert('usuario atualizado')
      
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("não foi possivel atualizar usuario");
      }
    }
  }

  //ele vai cair aqui no useEffect se ja foi logado pelo menos 1 vez na maquina que esta usando
  useEffect(() => {
    const token = localStorage.getItem("@mindnotes:token");
    const user = localStorage.getItem("@mindnotes:user");

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`; //IMPORTANTE //para que coloque o token do usuario no headers das demais requisições
      //preciso guardar as informações em um estado
      setData({
        user: JSON.parse(user),
        token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, user: data.user, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  //esse aqui eu posso reutilizar em varios lugares
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
