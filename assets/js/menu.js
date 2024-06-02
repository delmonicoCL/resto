class Menu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const bootstrapCss = await fetch('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css')
      .then(response => response.text());

    this.shadowRoot.innerHTML = `
      <style>
        ${bootstrapCss}
        /* Añade aquí tus estilos personalizados */
        * {
          margin: 0;
          padding: 0;
        }
        
        .container-fluid {
          padding: 20px;
        }

        .titulo {
          height: 90px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .restaurante {
          display: flex;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
        }

        .vertical-list {
          display: block;
        }

        .card-custom {
          width: 220px;
          margin-bottom: 20px;
          margin-right: 20px;
          border-radius:25px;
        }

        .card-img-custom {
          width: 100%;
          height: 100px;
          object-fit: cover;
          border-radius:25px;
        }

        .card-body-custom {
          padding: 10px;
        }

        .mb-2 {
          margin-bottom: 1rem;
        }

        .btn-enviado {
          background-image: url('/assets/img/enviado.png');
          background-size: cover;
          background-repeat: no-repeat;
          text-indent: -9999px;
          width: 40px;
          height: 40px;
          border: none;
          background-color: transparent;
        }

        
      </style>
      <div class="container-fluid">
        <div class="titulo mt-2 mb-2">
         
        </div>
        <div class="row restaurante">
            <div class="col-md-2">
                <div class="tituloDiv ms-5">
                    <h3>Primeros</h3>
                </div>
                <div class="cuerpoDiv">
                    <ul id="primerPlato" class="vertical-list"></ul>
                </div>
            </div>
            <div class="col-md-2">
                <div class="tituloDiv  ms-4">
                    <h3>Segundos</h3>
                </div>
                <div class="cuerpoDiv">
                    <ul id="segundoPlato" class="vertical-list"></ul>
                </div>
            </div>
            <div class="col-md-2">
                <div class="tituloDiv  ms-4">
                    <h3>Postres</h3>
                </div>
                <div class="cuerpoDiv">
                  <ul id="postresPlato" class="vertical-list"></ul>
                </div>
            </div>
            <div class="col-md-2 ">
                <div class="tituloDiv ms-4">
                    <h3>Liquidos</h3>
                </div>
                <div class="cuerpoDiv mt-3">
                    <ul id="bebidasPlato" class="vertical-list"></ul>
                </div>
            </div>
            <div class="col-md-3 ms-5">
                <order-component></order-component>
            </div>
        </div>
      </div>
    `;

    const primerPlato = this.shadowRoot.querySelector("#primerPlato");
    const segundoPlato = this.shadowRoot.querySelector("#segundoPlato");
    const postres = this.shadowRoot.querySelector("#postresPlato");
    const bebidas = this.shadowRoot.querySelector("#bebidasPlato");

    const ItemMenu = [
      {
        nombrePlato: "Ensalada César",
        imagen: "/assets/img/cesarSalad.jpg",
        precio: 9.7,
        alergenos: ["Gluten"],
        categoria: "primero",
      },
      {
        nombrePlato: "Gazpacho",
        imagen: "/assets/img/zopatomate.jpg",
        precio: 7.5,
        alergenos: ["Gluten"],
        categoria: "primero",
      },
      {
        nombrePlato: "Curry Thai",
        imagen: "/assets/img/PolloCurry.png",
        precio: 12.5,
        alergenos: ["Picante"],
        categoria: "segundo",
      },
      {
        nombrePlato: "Paella",
        imagen: "/assets/img/paella.jpg",
        precio: 12.25,
        alergenos: ["Pescados"],
        categoria: "segundo",
      },
      {
        nombrePlato: "Crema Catalana",
        imagen: "/assets/img/cremacatalana.jpg",
        precio: 6.5,
        alergenos: ["Lácteos"],
        categoria: "postre",
      },
      {
        nombrePlato: "Mousse de Moia",
        imagen: "/assets/img/mousseChoco.jpg",
        precio: 7.75,
        alergenos: ["Lácteos"],
        categoria: "postre",
      },
      {
        nombrePlato: "Coca Cola",
        imagen: "/assets/img/cocacola.jpg",
        precio: 3.5,
        alergenos: [],
        categoria: "bebida",
      },
      {
        nombrePlato: "Zumo de Naranja",
        imagen: "/assets/img/jugoNaranja.jpg",
        precio: 3.0,
        alergenos: [],
        categoria: "bebida",
      },
    ];

    ItemMenu.forEach((plato) => {
      const listItem = document.createElement("div");
      listItem.classList.add("col-md-3", "mb-2"); // Añade espaciado y columnas

      listItem.innerHTML = `
        <div class="card card-custom">
          <img src="${plato.imagen}" class="card-img-top card-img-custom" alt="${plato.nombrePlato}">
          <div class="card-body card-body-custom">
            <h5 class="card-title">${plato.nombrePlato}</h5>
            <p>Precio: ${plato.precio}</p>
            <p>Alergenos: ${plato.alergenos.join(", ")}</p>
            <div class="d-grid gap-2 d-flex justify-content-end">
              <button class="btn agregarComanda btn-enviado" data-nombre="${plato.nombrePlato}" data-precio="${plato.precio}" data-imagen="${plato.imagen}" type="button"></button>
            </div>
          </div>
        </div>
      `;

      switch (plato.categoria) {
        case "primero":
          primerPlato.appendChild(listItem);
          break;
        case "segundo":
          segundoPlato.appendChild(listItem);
          break;
        case "postre":
          postres.appendChild(listItem);
          break;
        default:
          bebidas.appendChild(listItem);
          break;
      }
    });

    this.shadowRoot.addEventListener("click", (event) => {
      if (event.target.classList.contains("agregarComanda")) {
        const platoNombre = event.target.dataset.nombre;
        const platoPrecio = parseFloat(event.target.dataset.precio);
        const platoImagen = event.target.dataset.imagen;
        const agregarComandaEvent = new CustomEvent("agregarComanda", {
          detail: { platoNombre, platoPrecio, platoImagen },
        });
        document.dispatchEvent(agregarComandaEvent);
      }
    });
  }
}

customElements.define("menu-component", Menu);
