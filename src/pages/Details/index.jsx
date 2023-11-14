import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { Tag } from "../../components/Tag";
import { Container, Links, Content } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";

export function Details() {
  const [data, setData] = useState(null);

  const navigate = useNavigate()
  const params = useParams();

  async function handleRemoveNote(){
    const confirm = window.confirm("Quer realmente remover a nota ?")

    if(confirm){
      await api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
      console.log(response.data)
    }
    fetchNotes();
  }, []);

  

  return (
    <Container>
      <Header />

      {data && (
        <main>
          <Content>
            <ButtonText title={"Excluir nota"} onClick={handleRemoveNote}/>

            <h1>{data.title}</h1>

            <p>{data.description}</p>

            {data.links && (
              <Section title="Links uteis">
                <Links>
                  {data.links.map(link => (
                    <li key={String(link.id)}>
                      <a href={link.url} target="_blank">{link.url}</a>
                    </li>
                  ))}
                </Links>
              </Section>
            )}

            {data.tags &&
            <Section title="Marcadores">
              {
                data.tags.map(tag => (
                  <Tag
                    key={String(tag.id)} 
                    title={tag.name} 
                  />
                ))
                
              }
              
            </Section>
            }

            <Button 
              title={"Voltar"} 
              onClick= { () => navigate(-1)}
            />
          </Content>
        </main>
      )}
    </Container>
  );
}
