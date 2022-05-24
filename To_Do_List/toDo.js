// lista de itens
let items_list = [
    'Blue',
    'Red',
    'White',
    'Green',
    'Black'
]

// variáveis globais (a lista de itens acima tbm é uma variável global)
let list = document.querySelector("ul")
let bntInput = document.getElementById("bg_input")
const submit = document.querySelector("#form_input")
let checkedElements = []

// função que faz a lista
function makeList() {
    let lista_div = document.getElementById("list_div")

    const templateList = items_list.reduce(function(acumulador, atual) {
        const template = `
            <li class="flex_list">
                <input type="checkbox" class="radio_check"></input>
                <label>${atual}</label>
            </li>
        `
        return acumulador += template
    }, '')

    lista_div.innerHTML = templateList
    itemsLeft()
}
makeList()

// função para mostrar quantos itens ativos tem na lista
function itemsLeft() {
    let qtd = items_list.length
    document.querySelectorAll(".flex_list").forEach(function(element) {
        if (element.classList.contains("line_through")) qtd--
    })
    qtdText = document.getElementById("qtd")
    qtdText.innerHTML = `${qtd} itens left`
}

// Evento com função que adiciona a classe que risca quando a check box está marcada
list.addEventListener('click', function(event) {
    console.log(event.target.tagName)
    if (event.target.tagName == "INPUT") event.target.parentNode.classList.toggle("line_through")
    itemsLeft()
})

// funções para os botões que mostram elementos ativos, completos e etc
function showActive() {
    document.querySelectorAll(".line_through").forEach(a => a.style.display = "none")
}

function showAll() {
    document.querySelectorAll(".flex_list").forEach(a => a.style.display = "block")
}

function showCompleted() {
    document.querySelectorAll(".flex_list").forEach(a => a.style.display = "none")
    document.querySelectorAll(".line_through").forEach(a => a.style.display = "block")
}

function clearCompleted() {
    let arr = document.querySelectorAll(".flex_list")
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].classList.contains("line_through")) items_list.splice(i, 1)
    }
    makeList()
}

// abaixo temos uma função e um evento
// a função esconde o texto do input quando clica para escrever
// e o evento coloca o texto de novo quando clica fora do input
function hideText() {
    if (bntInput.value == "Create a new to do...") bntInput.value = ""
}
document.addEventListener('click', function(event) {
    let isClickInsideElement = bntInput.contains(event.target)
    if (!isClickInsideElement && bntInput.value == "") bntInput.value = "Create a new to do..."
})

// A função abaixo faz, em ordem o seguinte: 
// adiona um item na lista, 
// verifica quais itens riscados, 
// faz uma nova lista 
// e risca os que estavam riscados anteriormente
submit.addEventListener('submit', function(event) {
    event.preventDefault() // não envia de vdd, assim a pagina nao recarrega
    let val = bntInput.value
    items_list.push(val)

    let arr_elements_list = document.querySelectorAll(".flex_list")
    let arr_auxiliar = []
    let checks = document.querySelectorAll(".radio_check")

    // guardando os riscados em um array
    for (let i = 0; i < arr_elements_list.length; i++) {
        if (arr_elements_list[i].classList.contains("line_through")) arr_auxiliar[i] = true
        else arr_auxiliar[i] = false
    }

    makeList()
    bntInput.value = ""
    arr_elements_list = document.querySelectorAll(".flex_list")

    for (let i = 0; i < arr_auxiliar.length; i++) {
        if (arr_auxiliar[i] == true) {
            arr_elements_list.classList.add("line_through")
            checks[i].checked = true
            itemsLeft()
        }
    }

})