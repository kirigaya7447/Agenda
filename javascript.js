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

    if (titulo === null || titulo === "" || titulo === " ") {
        //mensagem de alerta sobre título vazio aplicada
        document.getElementById("tituloVazio").style.color = "rgb(231, 208, 2)";
        document.getElementById("tituloVazio").style.display = "inline-block";
    }
    else {
        //mensagem de alerta sobre título vazio apagada
        document.getElementById("tituloVazio").style.color = "rgb(12, 11, 12)";
        document.getElementById("tituloVazio").style.display = "none";

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

        //seta o li
        tarefas.append(li);

        //cria uma tag p
        var p = document.createElement("p");
        //cria um id baseado no contador
        p.id = "paragrafoDescricao" + cont;

        //cria mais uma tag p
        var p1 = document.createElement("p");
        //adiciona o id baseado no contador
        p1.id = "paragrafo" + cont;

        //verifica se a descrição não está vazia
        if (descricao !== null && descricao !== "" && descricao !== " ") {
            //coloca o texto "Descrição:"
            p.innerText = "Descrição:";

            //escreve o texto do usuário
            p1.innerText = descricao;
        }
        //acrescenta agora o primeiro p e o segundo
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
}

function apagar(id) {
    let li = document.getElementById("liLista" + id);
    let liTitulo = li.innerText;
    let p = document.getElementById("paragrafoDescricao" + id);

    if (p !== null && p !== "" && p !== " ") {
        var p1 = document.getElementById("paragrafo" + id);
        var p1Texto = p1.innerText;
    }
    let button = document.getElementById("buttonLista" + id);
    let buttonSobe = document.getElementById("buttonSobe" + id);

    //abaixa o contador
    contador -= 1;

    //verifica se o contador é maior ou igual a 1
    // se maior ou igual ele apaga a tarefa, senão ele apaga o localstorage
    if (contador >= 1) {

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
            if (corteTexto[cont] !== p1Texto && p1Texto !== null && p1Texto !== "" && p1Texto !== " ") {
                tarefasArrayTexto.push(corteTexto[cont])
            }
        }


        //apaga todo o conteúdo
        li.parentElement.removeChild(li);

        if (p !== null && p !== "" && p !== " ") {
            p.parentElement.removeChild(p);
            p1.parentElement.removeChild(p1);
        }

        button.parentElement.removeChild(button);
        buttonSobe.parentElement.removeChild(buttonSobe);

        //seta no localstorage os arrays atualizados
        localStorage.setItem("TarefasTitulo", tarefasArrayTitulo);
        localStorage.setItem("TarefasTexto", tarefasArrayTexto);
    }
    else {
        //apaga todo o conteúdo
        li.parentElement.removeChild(li);

        if (p !== null && p !== "" && p !== " ") {
            p.parentElement.removeChild(p);
            p1.parentElement.removeChild(p1);

        }

        button.parentElement.removeChild(button);
        buttonSobe.parentElement.removeChild(buttonSobe);

        localStorage.removeItem("TarefasTitulo");
        localStorage.removeItem("TarefasTexto");
    }
}

//altera o padrão de sequência da lista ordenada
function trocarFormatoSequencia() {
    let tipo = document.getElementById("listaTarefas").type;
    switch (tipo) {
        case "1":
            document.getElementById("listaTarefas").type = "a";
            localStorage.setItem("FormatoTarefas", "a");
            break;
        case "a":
            document.getElementById("listaTarefas").type = "A";
            localStorage.setItem("FormatoTarefas", "A");
            break;
        case "A":
            document.getElementById("listaTarefas").type = "i";
            localStorage.setItem("FormatoTarefas", "i");
            break;
        case "i":
            document.getElementById("listaTarefas").type = "I";
            localStorage.setItem("FormatoTarefas", "I");
            break;
        case "I":
            document.getElementById("listaTarefas").type = "1";
            localStorage.setItem("FormatoTarefas", "1");
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
    localStorage.removeItem("FormatoTarefas");

    tarefasArrayTitulo = new Array();
    tarefasArrayTexto = new Array();

    document.getElementById("listaTarefas").innerHTML = "";
    contador = 0;
    cont = 0;
    alert("Removido com sucesso!");
}

//verifica se já há dados no localstorage
function initConfigurations() {
    if (localStorage.getItem("TarefasTitulo") !== null || localStorage.getItem("TarefasTitulo") !== "") {
        
        let intermediarioTitulo = [];
        let intermediarioTexto = [];

        intermediarioTitulo.push(localStorage.getItem("TarefasTitulo"));
        intermediarioTexto.push(localStorage.getItem("TarefasTexto"));

        let corteTitulo = intermediarioTitulo[0].split(",");
        let corteTexto = intermediarioTexto[0].split(",");

        for (let cont = 0; cont < corteTitulo.length; cont++) {
            if (corteTitulo[cont] !== null || corteTitulo[cont] !== "" || corteTexto[cont] !== null || corteTexto[cont] !== "") {
                tarefasProntas(corteTitulo[cont], corteTexto[cont]);
                tarefasArrayTitulo.push(corteTitulo[cont]);
                tarefasArrayTexto.push(corteTexto[cont]);
            }
        }

        if (localStorage.getItem("FormatoTarefas") != null) {
            document.getElementById("listaTarefas").type = localStorage.getItem("FormatoTarefas");
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

    //cria uma tag p
    let p1 = document.createElement("p");
    //adiciona o id baseado no contador
    p1.id = "paragrafo" + cont;

    if (tarefa !== "" || tarefa !== null || tarefa !== undefined) {
        //coloca o texto como Descrição
        p.innerText = "Descrição:";

        //adiciona o texto baseado no localstorage
        p1.innerText = tarefa;

    }

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