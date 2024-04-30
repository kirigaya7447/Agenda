//cont é o id de cada li que será único
var cont = 0;
//contador inicia-se junto do cont mas pode ser subtraído
var contador = 0;

var tarefasArrayTitulo = new Array();
var tarefasArrayTexto = new Array();
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
    button.classList.add("buttonListaConcluido");
    button.id = "buttonLista" + cont;
    button.type = "button";
    button.innerText = "Concluído";
    button.value = cont;
    button.onclick = function () {
        apagar(this.value);
    }
    tarefas.append(button);

    let buttonSobe = document.createElement("button");
    buttonSobe.classList.add("buttonLista");
    buttonSobe.classList.add("buttonListaSubir");
    buttonSobe.id = "buttonSobe" + cont;
    buttonSobe.type = "button";
    buttonSobe.innerText = "Subir";
    buttonSobe.value = cont;
    buttonSobe.onclick = function () {
        subirTarefa(this.value);
    }

    tarefas.append(buttonSobe);
    tarefasArrayTitulo.push(titulo);
    tarefasArrayTexto.push(descricao);
    localStorage.setItem("TarefasTitulo", tarefasArrayTitulo);
    localStorage.setItem("TarefasTexto", tarefasArrayTexto);

    document.getElementById("tituloTarefa").value = null;
    document.getElementById("descricaoTarefa").value = null;
}

function apagar(id) {
    let li = document.getElementById("liLista" + id);
    let liTitulo = document.getElementById("liLista" + id).innerText;
    let p = document.getElementById("paragrafoDescricao" + id);
    let p1 = document.getElementById("paragrafo" + id);
    let p1Texto = document.getElementById("paragrafo" + id).innerText;
    let button = document.getElementById("buttonLista" + id);
    let buttonSobe = document.getElementById("buttonSobe" + id);

    let corteTitulo = tarefasArrayTitulo[0].split(",");
    let corteTexto = tarefasArrayTexto[0].split(",");

    tarefasArrayTitulo = new Array();
    tarefasArrayTexto = new Array();
    for (let cont = 0; cont < corteTitulo.length; cont++) {

        if (corteTitulo[cont] !== liTitulo) {
            tarefasArrayTitulo.push(corteTitulo[cont]);
        }
        if (corteTexto[cont] !== p1Texto) {
            tarefasArrayTexto.push(corteTexto[cont])
        }
    }

    li.parentElement.removeChild(li);
    p.parentElement.removeChild(p);
    p1.parentElement.removeChild(p1);
    button.parentElement.removeChild(button);
    buttonSobe.parentElement.removeChild(buttonSobe);

    if (contador >= 1) {
        contador -= 1;
    }

    localStorage.setItem("TarefasTitulo", tarefasArrayTitulo);
    localStorage.setItem("TarefasTexto", tarefasArrayTexto);
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

function subirTarefa(id) {
    let paragrafoTitulo = document.getElementById("liLista" + id).innerText;
    let paragrafoTexto = document.getElementById("paragrafo" + id).innerText;

    let paragrafoTituloAntigo = document.getElementById("liLista" + (id - 1)).innerText;
    let paragrafoTextoAntigo = document.getElementById("paragrafo" + (id - 1)).innerText;

    document.getElementById("liLista" + id).innerText = paragrafoTituloAntigo;
    document.getElementById("paragrafo" + id).innerText = paragrafoTextoAntigo;

    document.getElementById("liLista" + (id - 1)).innerText = paragrafoTitulo;
    document.getElementById("paragrafo" + (id - 1)).innerText = paragrafoTexto;
}

function resetStorage() {
    localStorage.removeItem("TarefasTitulo");
    localStorage.removeItem("TarefasTexto");
    tarefasArrayTitulo = new Array();
    tarefasArrayTexto = new Array();
    document.getElementById("listaTarefas").innerHTML = "";
    contador = 0;
    cont = 0;
    alert("Removido com sucesso!");
}

function verificarTarefa() {
    if (localStorage.getItem("TarefasTitulo") != null) {
        tarefasArrayTitulo.push(localStorage.getItem("TarefasTitulo"));
        tarefasArrayTexto.push(localStorage.getItem("TarefasTexto"));

        let corteTitulo = tarefasArrayTitulo[0].split(",");
        let corteTexto = tarefasArrayTexto[0].split(",");

        for (let a = 0; a < corteTitulo.length; a++) {
            tarefasProntas(corteTitulo[a], corteTexto[a]);
        }
    }

}

function tarefasProntas(titulo, tarefa) {
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
    p1.innerText = tarefa;

    tarefas.append(li);
    tarefas.append(p);
    tarefas.append(p1);

    let button = document.createElement("button");
    button.classList.add("buttonLista");
    button.classList.add("buttonListaConcluido");
    button.id = "buttonLista" + cont;
    button.type = "button";
    button.innerText = "Concluído";
    button.value = cont;
    button.onclick = function () {
        apagar(this.value);
    }
    tarefas.append(button);

    let buttonSobe = document.createElement("button");
    buttonSobe.classList.add("buttonLista");
    buttonSobe.classList.add("buttonListaSubir");
    buttonSobe.id = "buttonSobe" + cont;
    buttonSobe.type = "button";
    buttonSobe.innerText = "Subir";
    buttonSobe.value = cont;
    buttonSobe.onclick = function () {
        subirTarefa(this.value);
    }

    tarefas.append(buttonSobe);
}