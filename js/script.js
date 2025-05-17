var carrinho = []

fetch("produtos.json").then(response => response.json())
.then(produtos =>{

    // Oculta as categorias e exibe a seção de produtos
    document.getElementById('product-section').style.display = 'block';
    
    // Limpa a lista de produtos antes de adicionar os novos
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    produtos.forEach((produto, i) => {

        carrinho[i] = [0, produto.precoUnitario, produto.produto]

        const div = document.createElement("div")
        div.classList.add("cardProduto")
        div.setAttribute("data-category", produto.categoria)

        var img = produto.imagem

        const nome = document.createElement("p")
        nome.innerHTML = "<br>" + produto.produto

        const preco = document.createElement("p")
        preco.innerHTML = "<br>R$" + produto.precoUnitario.toFixed(2).padEnd(2, 0).toString().replace(".", ",")

        const rowButtons = document.createElement("div")
        rowButtons.innerHTML = `
        <button class="btn-qnt" onclick='retirar("${i}", ${i})'>-</button>
        <span id="contadorProduto${i}">0</span>
        <button class="btn-qnt" onclick='colocar("${i}", ${i})'>+</button>
        `

        div.innerHTML += img
        div.appendChild(nome)
        div.appendChild(preco)
        div.appendChild(rowButtons)

        productList.appendChild(div)


    });
})

// Função para mostrar produtos ao clicar em uma categoria
function showProducts(category = "all") {
    const produtos = document.getElementsByClassName("cardProduto")

    if(category == "all"){
        for (let i = 0; i < produtos.length; i++) {
            produtos[i].style.display = "block"
        }
        return
    }

    for (let i = 0; i < produtos.length; i++) {
        produtos[i].style.display = "none"
        let categoria = produtos[i].getAttribute("data-category") 

        if(categoria== category){
            produtos[i].style.display = "block"
        }
    }    
    buttonDetails(category)
}

function buttonDetails(category){
    switch (category) {
        case "Bebidas":
            var i = 0;
            break;
        case "Cereais":
            var i = 1;
            break;
        case "Doces":
            var i = 2;
            break;
        case "Frutas":
            var i = 3;
            break;
        case "Higiene":
            var i = 4;
            break;
        case "Laticinios":
            var i = 5;
            break;
        case "Limpeza":
            var i = 6;
            break;
        case "Sucos":
            var i = 7;
            break;
    
        default:
            var i = null
            break;
    }
    const buttons = document.getElementsByClassName("category-card")
    
    for(let j = 0; j < buttons.length; j++){
        if(j != i && buttons[j].classList.contains("categoriaFoco")){
            buttons[j].classList.remove("categoriaFoco")
        }
        if(j == i){
            buttons[j].classList.add("categoriaFoco")
        }
    }

}

function retirar(index, iSpan){
    if(carrinho[index][0] > 0){
        carrinho[index][0]--
    }
    document.getElementById(`contadorProduto${iSpan}`).innerHTML = carrinho[index][0]
    calcularCarrinho()
}
function colocar(index, iSpan){
    carrinho[index][0]++
    document.getElementById(`contadorProduto${iSpan}`).innerHTML = carrinho[index][0]
    calcularCarrinho()
}

function calcularCarrinho(mostrar = false){
    if(mostrar){
        document.getElementById("carrinho").style.display = "block"
    }
    let valores = []
    carrinho.forEach(produto =>{
        if(produto[0] != 0){
            valores.push(produto)
        }
    })

    const elCarrinho = document.getElementById("produtos")
    elCarrinho.innerHTML = ""

    if(valores.length == 0){
        return
    }

    var total = 0

    valores.forEach(item =>{
        const div = document.createElement("div")
        const produto = document.createElement("p")
        produto.innerText = item[2]
        
        const subTotal = document.createElement("span")
        subTotal.innerText = "Quantidade: " + item[0] + " | Subtotal: R$" + (item[0]*item[1]).toFixed(2).padEnd(2, 0)

        total += (item[0]*item[1])

        div.appendChild(produto)
        div.appendChild(subTotal)
        div.innerHTML += '<hr>'

        elCarrinho.appendChild(div)
    })

    total = total.toFixed(2)
    elCarrinho.innerHTML += `<strong style="display:block;margin: 4px 0px;">Total da compra: R$${total}</strong>` 

    valores.push(total)
    localStorage.setItem("compra", valores)
    document.getElementById("btnComprar").disabled = false
}

function fecharCarrinho(){
    document.getElementById("carrinho").style.display = "none"
}

function finalizarCompra() {
    const elCarrinho = document.getElementById("produtos")
    if(elCarrinho.innerHTML !== ""){
        window.location.href = "notaFiscal.html"
    }
}