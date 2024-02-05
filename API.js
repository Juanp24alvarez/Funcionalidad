fetch ("http://localhost:3000/funcion/").then(result => {
    return result.json();
}).then(data => {
    let tbody = document.getElementById ('tbody');
    data.forEach(function(element){
        console.log(element)
        let tr = document.createElement ('tr');
        tbody.appendChild(tr);

        let td_id = document.createElement ('td')
        td_id.innerText = element.id
        tr.appendChild (td_id);

        let td_nomevento = document.createElement ('td')
        td_nomevento.innerText = element.nombre_evento
        tr.appendChild (td_nomevento);

        let td_descripcion = document.createElement ('td')
        td_descripcion.innerText = element.description
        tr.appendChild (td_descripcion);

        let td_imagen = document.createElement ('img')
        td_imagen.setAttribute("src",element.imagenes )
        tr.appendChild (td_imagen);

        //Botones
        let td_button = document.createElement ('td')
        tr.appendChild (td_button);

        let button_eliminar = document.createElement("button");
        button_eliminar.classList.add("btn", "btn-danger", "btn.sm")
        button_eliminar.innerText = "Eliminar";
        button_eliminar.setAttribute("onclick", `destroy('${element.id}')`)
        td_button.appendChild(button_eliminar);


        let button_editar = document.createElement("button");
        button_editar.classList.add("btn", "btn-warning", "btn.sm")
        button_editar.innerText = "Editar";
        button_editar.setAttribute("onclick", `edit('${element.id}')`)
        td_button.appendChild(button_editar);
    });
})

//Guardar 

function store(){

    let nombre = document.getElementById('crear_evento');
    let descripcion = document.getElementById('crear_descripcion');
    let imagenes = document.getElementById('crear_imagenes');

    let data_evento = {
        nombre : nombre.value,
        descripcion : descripcion.value,
        imagenes : imagenes.value
    }

    fetch("http://localhost:3000/funcion/", {
        method: "POST",
        body: JSON.stringify(data_evento),
        headers:{
            "Content-Type" : "application/json"
        }
    }).then(result => console.log(result))
        .then(data => {
        location.href = "";
        console.log(data);
    })
}

function destroy (id){
    fetch ("http://localhost:3000/funcion/"+id,{
        method : "DELETE",
        headers:{
            "Content-Type" : "application/json"
        }
    }).then(result => result.json())
        .then(data => {
            location.href = "";
        }) 
}

function edit (id){
    fetch ("http://localhost:3000/funcion/"+id)
    .then(result => result.json()).then(data => {
        document.getElementById('edit_evento').value = data.nombre
        document.getElementById('descripcion_edit').value = data.descripcion
        document.getElementById('imagenes_edit').value = data.imagenes
        document.getElementById('id_edit').value = data.id 
    });
}

function update (){
    let nombre = document.getElementById('edit_evento');
    let descripcion = document.getElementById('descripcion_edit');
    let imagenes = document.getElementById('imagenes_edit');
    let id = document.getElementById('id_edit');

    let data_evento = {
        nombre : nombre.value,
        descripcion : descripcion.value,
        imagenes : imagenes.value
    }

    fetch("http://localhost:3000/funcion/"+id.value,{
        method : "PUT",
        body : JSON.stringify(data_evento),
        headers:{
            "Content-Type" : "application/json"
        }
    }).then(result => result.json()).then(data => {
        location.href = "";
    })
}