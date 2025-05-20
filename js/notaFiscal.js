var compra = localStorage.getItem("compra")

if(compra == null){
  window.location.href = "index.html"
}

compra = compra.split(",")

var produtos = [] 
for(let i = 0; i < (compra.length - (compra.length % 3)); i+=3){
  produtos.push([compra[i + 0], compra[i + 1], compra[ i + 2]])
}
produtos.push(compra[compra.length - 1])


const nfProdutos = document.getElementsByClassName("nf-items")[0]
const now = new Date()
const dia = now.getDate().toString().padStart(2,0)
const mes = (now.getMonth()+1).toString().padStart(2,0)
const ano = now.getFullYear()
const hora = now.getHours().toString().padStart(2,0)
const minutos = now.getMinutes().toString().padStart(2,0)

document.getElementById("data").innerText = `${dia}/${mes}/${ano}`
document.getElementById("horario").innerText = `${hora}:${minutos}`

console.log(produtos)
produtos.forEach((produto, i) =>{

  if(i == produtos.length - 1){
    document.getElementById("total").innerText = "R$"+parseFloat(produtos[produtos.length-1]).toFixed(2).toString().replace(".",",")
  } else{
    const p = document.createElement("p")
    p.innerHTML = `
    ${produto[2]} <br>
    Quantidade: ${produto[0]}; Preço unitário: R$${parseFloat(produto[1]).toFixed(2).replace(".",",")} <br>
    Subtotal: R$${(parseInt(produto[0])*parseFloat(produto[1])).toFixed(2).padEnd(2, 0).replace(".", ",")}
    <hr>
    `
    p.style.marginTop = "5px"

    nfProdutos.appendChild(p)
  }  
})

function gerar(pdf = false, print = false) {
  // const main = document.querySelector("main")
  const notaFiscal = document.querySelector(".nota-fiscal")
  notaFiscal.style.padding = "20px"
  notaFiscal.style.margin = "30px auto"

  if (pdf) html2pdf().from(notaFiscal).save();
  else if (print) window.print();
}