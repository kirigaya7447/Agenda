var cont = 0;
contador = 0;
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

    tarefas.append(li);

    let ol = document.createElement("ol");
    ol.type = "A";
    ol.classList.add("olLista");
    ol.id = "olLista" + cont;

    tarefas.append(ol);

    let li2 = document.createElement("li");
    li2.innerText = "Descrição:";
    ol.append(li2);

    let li3 = document.createElement("li");
    li3.innerText = descricao;
    ol.append(li3);

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
    let ol = document.getElementById("olLista" + id);
    let button = document.getElementById("buttonLista" + id);

    li.parentElement.removeChild(li);
    ol.parentElement.removeChild(ol);
    button.parentElement.removeChild(button);

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

function trocarFormatoSequencia2() {
    let allOls = document.querySelectorAll(".olLista");
    allOls.forEach(element =>{
        switch (element.type) {
            case "1":
                element.type = "a";
                break;
            case "a":
                element.type = "A";
                break;
            case "A":
                element.type = "i";
                break;
            case "i":
                element.type = "I";
                break;
            case "I":
                element.type = "1";
                break;
        }  
    })
    /*switch (tipo) {
            case "1":
                document.querySelectorAll(".ollista").type = "a";
                break;
            case "a":
                document.querySelectorAll(".ollista").type = "A";
                break;
            case "A":
                document.querySelectorAll(".ollista").type = "i";
                break;
            case "i":
                document.querySelectorAll(".ollista").type = "I";
                break;
            case "I":
                document.querySelectorAll(".ollista").type = "1";
                break;
        }*/
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