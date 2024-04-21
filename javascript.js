//cont é o id de cada li que será único
var cont = 0;
//contador inicia-se junto do cont mas pode ser subtraído
contador = 0;

//verifica a contagem e printa
setInterval(function () {
    if (contador > 1) {
        document.getElementById("contador").innerText = "Você tem " + contador + " tarefas para concluir";
    }
    else if (contador == 1) {
        document.getElementById("contador").innerText = "Você tem " + contador + " tarefa para concluir";
    }
    else {
        document.getElementById("contador").innerText = "Você tem 0 tarefas";
    }
}, 500);

function agendar() {
    let titulo = document.getElementById("tituloTarefa").value;
    let descricao = document.getElementById("descricaoTarefa").value;
    const tarefas = document.getElementById("listaTarefas");

    cont += 1;
    contador += 1;
    let li = document.createElement("li");
    li.classList.add("liLista");
    li.id = "liLista" + cont;
    li.innerText = titulo;

    let p = document.createElement("p");
    p.id = "paragrafoDescricao" + cont;
    p.innerText = "Descrição:";

    let p1 = document.createElement("p");
    p1.id = "paragrafo" + cont;
    p1.innerText = descricao;

    tarefas.append(li);
    tarefas.append(p);
    tarefas.append(p1);

    let button = document.createElement("button");
    button.classList.add("buttonLista");
    button.id = "buttonLista" + cont;
    button.type = "button";
    button.innerText = "Concluído";
    button.value = cont;
    button.onclick = function () {
        apagar(this.value);
    }
    tarefas.append(button);

    document.getElementById("tituloTarefa").value = null;
    document.getElementById("descricaoTarefa").value = null;
}

function apagar(id) {
    let li = document.getElementById("liLista" + id);
    let button = document.getElementById("buttonLista" + id);
    let p = document.getElementById("paragrafoDescricao" + id);
    let p1 = document.getElementById("paragrafo" + id);

    li.parentElement.removeChild(li);
    button.parentElement.removeChild(button);
    p.parentElement.removeChild(p);
    p1.parentElement.removeChild(p1);

    if (contador >= 1) {
        contador -= 1;
    }
}

function trocarFormatoSequencia() {
    let tipo = document.getElementById("listaTarefas").type;
    switch (tipo) {
        case "1":
            document.getElementById("listaTarefas").type = "a";
            break;
        case "a":
            document.getElementById("listaTarefas").type = "A";
            break;
        case "A":
            document.getElementById("listaTarefas").type = "i";
            break;
        case "i":
            document.getElementById("listaTarefas").type = "I";
            break;
        case "I":
            document.getElementById("listaTarefas").type = "1";
            break;
    }
}

function trocarOrdemSequencia() {
    let invertido = document.getElementById("listaTarefas").reversed;
    if (invertido) {
        document.getElementById("listaTarefas").reversed = false;
    }
    else {
        document.getElementById("listaTarefas").reversed = true;
    }
}