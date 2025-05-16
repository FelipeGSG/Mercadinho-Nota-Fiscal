var compra = localStorage.getItem("compra")
compra = compra.split(",")

var produtos = [] 
for(let i = 0; i < (compra.length - (compra.length % 3)); i+=3){
  produtos.push([compra[i + 0], compra[i + 1], compra[ i + 2]])
}
produtos.push(compra[compra.length - 1])


const nfProdutos = document.getElementsByClassName("nf-items")[0]
const now = new Date()

document.getElementById("data").innerText = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`
document.getElementById("horario").innerText = `${now.getHours()}:${now.getMinutes()}`

produtos.forEach((produto, i) =>{

  if(i == produtos.length - 1){
    document.getElementById("total").innerText = "R$"+produtos[produtos.length-1].replace(".",",")
  } else{
    const p = document.createElement("p")
    p.innerHTML = `
    ${produto[2]} <br>
    Quantidade: ${produto[0]}; Preço unitário: ${produto[1]} <br>
    Subtotal: R$${(parseInt(produto[0])*parseFloat(produto[1])).toFixed(2).padEnd(2, 0)}
    <hr>
    `
    p.style.marginTop = "5px"

    nfProdutos.appendChild(p)
  }  
})

function gerar(pdf = false, print = false) {
  const main = document.querySelector("main")

  if (pdf) html2pdf().from(main).save();
  else if (print) window.print();
}