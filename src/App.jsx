import {useState} from 'react';

function App() {

  const [mensagem,setMensagem] = useState("");
  const [nome, setNome] = useState("");
  const [profissao, setProfissao] = useState("");

  const getOla = async () => {// vou criar um local para armazenar o resultado (o consumo) para poder exibir na tela
    await fetch('http://localhost:3002/ola') // funcao que vai gerar um callback, ai terei uma manbeira de gerenciar ele
          .then(response => response.json()) // quando tiver o callback do fecth pega um json (primeiro callback)
          .then(json => setMensagem(json)) // e depois do callback do primeiro callback, depois de extrair o json, eu vou jogar o conteudo do retorno nas varuaveius
          .catch(err => console.log('Erro: ' + err))
  }

  const enviar = async () => {   // primeiro parametro é o endereço, e sehgundo é a sopções que vou colocar para ele (que sera um json)
    await fetch('http://localhost:3002/ola', 
      {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({"nome" : nome, "profissao" : profissao})// corpo da requisição
      }).then(response => response.json())
      .then(json => setMensagem("Nome: " + json.nome 
                  + " Profissão: " + json.profissao + "Mensagem: " + json.mensagem))
      .catch(err => console.log("Erro: " + err))
  
  }

  return (
    <div>
      <h1>{mensagem}</h1>
      <button onClick={ () => getOla() }>Olá</button>
    
    <br/>
    Nome: <input type="text" value={nome} 
      onChange={ e => setNome(e.target.value)} /> <br/>
    Profissão: <input type="text" value={profissao} 
      onChange={ e => setProfissao(e.target.value)} />
      <button onClick={ () => enviar()}>Enviar POST</button>
    </div>
  );
}

export default App;
