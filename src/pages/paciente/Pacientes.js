import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export const Pacientes = () => {
  const [data, setData] = useState([]);

  const getPacientes = async () => {
    try {
      const response = await fetch("http://localhost/nutris_api/?tipo=pacientes");
      if (!response.ok) {
        throw new Error('Erro ao obter dados');
      }
      const responseJson = await response.json();

      // Extrair os valores dos registros
      const registros = Object.values(responseJson.records);

      setData(registros);
    } catch (error) {
      console.error('Erro na requisição:', error.message);
    }
  };

  const apagarPaciente=async (idPaciente)=>{
    await fetch("http://localhost/nutris_api/delete.php?id="+idPaciente)
    .then((response)=>response.json())
    .then((responseJson)=>{
      console.log(responseJson)
    }).catch(()=>{
      console.log("Erro");

    })
    getPacientes();
  }

  useEffect(() => {
    getPacientes();
  }, []);

  return (
    <div>
      <h1>Lista de pacientes cadastrados</h1>
      {data && data.length === 0 ? (
        <p>Nenhum paciente encontrado.</p>
      ) : (
        <>
        <table className='table table-borderless table-dark'>
         <thead>
          <tr>
            <th scope="col" >Nome</th>
            <th scope="col">Idade</th>
            <th scope="col">Genero</th>
            <th scope="col">Histórico</th>
            <th scope="col">Status de sáude</th>
            <th scope="col">Email</th>
            <th scope="col">telefone</th>
            <th scope="col">ações</th>
            </tr>
           </thead>
          {data.map((item) => (
            <tbody key={item.id} className="jumbotron jumbotron-fluid primary">
          <tr>
                <td > {item.nome}</td>
                <td > {item.idade}</td>
                <td > {item.genero}</td>

                <td > {item.historico}</td>
                <td >{item.statusSaude}</td>
                <td > {item.email}</td>
                <td >{item.telefone}</td>
    <td>
      <Link to={"/atualizar/"+ item.id}>
        <button class="btn btn-primary">Editar</button>
      </Link>
<button class="btn btn-danger"
 onClick={()=>apagarPaciente(item.id)}>Apagar</button>
    </td>
                </tr>
            </tbody>
          ))}
          </table>
        </>
      )}
    </div>
  );
};
