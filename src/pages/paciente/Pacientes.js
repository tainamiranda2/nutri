import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


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

  const confirmarExclusao = (idPaciente) => {
    if (window.confirm("Tem certeza que deseja excluir este paciente?")) {
      apagarPaciente(idPaciente);
    }
  };

  const apagarPaciente = async (idPaciente) => {
    await fetch("http://localhost/nutris_api/delete.php?id=" + idPaciente)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch(() => {
        console.log("Erro");
      });
    getPacientes();
  };


  const gerarPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#tabela-pacientes' });
    doc.save('lista_pacientes.pdf');
  };
  
  useEffect(() => {
    getPacientes();
  }, []);

  return (
    <div>
      <h1 className="mb-4">Lista de Pacientes Cadastrados</h1>
      <div className="mb-3">
        <button className="btn btn-danger" onClick={gerarPDF} title="Gerar PDF">
          <FontAwesomeIcon icon={faFilePdf} /> Gerar PDF
        </button>
      </div>
      {data && data.length === 0 ? (
        <p>Nenhum paciente encontrado. Comece cadastrando alguns!</p>
      ) : (
        <>
          <table id="tabela-pacientes" className='table table-bordered table-dark table-responsive'>
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Idade</th>
                <th scope="col">Gênero</th>
                <th scope="col">Histórico</th>
                <th scope="col">Status de saúde</th>
                <th scope="col">Email</th>
                <th scope="col">Telefone</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>{item.idade}</td>
                  <td>{item.genero}</td>
                  <td>{item.historico}</td>
                  <td>{item.statusSaude}</td>
                  <td>{item.email}</td>
                  <td>{item.telefone}</td>
                  <td>
                    <Link to={"/atualizar/" + item.id}>
                      <button className="btn btn-primary" title="Editar">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => confirmarExclusao(item.id)}
                      title="Excluir"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
