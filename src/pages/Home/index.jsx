import { ButtonText } from "../../components/ButtonText";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Container, Brand, Menu, Search, Content, NewNotes } from "./styles";
import { FiPlus } from "react-icons/fi";
import { Section } from "../../components/Section";
import { Note } from "../../components/Note";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [tags, setTags] = useState([]);

  const [tagsSelected, setTagsSelected] = useState([]);

  const [search, setSearch] = useState('')

  const [notes, setNotes] = useState([])

  function hadleSelectedTags(tagName) {
    if(tagName === 'all'){
      return setTagsSelected([]) 
    }

    const alredySelected = tagsSelected.includes(tagName)

    if(alredySelected){
      const filterdTags = tagsSelected.filter(tag => tag !== tagName)
      setTagsSelected(filterdTags)

    }else{
      setTagsSelected(prevState => [...prevState, tagName]);
    }

    
  }

  const navigate = useNavigate()
  function handleDetails(id){
    navigate(`/details/${id}`)
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTags(response.data);
    }

    fetchTags();
  }, []);

  useEffect(()=>{
    async function fetchNotes(){
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
      setNotes(response.data)
    }

    fetchNotes()
  },[tagsSelected, search])

  return (
    <Container>
      <Brand>
        <h1>MindNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
            title={"Todos"}
            $isactive={tagsSelected.length === 0}
            onClick={() => hadleSelectedTags('all')}
          />
        </li>
        {tags &&
          tags.map((tag) => (
            <li key={String(tag.id)}>
              <ButtonText
                title={tag.name}
                onClick={() => hadleSelectedTags(tag.name)}
                $isactive={tagsSelected.includes(tag.name)}
              />
            </li>
          ))}
      </Menu>

      <Search>
        <Input placeholder="Pesquisar pelo titulo" 
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title={"Minhas notas"}>
          {notes.map(note => (
          <Note
            key={note.id}
            data={note}
            onClick={() => handleDetails(note.id)}
          />))}
        </Section>
      </Content>

      <NewNotes to="/new">
        <FiPlus />
        Criar Nota
      </NewNotes>
    </Container>
  );
}
