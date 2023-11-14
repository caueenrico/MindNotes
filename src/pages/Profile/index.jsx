import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, Form, Avatar } from "./styles";
import { FiArrowLeft, FiMail, FiUser, FiLock, FiCamera } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'
import { ButtonText } from "../../components/ButtonText";

export function Profile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder
  const [avatar, setAvatar] = useState(avatarUrl); //exibir o avatar em tela
  const [avatarFile, setAvatarFile] = useState(null) //guardar o avatar selecionado
  
  const navigate = useNavigate()

  async function handleUpdateProfile(){
    const updated = {
      name,
      email,
      password: passwordNew,
      oldPassword: passwordOld,
    }

    const userUpdated = Object.assign(user, updated)//tive que fazer isso pq se nao a foto saia quando eu fazia qualquer alteração no perfil

    await updateProfile({user: userUpdated, avatarFile})
  }

  function handleChangeaAvatar(event){
    const file = event.target.files[0]
    setAvatarFile(file)

    const imagePreview = URL.createObjectURL(file)
    setAvatar(imagePreview )
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>

      
      </header>

      <Form>
        <Avatar>
          <img src={avatar} alt={user.name} />

          <label htmlFor="avatar">
            <FiCamera />

            <input id="avatar" type="file" onChange={handleChangeaAvatar} />
          </label>
        </Avatar>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          icon={FiLock}
          onChange={(e) => setPasswordOld(e.target.value)}
        />

        <Input
          placeholder="New Password"
          type="password"
          icon={FiLock}
          onChange={(e) => setPasswordNew(e.target.value)}
        />

        <Button title={"Salvar"} onClick={handleUpdateProfile}/>
      </Form>
    </Container>
  );
}
