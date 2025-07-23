const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let LIST = []
let id = 0

//FUNCION FECHA
const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-ES', {weekday: 'long', month: 'short', day: 'numeric'})


//FUNCION AGREGAR TAREA
function agregarTarea(tarea,id,realizado,eliminado) {
    if(eliminado) {return}

    const REALIZADO = realizado ? check : uncheck
    const LINE = realizado ? lineThrough : ''

    const elemento = `
                       <li id="elemento">
                       <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                       <p class="text ${LINE}">${tarea}</p>
                       <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                       </li>
                 `
    lista.insertAdjacentHTML("beforeend",elemento)             
}

//FUNCION TAREA REALIZADA
function TareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ? false : true
}

//FUNCION TAREA ELIMINADA
function TareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
}



botonEnter.addEventListener('click',()=> {
    const tarea = input.value
    if(tarea) {
        agregarTarea(tarea,id,false,false)
        LIST.push({
            id: id,
            nombre: tarea,
            realizado: false,
            eliminado: false
        })
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
    input.value = ''
    id++
    
})

document.addEventListener('keyup', function (event) {
    if(event.key === 'Enter') {
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false)
                LIST.push({
                id: id,
                nombre: tarea,
                realizado: false,
                eliminado: false
            })
        }
        localStorage.setItem('TODO', JSON.stringify(LIST))
        input.value = ''
        id++

    }
})

lista.addEventListener('click', function(event) {
    const element = event.target
    const elementData = element.attributes.data.value

    if(elementData === 'realizado') {
        TareaRealizada(element)
    } else if (elementData === 'eliminado') {
        TareaEliminada(element)
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
})

//LOCAL STORAGE GET ITEMS
let data = localStorage.getItem('TODO')
if(data) {
    LIST = JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
}

function cargarLista(DATA){
    DATA.forEach(function(item) {
        agregarTarea(item.nombre, item.id, item.realizado, item.eliminado)
    })
}