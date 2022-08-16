const select = document.getElementById("select")

select.addEventListener("change", () => {
    if (select.value === "Trilateral") {
        let template = `
                    <th>Cobertura Trilateral</th>
                    <td class="td-input"><input id="oddTri" placeholder ="Inserir Probabilidade"></td>
                    <td><p id="montTri">-</p></td>
                    <td><p id="coberturaTri">-</p></td>
                `

        table1.insertRow(3).innerHTML = template
    }
    if (select.value === "Bilateral") {
        table1.deleteRow(3)
        if(oddSaida.value>0 && oddEnter.value>0 && valueEnter.value>0 ){
            calcular()
        }
        
    }
    
})
const button = document.getElementById("button")

const calcular = () => {

    //primeira linha da table
    const oddEnter = document.getElementById("oddEnter").value
    const valueEnter = document.getElementById("valueEnter").value
    const retornoAposta = document.getElementById("retorno-aposta")

    //segunda linha da table
    const oddSaida = document.getElementById("oddSaida").value
    const valueSaida = document.getElementById("valueSaida")
    const retornoCobertura = document.getElementById("retorno-cobertura")

    const retorno = oddEnter * valueEnter
    retornoAposta.innerHTML = `R$ ${retorno.toFixed(2)}`
    retornoCobertura.innerHTML = `R$ ${retorno.toFixed(2)}`

    
    const protect1 = retorno / oddSaida
    valueSaida.innerHTML = `R$ ${protect1.toFixed(2)}`

    //table2
    const montAposta = document.getElementById("montAposta")
    const totalPagment = document.getElementById("totalPagment")
    const lucro = document.getElementById("lucro")
    const mensagem = document.getElementById("mensagem")

    if (select.value === "Bilateral") {
        
        const montante = (valueEnter * 1) + protect1
        montAposta.innerHTML = `R$ ${montante.toFixed(2)}`

        totalPagment.innerHTML = `R$ ${retorno.toFixed(2)}`

        const result = retorno - montante

        if (result >= 0) {
            mensagem.innerHTML = "Lucro:"
            lucro.style.backgroundColor = "green"
            lucro.innerHTML = `R$ ${result.toFixed(2)}`
        }
        else {
            mensagem.innerHTML = "Fumo:"
            lucro.style.backgroundColor = "red"
            lucro.innerHTML = `R$ ${result.toFixed(2) * -1}`
        }
    }
    else if(select.value==="Trilateral"){
        const coberturaTri = document.getElementById("coberturaTri")
        coberturaTri.innerHTML = `R$ ${retorno.toFixed(2)}`

        const oddTri = document.getElementById("oddTri").value
        const montTri = document.getElementById("montTri")
        const montanteTri = retorno / oddTri
        montTri.innerHTML = `R$ ${montanteTri.toFixed(2)}`

        const montante = (valueEnter * 1) + protect1 + montanteTri
        montAposta.innerHTML = `R$ ${montante.toFixed(2)}`

        totalPagment.innerHTML = `R$ ${retorno.toFixed(2)}`
        
        const result = retorno - montante

        if (result >= 0) {
            mensagem.innerHTML = "Lucro:"
            lucro.style.backgroundColor = "green"
            lucro.innerHTML = `R$ ${result.toFixed(2)}`
        }
        else {
            mensagem.innerHTML = "Fumo:"
            lucro.style.backgroundColor = "red"
            lucro.innerHTML = `R$ ${result.toFixed(2) * -1}`
        }
    }
}
button.addEventListener("click", calcular)

