import { Container } from "./style";

export function Button({ title, loading = false, ...rest }) {
  return (
    <Container 
      type="button" 
      disabled={loading} 
      {...rest} //nesse aqui ele esta pegando qualquer outro tipo de propriedade que exista no botão e que eu nao passei
    >
      {loading ? "carregando..." : title}
    </Container>
  );
}
