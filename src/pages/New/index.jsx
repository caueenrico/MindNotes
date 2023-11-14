import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { Section } from "../../components/Section";
import { Container, Form } from "./styles";
import { NoteItem } from "../../components/NoteItem";
import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api";
import { ButtonText } from "../../components/ButtonText";

export function New() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  function handleAddLink() {
    setLinks((prevState) => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(linkDeleted) {
    setLinks((prevState) => prevState.filter((links) => links !== linkDeleted));
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(tagDeleted) {
    setTags((prevState) => prevState.filter((tags) => tags !== tagDeleted));
  }

  const navigate = useNavigate()

  async function handleSendNotes() {
    if(!title){
      return alert('é necessário adicionar um Titulo')
    }

    await api.post("/notes",{
      title,
      description,
      links,
      tags
    })

    alert('enviado post com sucesso')

    navigate(-1)
    
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            
            <ButtonText title={'Voltar'} onClick={() => navigate(-1)}/>
          </header>

          <Input 
            placeholder="Titulo" 
           
            onChange={e => setTitle(e.target.value)}  
          />
          <Textarea 
            placeholder="Observações" 
         
            onChange={e => setDescription(e.target.value)}  
          />

          <Section title={"Links úteis"}>
            {links.map((link, index) => (
              <NoteItem
                key={String(index)}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
            ))}
            <NoteItem
              isNew
              placeholder="New Link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title={"Marcadores"}>
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={String(index)}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}
              <NoteItem
                isNew
                placeholder="New Tag"
                onChange={(e) => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>
          <Button title={"Salvar"} onClick={handleSendNotes}/>
        </Form>
      </main>
    </Container>
  );
}
