import React, {useEffect, useState} from 'react';
import './Servico.css';
import axios from 'axios';

function Servico() {

    const [servico, setServico] = useState({nomeCliente: '', dataInicio: '', dataTermino: '', descricaoServico: '',valorServico: '', valorPago: '', dataPagamento:''})
    const [servicos, setServicos] = useState([]);
    const [atualizar, setAtualizar] = useState();

    useEffect(() => {
      axios.get('http://localhost:8080/servicos/listar').then(result => {
        setServicos(result.data);
      });
    }, [atualizar]); 

    function handleChange(event){
      setServico({...servico, [event.target.name]: event.target.value})
    }




    function handleSubmit(event){
      event.preventDefault();
      if(servico.id == undefined){
        axios.post('http://localhost:8080/servicos/cadastrar', servico).then(result => {
        setAtualizar(result); // valor da variavel mudando, ativa o useEffect
      });
    }else{
        axios.post('http://localhost:8080/servicos/cadastrar', servico).then(result => {
        setAtualizar(result); // valor da variavel mudando, ativa o useEffect
      });  
    }
    clear();
  }
    function buscarTodos(){
      axios.get('http://localhost:8080/servicos/listar').then(result => {
        setServicos(result.data); 
      });  
    }

    function buscarPendentes(){
      axios.get('http://localhost:8080/servicos/pendente').then(result => {
        setServicos(result.data); 
      });  
    }
    function buscarCancelado(){
      axios.get('http://localhost:8080/servicos/cancelados').then(result => {
        setServicos(result.data); 
      });  
    }



    function clear(){
      setServico({
      nomeCliente: '',
      valorServico: '',
      dataInicio: '',
      dataTermino: '',
      descricaoServico: '',
      valorPago: '',
      dataPagamento: ''

    });
    }

    function excluir(id){
      axios.delete("http://localhost:8080/servicos/deletar/"+id).then(result=>{
        setAtualizar(result);
      })
    }
    
    function cancelar(id){
      axios.post("http://localhost:8080/servicos/cancelar/"+id).then(result=>{
        setAtualizar(result);
      })
    }

    return (
      <div>
        <h1>Cadastro de Serviços</h1>
        <form onSubmit={handleSubmit}>
          <div className='col-6'>
            <div>
                <label className='form-label'>Nome do Cliente: </label>
                <input onChange = {handleChange} value={servico.nomeCliente} name='nomeCliente' type='text' className='form-control' required/>
            </div>
            <div>
                <label className='form-label'>Data de Início: </label>
                <input onChange = {handleChange} value={servico.dataInicio || ''} name='dataInicio' type='date' className='form-control'/>
            </div>
            <div>
                <label className='form-label'>Data de Término: </label>
                <input onChange = {handleChange} value={servico.dataTermino || ''} name='dataTermino' type='date' className='form-control'/>
            </div>
            <div>
                <label className='form-label'>Descrição: </label>
                <input onChange = {handleChange} value={servico.descricaoServico || ''} name='descricaoServico' type='text' className='form-control' required/>
            </div>
            <div>
                <label className='form-label'>Valor Serviço: </label>
                <input onChange = {handleChange} value={servico.valorServico || ''} name='valorServico' type='number' className='form-control' required/>
            </div>
            <div>
                <label className='form-label'>Valor Pago: </label>
                <input onChange = {handleChange} value={servico.valorPago || ''} name='valorPago' type='number' className='form-control'/>
            </div>
            <div>
                <label className='form-label'>Data de pagamento: </label>
                <input onChange = {handleChange} value={servico.dataPagamento || ''} name='dataPagamento' type='date' className='form-control'/>
            </div>

            <input className='btn btn-success' type="submit" value="cadastrar" />
            
  
          </div>
        </form>
        <hr />
          <button onClick={buscarTodos} type='button' class="btn btn-primary">Listar Todos</button>
          <button onClick={buscarCancelado} type='button' class="btn btn-secondary">Listar Cancelados</button>
          <button onClick={buscarPendentes} type='button' class="btn btn-success">Listar Pendentes</button>


        <table class="table">
          <thead>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Status</th>
            <th scope="col">opções  </th>

          </thead>
          <tbody>
            {
              servicos.map(serv => (
                <tr key={serv.id}>
                  <td>{serv.nomeCliente}</td>
                  <td>{serv.descricaoServico}</td>
                  <td>{serv.valorServico}</td>
                  <td>{serv.status}</td>
                  <td>
                    
                    {serv.status != 'CANCELADO' &&(<button onClick={()=>setServico(serv)} className='btn btn-primary'>Alterar</button>)}
                    {serv.status != 'CANCELADO' &&(<button  onClick={()=> excluir(serv.id)} className='btn btn-danger'>Excluir</button>)}
                  
                    <button onClick={()=>cancelar(serv.id)} className='btn btn-warning'>Cancelar</button>
                  </td>
                </tr>

              ))}
          </tbody>

        </table>

      </div>
    );
  }
  
  export default Servico;
  