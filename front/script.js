// função responsavel por buscar todos os pedidos
// na api e exibir na tela
function listarPedidos() {
    // busca o elemento HTML (lista), onde a listagem de pedidos será exbida
    const lista = document.getElementById("lista");

    // conexão suave entre a interface e a conexão API
    lista.innerHTML = "carregando pedididos...";

    // faz uma requisição GET para API com a url publicada
    fetch("https://node-publi-api.onrender.com/pedidos")

        // converte a resposta da api em json
        .then(res => res.json())

        //trabalha o resultado da api
        .then(resultado => {
            // limpando a lista para exibir os pedidos
            lista.innerHTML = "";

            // percorrendo o array de pedidos recebido da api
            resultado.dados.forEach(pedido => {
                // cria um item de linha para cada pedido
                const item = document.createElement("li");

                // define o texto exibido na tela
                item.textContent = `${pedido.id} - ${pedido.cliente} | ${pedido.produto}| ${pedido.status}`;
                // Adiciona o item dentro da lista
                lista.appendChild(item);
            });
        })
        // caso o front não consiga acessar a API para trazer os dados 
        .catch(() => {
            lista.innerHTML = "Erro ao carregar os pedidos"
        });
};

// função responsavel pela criação de novos pedidos
function cadastrarPedido() {
    // pega os valores digitados nos input de novos pedidos HTML e depois limpa
    const cliente = document.getElementById("cliente").value;
    const produto = document.getElementById("produto").value;

    // Envia a requisição POST para a API
    fetch("https://node-publi-api.onrender.com/pedidos", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            // converte os dados em JSON, para entregar o body
            body: JSON.stringify({
                id: Date.now(),
                cliente: cliente,
                produto: produto,
                status: "Pendente"
            })
        })

        // converter a resposta da api para JSON
        .then(res => res.json())
        .then(() => {
            // limpa os inputs após o envio de cadastro 
            document.getElementById("cliente").value = "";
            document.getElementById("produto").value = "";

            // Atualizando a lista de pedidos
            listarPedidos();
        })

        // ALERTA PARA CASO NÃO SEJA POSSIVEL REALIZAR O CADASRO DO PEDIDO
        .catch(() => {
            alert("Erro ao cadastrar pedido");
        });
}

// função responsabel para atualiza  o status de um pedido
function atualizarPedido() {
    // pega o ID e o força a ser um numero
    const id = Number(document.getElementById("idAtualizar").value);

    // pega o novo status do pedido (digitado no input)
    const status = document.getElementById("statusAtualizar").value;

    // Envia uma requisição PUT para a API
    fetch("https://node-publi-api.onrender.com/pedidos",{
        method: "PUT", 
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                // envia o id e o novo status do pedido
                id: id,
                status: status
            })
        })
        .then(res => res.json())
        .then(() => {
            document.getElementById("idAtualizar").value = "";
            document.getElementById("statusAtualizar").value = "";
            listarPedidos();
        })
        .catch(() => {
            alert("Erro ao atualizar o pedido");
        })
    
}

// função responsavel por remover o pedido
function removerPedido() {
     const id = Number(document.getElementById("idRemover").value);
    fetch("https://node-publi-api.onrender.com/pedidos",{
        method: "DELETE",
            headers: {
                'content-type': 'application/json'
            },
            // Envia apenaso id do pedido a ser removido
            body: JSON.stringify({
                id: id
            })
    })
    .then(res => res.json())
    // limpa o campo de ID e atualiza a lista de pedidos
    .then(() => {
        document.getElementById("idRemover").value = "";
        listarPedidos();
    })
    .catch(() => {
        alert("Erro ao remover o pedido");
    })
}

// chama afunção assim que a página carregar 
listarPedidos();