import { Container } from "./styles";

export function Section({title, children}){
  return(
    <Container>
      <h2>{title}</h2>
      {children} {/* aqui estou passando que ele pode receber varios tipos de conteudo, como links, tags ou apenas textos */}
    </Container>
  )
}