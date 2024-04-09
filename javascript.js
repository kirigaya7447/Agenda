var cont = 0;

function agendar() {
    let titulo = document.getElementById("tituloTarefa").value;
    let descricao = document.getElementById("descricaoTarefa").value;
    const tarefas = document.getElementById("listaTarefas");

    cont += 1;
    let li = document.createElement("li");
    li.id = "liLista" + cont;
    li.innerText = titulo;

    tarefas.append(li);

    let ol = document.createElement("ol");
    ol.type = "a";
    ol.id = "olLista" + cont;

    tarefas.append(ol);

    let li2 = document.createElement("li");
    li2.innerText = descricao;
    ol.append(li2);

    let button = document.createElement("button");
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
}