import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Pacientes} from './pages/paciente/Pacientes'
import {Cadastro} from './pages/paciente/Cadastro'
import {Atualizar} from './pages/paciente/Atualizar'

import { Navbar } from './navbar/Navbar'
export const Router=()=>{
return(
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path='/pacientes' element={<Pacientes/>}/>
        <Route path='/cadastro' element={<Cadastro/>}/>
        <Route path='/atualizar' element={<Atualizar/>}/>
    </Routes>
    </BrowserRouter>
)
}