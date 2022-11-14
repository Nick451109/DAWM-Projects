window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos()
    mostrarMarcas()
    
});

let cargarDatos = () => {
    console.log('DOM cargado y analizado');

    let url = 'xml/api.xml'
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            // Procesamiento de la constante xml

            let select = document.getElementsByClassName('custom-select')[0]
            let carros = xml.getElementsByTagName('carro')

            //Recorra la respuesta anterior con la colección de etiquetas <escritor> con un Array.from()
            Array.from(carros).forEach(function (element) {
                //Por cada etiqueta <escritor> cree un elementoHTML <option>. Utilice el método createElement del objeto document.
                let option = document.createElement("option")

                //Extraiga el valor de la etiqueta <nombre> y colóquelo como valor de la etiqueta <option>.
                option.innerHTML = element.getElementsByTagName("nombre")[0].innerHTML

                //Extraiga el valor de la etiqueta <id> y colóquelo como valor del atributo value de la etiqueta <option>.
                option.setAttribute("value", element.getElementsByTagName("id")[0].innerHTML)

                //Agregue la etiqueta <option> como hija de la etiqueta <select> del html. Puede usar el método appendChild.
                select.appendChild(option)

            });

        })
        .catch(console.error);
}

let mostrarMarcas = () => {
    let select = document.getElementsByClassName('custom-select')[0]

    //Dentro de la función mostrarFrases: agregue el listener al evento change de la etiqueta <select> del html.
    select.addEventListener("change", (event) => {
        //Guarde el valor del parámetro del callback: event.target.value
        let valor = event.target.value;

        //Dentro del listener: realice una petición asincrónica con el objeto fetch al url Frases
        fetch("xml/frases.xml")
            //Procese la respuesta data como un objeto JSON
            .then(response => response.json())
            .then(data => {

                //Obtenga el arreglo de objetos a partir de la clave "frases"
                let frases = data["frases"]

                //Filtre el arreglo de objetos con Array.prototype.filter(), compare el valor del atributo id_author y el valor del parámetro del callback.
                let frasesfiltradas = frases.filter(frase => frase["id_autor"] == valor);


                document.getElementById("frases").innerHTML = ''

                //Itere sobre el arreglo filtrado con for…of.
                for (let frase of frasesfiltradas) {
                    let plantilla = `
            <div class="col-lg-3">
                <div class="test-inner ">
                    <span>${frase.texto}</span>
                    <i class="fa fa-quote-right"></i>
                </div>
            </div>
          `
                    document.getElementById("frases").innerHTML += plantilla

                }

            })

    })
}