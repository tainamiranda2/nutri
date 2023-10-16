import React, { useState, useEffect } from 'react';
import {  useParams} from "react-router-dom";

export const Atualizar = () => {
 // const [paciente, setPacientes] = useState([]);
  const {id}=useParams()
  const [nome, setNome]=useState("")
  const [idade, setIdade]=useState("")
  const [genero, setGenero]=useState("")
  const [objetivo, setObjetivo]=useState("")
  const [historico, setHistorico]=useState("")
  const [statusSaude, setstatusSaude]=useState("")
  const [senha, setSenha]=useState("")
  const [email, setEmail]=useState("")
  const [telefone, setTelefone]=useState("")

  useEffect(() => {
    // Método para buscar os dados do paciente antes de renderizar o formulário
    const buscarPaciente = async () => {
      
        await fetch('http://localhost/nutris_api/get.php?id='+id)
        .then((response)=>response.json())
        .then((responseJson)=>{
          //  console.log(responseJson)
            setNome(responseJson.paciente.nome)
            setIdade(responseJson.paciente.idade)
            setHistorico(responseJson.paciente.historico)
            setObjetivo(responseJson.paciente.objetivo)
            setGenero(responseJson.paciente.genero)
            setstatusSaude(responseJson.paciente.statusSaude)
            setTelefone(responseJson.paciente.telefone)
            setEmail(responseJson.paciente.email)
            setSenha(responseJson.paciente.senha)
        })
    };

    buscarPaciente();
  }, [id]);
//console.log(typeof(id))

  const atualizarPaciente = async (e) => {
    e.preventDefault();
    if (!nome || !idade || !historico || !objetivo || !statusSaude || !telefone || !email) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    let numero = parseInt(id);
    let numIDade=parseInt(idade)
    console.log(id)
    await fetch("http://localhost/nutris_api/update.php", {
    method:"PUT",
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(
      {id: numero, nome, idade: numIDade,historico, objetivo,genero,statusSaude, telefone , email, senha })
  
})

.then((response)=>response.json())
.then((responseJson)=>{
    console.log(responseJson)
  })
  window.location.href = "/pacientes";
 // console.log( {id: numero, nome, idade: numIDade,historico, objetivo,statusSaude, telefone , email, senha })
  };

  return (
    <div className="container mt-5 bg-light p-4 rounded">
      <h1 className="text-center mb-4">Atualizar um paciente</h1>
      <form onSubmit={atualizarPaciente}>
        <div className="form-group">
          {/* Restante dos campos do formulário aqui */}

          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            name="nome"
            className="form-control mb-3"
            onChange={e=>setNome(e.target.value)}
            id="nome"
            placeholder="informe seu nome"
            value={nome}
          />

<label for="idade">Idade</label>
    <input type="number"  
    name='idade' 
    class="form-control mb-3" 
    id="idade"
        onChange={e=>setIdade(e.target.value)} 
        value={idade}
         placeholder="informe sua idade"/> 
   
    <label for="genero">Genero</label>
    <input type="text" 
     name='genero' 
     class="form-control mb-3" id="genero" 
      onChange={e=>setGenero(e.target.value)} 
      value={genero} 
    placeholder="informe o genero(M-F-T)"/>
   
     <label for="historico">Histórico</label>
<textarea type="text"  
name='historico' class="form-control mb-3" id="historico" 
  onChange={e=>setHistorico(e.target.value)}
   value={historico} 
 placeholder="Informe o histórico"/> 
      <label for="objetivo">Objetivo</label>
    <input type="text"
      name='objetivo' 
      class="form-control mb-3" id="objetivo" 
      onChange={e=>setObjetivo(e.target.value)}
       value={objetivo} 
  placeholder="informe o objetivo"/>
            
    <label for="statusSaude">status da saúde</label>
    <textarea type="text" 
     name='statusSaude' class="form-control mb-3"
      id="statusSaude"
       onChange={e=>setstatusSaude(e.target.value)} 
       value={statusSaude} 
       placeholder="Informe o status da saúde"/>
    
    <label for="senha">Senha</label>
    <input type="text"
      name='senha' 
      class="form-control mb-3" id="senha" 
      onChange={e=>setSenha(e.target.value)}
       value={senha} 
  placeholder="informe o senha"/>

     <label for="email">Email </label>
    <input type="email"
      name='email' 
      class="form-control mb-3"
       id="email" 
      onChange={e=>setEmail(e.target.value)}
       value={email}   placeholder="informe o email"/> 
    
    <label for="telefone">Telefone</label>
    <input type="text"
      name='telefone' 
      class="form-control mb-3" id="telefone" 
      onChange={e=>setTelefone(e.target.value)}
       value={telefone} 
  placeholder="informe o telefone"/>
            

          <button type="submit" className="btn btn-primary mb-2 w-100">
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
};
