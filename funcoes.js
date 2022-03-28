const cabecalho = ["Disciplina", "1º Bimestre", "2º Bimestre",
                        "3º Bimestre", "4º Bimestre", "Media anual",
                        "Exame", "Nota do Exame", "Resultado Final"]
const disciplinas = ["Português", "Matemática", "História",
                    "Geografia", "Inglês"]
var situacaoAluno = ""


// MUDAR A AMOSTRAGEM DO RESULTADO FINAL PARA A FUNÇÃO FINALIZAR
// FAZER O CSS
// IR PRO ABRAÇO

function criarTabela()
{
    for (i = 0; i < 6; i++)
    {
        tabelaLinha = document.createElement("tr")
        for (j = 0; j < 9; j++)
        {
            tabelaColuna = document.createElement("td")
            tabelaColuna.style.textAlign = "center"
            tabelaColuna.setAttribute("width", "100")
            tabelaColuna.setAttribute("height", "33")
            tabelaColuna.style.border = "1px solid black"
            
            //Textos do cabeçalho e das disciplinas
            if (i == 0)
            {
                txtCabecalho = document.createTextNode(cabecalho[j])
                tabelaColuna.setAttribute("name", "cabecalho")
                tabelaColuna.appendChild(txtCabecalho)
            }
            else if (j == 0 && i != 0)
            {
                txtDisciplina = document.createTextNode(disciplinas[i - 1])
                tabelaColuna.appendChild(txtDisciplina)
            }
            
            //Labels e inputs
            if (i > 0 && j > 0 && j < 5)
            {
                disciplinaInput = document.createElement("input")
                disciplinaInput.setAttribute("id", `${disciplinas[i-1]}${j}`)
                disciplinaInput.setAttribute("type", "number")
                disciplinaInput.setAttribute("class", "input")
                disciplinaInput.setAttribute("onblur", "mudarCor(this)")
                tabelaColuna.appendChild(disciplinaInput)
            }
            else if (i > 0 && j >= 5 && j != 7)
            {
                labels = document.createElement("label")
                labels.setAttribute("id", `${disciplinas[i -1]}${j}`)
                tabelaColuna.appendChild(labels)
            }
            else if (i > 0 && j == 7)
            {
                resultadoExameInput = document.createElement("input")
                resultadoExameInput.setAttribute("type", "text")
                resultadoExameInput.setAttribute("class", "input")
                resultadoExameInput.setAttribute("id", `${disciplinas[i - 1]}${j}`)
                resultadoExameInput.required = true
                resultadoExameInput.value = "?"
                tabelaColuna.appendChild(resultadoExameInput)
            }

            tabelaLinha.appendChild(tabelaColuna)
        }
        document.body.appendChild(tabelaLinha)
    }

    
    btCalcularMedia = document.createElement("button")
    btCalcularMedia.setAttribute("onclick", "calcularMedia()")
    btCalcularMedia.setAttribute("name", "calcmedia")
    txtBotao = document.createTextNode("Calcular Média")
    btCalcularMedia.appendChild(txtBotao)
    document.body.appendChild(btCalcularMedia)
    

    btFinalizar = document.createElement("button")
    btFinalizar.setAttribute("name", "finalizar")
    txtBotao = document.createTextNode("Finalizar")
    btFinalizar.appendChild(txtBotao)
    btFinalizar.setAttribute("onclick", "finalizar()")
    document.body.appendChild(btFinalizar)
}

function calcularMedia()
{
    var mediaAnual = 0
    for (i = 1; i < 6; i++)
    {
        for (j = 1; j < 5; j++)
        {
            inputDisciplina = document.getElementById(`${disciplinas[i - 1]}${j}`)
            mediaAnual += parseInt(inputDisciplina.value)
        }

        mediaAnual /= 4
        labelMediaAnual = document.getElementById(`${disciplinas[i - 1]}${j}`)
        labelMediaAnual.innerHTML = mediaAnual
        
        // Exame e Resultado Final
        if (mediaAnual < 4)
        {
            labelMediaAnual.parentNode.className = "notaVermelha"
            labelExame = document.getElementById(`${disciplinas[i - 1]}${j + 1}`)
            labelExame.innerHTML = "não"
        }
        else if (mediaAnual >= 4 && mediaAnual < 7)
        {
            labelMediaAnual.parentNode.className = "notaAzul"
            labelExame = document.getElementById(`${disciplinas[i - 1]}${j + 1}`)
            labelExame.innerHTML = "sim"
            inputExame = document.getElementById(`${disciplinas[i - 1]}7`)
            inputExame.setAttribute("onblur", "mudarCor(this)")
            inputExame.value = ""
        }
        else if (mediaAnual >= 7)
        {
            labelMediaAnual.parentNode.className = "notaAzul"
            labelExame = document.getElementById(`${disciplinas[i - 1]}${j + 1}`)
            labelExame.innerHTML = "não"
        }

        mediaAnual = 0
    }
}

function finalizar()
{
    //Exame
    for (i = 1; i <= 6; i++)
    {
        labelMediaAnual = document.getElementById(`${disciplinas[i - 1]}5`)
        labelExame = document.getElementById(`${disciplinas[i - 1]}6`)
        inputExame = document.getElementById(`${disciplinas[i - 1]}7`)
        labelResultadoFinal = document.getElementById(`${disciplinas[i - 1]}8`)

        if (labelExame.innerHTML == "sim")
        {
            notaExame = parseInt(inputExame.value)
            notaExame += parseInt(labelMediaAnual.innerHTML)
            notaExame /= 2
            console.log(notaExame)

            if (notaExame < 5)
            {
                situacaoAluno = "Reprovado"
                labelResultadoFinal.parentNode.setAttribute("class", "notaVermelha")
            }
            else if (notaExame >= 5)
            {
                situacaoAluno = "Aprovado"
                labelResultadoFinal.parentNode.setAttribute("class", "notaAzul")
            }

            resultadoFinalExame = document.getElementById(`${disciplinas[i - 1]}8`)
            resultadoFinalExame.innerHTML = situacaoAluno
        }
        else if (labelExame.innerHTML == "não")
        {
            notaFinal = parseInt(labelMediaAnual.innerHTML)

            if (notaFinal < 4)
            {
                situacaoAluno = "Reprovado"
                labelResultadoFinal.innerHTML = situacaoAluno
                labelResultadoFinal.parentNode.setAttribute("class", "notaVermelha")
            }
            else if (notaFinal >= 7)
            {
                situacaoAluno = "Aprovado"
                labelResultadoFinal.innerHTML = situacaoAluno
                labelResultadoFinal.parentNode.setAttribute("class", "notaAzul")
            }
        }

    }
}

function mudarCor(e)
{
    celulaBimestre = e.parentNode
    if (e.value >= 4)
    {
        celulaBimestre.className = "notaAzul"
    }
    else
    {
        celulaBimestre.className = "notaVermelha"
    }
}