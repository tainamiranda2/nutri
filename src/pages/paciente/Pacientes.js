import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
          {data.map((item) => (
            <div key={item.id} className="jumbotron jumbotron-fluid primary">
              <div className="container">
                <h2 className="display-4">Nome: {item.nome}</h2>
                <p className="lead">Idade: {item.idade}</p>
                <p className="lead">Genero: {item.genero}</p>

                <p className="lead">Histórico: {item.historico}</p>
                <p className="lead">Status de saúde: {item.statusSaude}</p>
                <p className="lead">Email: {item.email}</p>
                <p className="lead">Telefone: {item.telefone}</p>
    

              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
