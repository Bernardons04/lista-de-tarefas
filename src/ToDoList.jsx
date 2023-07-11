import React, {useState, useEffect} from "react";
import './ToDoList.css'
import Icone from './assets/toDoIcon.png';

function ToDoList() {

    const localStorageKey = 'toDoListBernardo'
    let values = JSON.parse(localStorage.getItem(localStorageKey))
    const [lista, setLista] = useState(localStorage.getItem(localStorageKey) ? values : []);
    const [novoItem, setNovoItem] = useState("");
    const inputEntrada = document.getElementById('input-entrada')

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(lista))
    }, [lista])

    function adicionarItem(){
        if(inputEntrada.value == "") {
            alert('Digite algo para inserir em sua lista!')       
            return
        } else if (validarNovaTask()) {
            alert('A task que você digitou ja está na lista, não é possível adicionar itens repetidos!')
        } else {
            setLista([...lista, { text: novoItem, isCompleted: false }]);
            document.getElementById('input-entrada').focus();
            localStorage.setItem(localStorageKey, JSON.stringify(lista))
        }
        setNovoItem("")
    }

    function validarNovaTask() {
        let existe;
        for (const element of lista) {
            if (element.text == inputEntrada.value) {
                existe = true;
                break;
            } else {
                existe = false
            }
        }
        return existe
    }

    function clicou(index) {
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deletar(index) {
        const listaAux = [...lista];
        listaAux.splice(index, 1)
        setLista(listaAux);
        setNovoItem("");
    }

    function deletarConcluidas(e) {
        setLista(lista.filter(element => !element.isCompleted))
        localStorage.clear()
        localStorage.setItem(localStorageKey, JSON.stringify(lista))
        setNovoItem("");
        location.reload()
    }

    return (
        <div>
            <h1>| Lista de Tarefas |</h1>
            <div className="content">
                <input 
                id="input-entrada"
                onKeyUp={ (e) => {
                    if (e.keyCode == 13) {
                        adicionarItem();
                    }
                }}
                type="text" value={novoItem} onChange={(e) => { setNovoItem(e.target.value) }}
                placeholder="Digite uma tarefa"
                />
                <button id="botaoAdicao" className="add" onClick={adicionarItem} type="submit">Add</button>
            </div>
            <div className="listaTarefas">
                <div style={{textAlign: 'center'}}>
                    {
                        lista.length < 1
                            ?
                            <img className="iconeCentral" src={Icone} />
                            :
                            lista.map((item, index) => (
                                <div key={index} className={item.isCompleted ? "itemCompleto" : "item"} >
                                    <span onClick={() => { clicou(index) }}>{item.text}</span>
                                    <button className="delete" onClick={ () => { deletar(index) }} >Deletar</button>
                                </div>
                            ))
                    }
                </div>
            </div>
            { lista.length > 0 &&          
                <button className="deleteAll" onClick={deletarConcluidas}>Deletar Tarefas concluídas</button>
            }
        </div>
    )
}

export default ToDoList