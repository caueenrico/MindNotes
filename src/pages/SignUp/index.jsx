import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import Filter from '../../assets/Rectangle.png'

import { Background, Container, Form } from './styles'

import {FiMail, FiLock, FiUser} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { api } from '../../services/api'
 
export function SignUp(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  function handleSingUp(){
    if(!name || !email || !password){
      return alert('Preencha todos os campos!')
    }

   api.post("/usuarios", {name, email, password}).then(() => {
    alert("Usuario cadastrado com sucesso")
    navigate('/')
    
   }).catch(error => {
    if(error.response){
      alert(error.response.data.message)
    } else {
      alert('Não foi possivel cadastrar')
    }
   })
  }

  return(
    <Container>
      <Background/>

      <Form>
        <h1>Mind Notes</h1>
        <p>Aplicação para salvar seus links úteis</p>

        <h2>Crie sua conta </h2>
        <Input 
          placeholder='User'
          type='text'
          icon={FiUser}
          onChange={e => setName(e.target.value)}
        />
        <Input 
          placeholder='E-mail'
          type='text'
          icon={FiMail}
          onChange={e => setEmail(e.target.value)}
        />

        <Input 
          placeholder='Password'
          type='password'
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}
        />

        <Button
          title={'Cadastrar'}
          onClick={handleSingUp}
        />
        
        <Link to='/'>
          Volte para o login
        </Link>


      </Form>

    </Container>
  )
}