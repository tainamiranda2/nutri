import {  React } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

export const Navbar =()=>{
return(
    <div>

<nav  className="navbar navbar-expand-lg navbar-info bg-dark">
<ul className="nav justify-content-end">
 <li className='nav-item'>
    <Link  className='nav-link text-white' to='/pacientes'>Todos pacientes</Link> 
    </li>
    <li  className='nav-item'>
    <Link  className='nav-link text-white' to='/cadastro'>Cadastrar pacientes</Link> 
    </li>
    <li  className='nav-item'>
    <Link  className='nav-link text-white' to='/'>Home</Link> 
    </li>
   
</ul>
</nav>
</div>
)
}