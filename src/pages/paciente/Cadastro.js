import { useState, React,useEffect } from 'react'

export const Cadastro =()=>{

    const  [paciente, setPacientes] =useState({
        nome:'',
        idade: '',
        genero: '',
        historico: '',
        objetivo: '',
        statusSaude: '',
        email: '',
        telefone: '',
    })

  //  const [name, setName]=useState('')
    
const valorInput=e=>setPacientes({...paciente, [e.target.name]: e.target.value})
   
const cadastrarPaciente=async e =>{
    e.preventDefault()
    await fetch("http://localhost/nutris_api/create.php",{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            tipo_entidade: 'paciente', 
            entidade: paciente
        })
    })
    .then((response)=>response.json())
    .then((responseJson)=>(
            console.log(responseJson)
        ))

   // console.log(paciente.nome)
}
return(
    <div  className="container mt-5 bg-light p-4 rounded">
        <h1  className="text-center mb-4">Cadastre um paciente</h1>
        <form onSubmit={cadastrarPaciente}>
            <div className="form-group">

            <label for="nome">Nome</label>
    <input type="text" name='nome' class="form-control mb-3" onChange={valorInput} id="nome" placeholder="informe seu nome"/>
    
    <label for="idade">Idade</label>
    <input type="number"  name='idade' class="form-control mb-3" id="idade" onChange={valorInput} placeholder="informe sua idade"/> 
   
    <label for="genero">Genero</label>
    <input type="text"  name='genero' class="form-control mb-3" id="genero" onChange={valorInput}  placeholder="informe o genero(M-F-T)"/>
   
     <label for="historico">Histórico</label>
<textarea type="text"  name='historico' class="form-control mb-3" id="historico" onChange={valorInput}  placeholder="Informe o histórico"/> 
    
    <label for="statusSaude">status da saúde</label>
    <textarea type="text"  name='statusSaude' class="form-control mb-3" id="statusSaude" onChange={valorInput}  placeholder="Informe o status da saúde"/>
    
     <label for="email">Email </label>
    <input type="email"  name='email' class="form-control mb-3" id="email" onChange={valorInput}  placeholder="informe o email"/> 
    
    <label for="telefone">Telefone</label>
    <input type="tel"  name='telefone' class="form-control mb-3" id="telefone" onChange={valorInput}  placeholder="informe o telefone"/>
            
            </div>
            <button class="btn btn-primary mb-2 w-100">Cadastrar</button>
        </form>
    </div>
)
}
