//cont é o id de cada li que será único
var cont = 0;
//contador inicia-se junto do cont mas pode ser subtraído
var contador = 0;

//array que armazena os títulos das tarefas
var tarefasArrayTitulo = new Array();
//array que armazena os textos das tarefas
var tarefasArrayTexto = new Array();

//verifica a contagem e printa a quantidade de atividades
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

    //cria uma tag li 
    let li = document.createElement("li");
    //adiciona uma class
    li.classList.add("liLista");
    //coloca o id baseado no contador
    li.id = "liLista" + cont;
    //escreve o título do usuário
    li.innerText = titulo;

    //cria uma tag p
    let p = document.createElement("p");
    //cria um id baseado no contador
    p.id = "paragrafoDescricao" + cont;
    //coloca o texto "Descrição:"
    p.innerText = "Descrição:";

    //cria mais uma tag p
    let p1 = document.createElement("p");
    //adiciona o id baseado no contador
    p1.id = "paragrafo" + cont;
    //escreve o texto do usuário
    p1.innerText = descricao;

    //seta o li, o primeiro p e o segundo
    tarefas.append(li);
    tarefas.append(p);
    tarefas.append(p1);

    //cria um botão
    let button = document.createElement("button");
    //adiciona uma class
    button.classList.add("buttonLista");
    //adiciona mais uma class
    button.classList.add("buttonListaConcluido");
    //coloca um id baseado no contador
    button.id = "buttonLista" + cont;
    //seta o tipo do botão
    button.type = "button";
    //escreve o texto do botão
    button.innerText = "Concluído";
    //seta o valor do botão como o do contador
    button.value = cont;
    //adiciona uma função para o onclick do botão
    button.onclick = function () {
        apagar(this.value);
    }

    //adiciona o botão
    tarefas.append(button);

    //cria mais um botão
    let buttonSobe = document.createElement("button");
    //adiciona um class
    buttonSobe.classList.add("buttonLista");
    //adiciona mais um class
    buttonSobe.classList.add("buttonListaSubir");
    //adiciona o id baseado no contador
    buttonSobe.id = "buttonSobe" + cont;
    //especifica o tipo do botão
    buttonSobe.type = "button";
    //escreve o texto do botão
    buttonSobe.innerText = "Subir";
    //define o valor do botão como o do contador
    buttonSobe.value = cont;
    //adiciona função para o onclick
    buttonSobe.onclick = function () {
        subirTarefa(this.value);
    }

    //adiciona o botão
    tarefas.append(buttonSobe);

    //Adiciona ao array de titulos o nome da nova tarefa
    tarefasArrayTitulo.push(titulo);
    //Adiciona ao array de textos o texto da nova tarefa
    tarefasArrayTexto.push(descricao);

    //seta no localstorage o array Titulo atualizado
    localStorage.setItem("TarefasTitulo", tarefasArrayTitulo);
    //seta no localstorage o array Texto atualizado
    localStorage.setItem("TarefasTexto", tarefasArrayTexto);

    //zera o texto do título no html
    document.getElementById("tituloTarefa").value = null;
    //zera o texto do parágrafo no html
    document.getElementById("descricaoTarefa").value = null;
}

function apagar(id) {
    let li = document.getElementById("liLista" + id);
    let liTitulo = li.innerText;
    let p = document.getElementById("paragrafoDescricao" + id);
    let p1 = document.getElementById("paragrafo" + id);
    let p1Texto = p1.innerText;
    let button = document.getElementById("buttonLista" + id);
    let buttonSobe = document.getElementById("buttonSobe" + id);

    //corta os arrays, separando as partes pela vírgula
    
    let corteTitulo = localStorage.getItem("TarefasTitulo").split(",");
    let corteTexto = localStorage.getItem("TarefasTexto").split(",");

    //zera os arrays
    tarefasArrayTitulo = new Array();
    tarefasArrayTexto = new Array();


    //loop para montar novo array sem as partes apagadas
    for (let cont = 0; cont < corteTitulo.length; cont++) {
        
        //verifica o título
        if (corteTitulo[cont] !== liTitulo) {
            tarefasArrayTitulo.push(corteTitulo[cont]);
        }

        //verifica o texto
        if (corteTexto[cont] !== p1Texto) {
            tarefasArrayTexto.push(corteTexto[cont])
        }
    }

    //apaga todo o conteúdo
    li.parentElement.removeChild(li);
    p.parentElement.removeChild(p);
    p1.parentElement.removeChild(p1);
    button.parentElement.removeChild(button);
    buttonSobe.parentElement.removeChild(buttonSobe);

    //abaixa o contador se ele for maior ou igual que 1
    if (contador >= 1) {
        contador -= 1;
    }

    //seta no localstorage os arrays atualizados
    localStorage.setItem("TarefasTitulo", tarefasArrayTitulo);
    localStorage.setItem("TarefasTexto", tarefasArrayTexto);
}

