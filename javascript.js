function agendar(){
    let titulo = document.getElementById("tituloTarefa").value;
    let descricao = document.getElementById("descricaoTarefa").value;
    const tarefas = document.getElementById("listaTarefas");

    let li = document.createElement("li");
    li.innerHTML = titulo;

    tarefas.append(li);

    let ol = document.createElement("ol");
    ol.type = "a";

    tarefas.append(ol);

    let li2 = document.createElement("li");
    li2.innerHTML = descricao;
    ol.append(li2);

    document.getElementById("tituloTarefa").value = null;
    document.getElementById("descricaoTarefa").value = null;
}