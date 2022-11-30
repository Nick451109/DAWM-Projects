window.addEventListener('DOMContentLoaded', (event) => {
      cargarDatos()
      mostrarFrases()
});

let cargarDatos = () => {
      console.log('DOM cargado y analizado');

      let url = 'https://api.opensea.io/api/v1/assets?format=json'
      fetch(url)
        .then(response => response.json())
        .then(data => {
          
          // Procesamiento de la constante xml
          let nfts = data.assets;
          let array = Array.from(nfts);
          let select = document.getElementsByClassName('custom-select')[0];

          for (let index = 0; index < data.assets.length; index++) {
            
             //Por cada etiqueta <escritor> cree un elementoHTML <option>. Utilice el método createElement del objeto document.
            let option = document.createElement("option");

             //Extraiga el valor de la etiqueta <nombre> y colóquelo como valor de la etiqueta <option>.
             console.log(data.assets[index].name);
             option.innerHTML = data.assets[index].name;

            //poner los nombres de los nfts en la lista desplegable
            if(option != null){     
              select.appendChild(option);
            } else
              option.innerHTML = data.assets[index].id;
              select.appendChild(option);
                        
          }


        })
        .catch(console.error);
}

let mostrarFrases = () => {
  let select = document.getElementsByClassName('custom-select')[0]

  select.addEventListener("change", (event) => { //cuando cambie lo seleccionado en la lista

    let valor = event.target.value; //obtengo el nombre del nft seleccionado

    fetch("https://api.opensea.io/api/v1/assets?format=json")
      .then(response => response.json())
      .then( data => {

        document.getElementById("frases").innerHTML = ''

       for (let index = 0; index < data.assets.length; index++) {
            
        if(data.assets[index].name == valor){

          let url_imagen = data.assets[index].image_url;
          let creacion = data.assets[index].asset_contract.created_date;
          let fees = data.assets[index].seller_fee_basis_points;
          
          let plantilla_imagen = `
          <div class="container_api">
              <div class="test-imagen ">
              
                <img src=${url_imagen} alt="">

              </div>
              <div class="data1">
              <table id="data-example-2" class="charts-css column show-labels">
              <caption> Data Example #2 - Fees </caption>
              <tbody class="chart">
                <tr>
                  <th scope="col"> Fees </th>
                  <td style="--size: calc( ${fees} / 1000 );">  - 250 - </td>
                </tr>
                <tr>
                  <td style="--size: calc( 100 / 100 );"> 100%</td>
                </tr>
                
              </tbody>
            </table>
              </div>

              
              <div class="data2">
              <table id="line-example-4" class="charts-css line show-heading">
              <caption>Linea de tiempo </caption>
              <tbody>
                <tr>
                  <td style="--start: 0.0; --size: 0.${fees};"></td>
                </tr>
                
              </tbody>
            </table>
              </div>
          </div>
        `

         document.getElementById("frases").innerHTML += plantilla_imagen
        }
                   
     }

      })

  })
}