//altera o padrão de sequência da lista ordenada
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

//altera para crescente ou decrescente o padrão da lista
function trocarOrdemSequencia() {
    let invertido = document.getElementById("listaTarefas").reversed;
    if (invertido) {
        document.getElementById("listaTarefas").reversed = false;
    }
    else {
        document.getElementById("listaTarefas").reversed = true;
    }
}

//alterna os textos e títulos de tarefas para que elas troquem de posição
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

//zera todo o conteúdo do localstorage
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

//verifica se já há dados no localstorage
function verificarTarefa() {
    if (localStorage.getItem("TarefasTitulo") != null) {
        tarefasArrayTitulo.push(localStorage.getItem("TarefasTitulo"));
        tarefasArrayTexto.push(localStorage.getItem("TarefasTexto"));

        let corteTitulo = tarefasArrayTitulo[0].split(",");
        let corteTexto = tarefasArrayTexto[0].split(",");

        for (let cont = 0; cont < corteTitulo.length; cont++) {
            tarefasProntas(corteTitulo[cont], corteTexto[cont]);
        }
    }

}

//coleta os dados do localstorage e monta o conteúdo
function tarefasProntas(titulo, tarefa) {
    const tarefas = document.getElementById("listaTarefas");

    cont += 1;
    contador += 1;

    //cria uma tag li
    let li = document.createElement("li");
    //adiciona a class
    li.classList.add("liLista");
    //adiciona o id baseado no contador
    li.id = "liLista" + cont;
    //escreve o título com o dado do localstorage
    li.innerText = titulo;

    //cria uma tag p
    let p = document.createElement("p");
    //adiciona o id baseado no contador
    p.id = "paragrafoDescricao" + cont;
    //coloca o texto como Descrição
    p.innerText = "Descrição:";

    //cria uma tag p
    let p1 = document.createElement("p");
    //adiciona o id baseado no contador
    p1.id = "paragrafo" + cont;
    //adiciona o texto baseado no localstorage
    p1.innerText = tarefa;

    //adiciona as três tags
    tarefas.append(li);
    tarefas.append(p);
    tarefas.append(p1);

    //cria o botão
    let button = document.createElement("button");
    //adiciona o class
    button.classList.add("buttonLista");
    //adiciona mais um class
    button.classList.add("buttonListaConcluido");
    //cria um id baseado no contador
    button.id = "buttonLista" + cont;
    //define o tipo
    button.type = "button";
    //escreve o texto
    button.innerText = "Concluído";
    //define o valor dele como o do contador 
    button.value = cont;
    //coloca uma função no onclick
    button.onclick = function () {
        apagar(this.value);
    }

    //adiciona o botão
    tarefas.append(button);

    //cria um botão
    let buttonSobe = document.createElement("button");
    //adiciona um class
    buttonSobe.classList.add("buttonLista");
    //adiciona mais um class
    buttonSobe.classList.add("buttonListaSubir");
    //coloca um id baseado no contador
    buttonSobe.id = "buttonSobe" + cont;
    //seleciona o tipo do botão
    buttonSobe.type = "button";
    //escreve o texto
    buttonSobe.innerText = "Subir";
    //define o valor como o do cont
    buttonSobe.value = cont;
    //coloca uma função no onclick
    buttonSobe.onclick = function () {
        subirTarefa(this.value);
    }

    //adiciona o botão
    tarefas.append(buttonSobe);
}