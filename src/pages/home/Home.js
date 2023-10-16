import {  React } from 'react';
import MinhaImagem from './medico.png';

export const Home =()=>{
    return(
        <div>
            <h1  className="text-center">Bem-vindo!</h1>
            <h3  className="text-center">Aqui você pode cadastrar novos pacientes, editar informações existentes ou remover registros. Explore as opções disponíveis para gerenciar os dados dos seus pacientes de maneira fácil e eficiente.</h3>
            <img src={MinhaImagem} alt="Descrição da Imagem" className="img-fluid"/>

        </div>
    )
}