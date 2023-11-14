import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import Filter from '../../assets/Rectangle.png'

import { Background, Container, Form } from './styles'

import {FiMail, FiLock} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { useState } from 'react'

 
export function SignIn(){
  const [email, setEmail] = useState({})
  const [password, setPassword] = useState({})

  const { signIn } = useAuth() //acessando o que tem dentro do meu context
  
  function handleSignIn(){
    signIn({email, password}) 
  }

  return(
    <Container>
      <Form>
        <h1>Mind Notes</h1>
        <p>Aplicação para salvar seus links úteis</p>

        <h2>Faça seu login</h2>
        <Input 
          placeholder='E-mail'
          type='text'
          icon={FiMail}
          onChange = {e => setEmail(e.target.value)}
        />

        <Input 
          placeholder='Password'
          type='password'
          icon={FiLock}
          onChange = {e => setPassword(e.target.value)}
        />

        <Button
          title={'Entrar'}
          onClick= {handleSignIn}
        />
        
        <Link to='/register'>
          Criar conta
        </Link>


      </Form>

      <Background/>
     
    </Container>
  )
}