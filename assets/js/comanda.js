class Comanda extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const bootstrapCss = await fetch(
      "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    ).then((response) => response.text());

    this.shadowRoot.innerHTML = `
      <style>
        ${bootstrapCss}
        /* Añade aquí tus estilos personalizados */
        .comanda-container {
          padding: 20px;
          border: 1px solid #ddd;
        }

        .comanda-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .comanda-title {
          margin: 0;
        }

        .comanda-total {
          margin: 0;
        }

        .comanda-list {
          list-style: none;
          padding: 0;
        }

        .comanda-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          border-bottom: 1px solid #ddd;
          padding-bottom: 1rem;
        }

        .comanda-item img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          margin-right: 1rem;
          border-radius:25px;
        }

        .comanda-item-details {
          flex-grow: 1;
        }

        .comanda-item-actions {
          margin-left: 1rem;
        }

         .btn-eliminar {
          background-image: url('/assets/img/eliminar.png');
          background-size: cover;
          background-repeat: no-repeat;
          text-indent: -9999px;
          width: 40px;
          height: 40px;
          border: none;
          background-color: transparent;
        }
      </style>
      <div class="comanda-container">
        <div class="comanda-header">
          <h3 class="comanda-title">Comanda</h3>
          <h4 class="comanda-total">Total <span id="total">0</span>€</h4>
        </div>
        <ul id="ComandaId" class="comanda-list"></ul>
      </div>
    `;

    this.orderItemsContainer = this.shadowRoot.querySelector("#ComandaId");
    this.totalElement = this.shadowRoot.querySelector("#total");
    this.total = 0;

    document.addEventListener("agregarComanda", (event) => {
      const { platoNombre, platoPrecio, platoImagen } = event.detail;
      this.agregarComanda(platoNombre, platoPrecio, platoImagen);
    });

    this.shadowRoot.addEventListener("click", (event) => {
      if (event.target.classList.contains("eliminarPlato")) {
        const precioPlato = parseFloat(event.target.dataset.precio);
        this.total -= precioPlato;
        this.totalElement.textContent = this.total.toFixed(2);
        event.target.closest("li").remove();
      }
    });
  }

  agregarComanda(platoNombre, platoPrecio, platoImagen) {
    this.total += platoPrecio;
    this.totalElement.textContent = this.total.toFixed(2);

    const orderItem = document.createElement("li");
    orderItem.classList.add("comanda-item");

    orderItem.innerHTML = `
      <img src="${platoImagen}" class="img-thumbnail" alt="${platoNombre}">
      <div class="comanda-item-details">
        <h5>${platoNombre}</h5>
        <p>Precio: ${platoPrecio} €</p>
      </div>
      <div class="comanda-item-actions">
        <button class="btn btn-eliminar eliminarPlato" data-precio="${platoPrecio}" type="button">X</button>
      </div>
    `;

    this.orderItemsContainer.appendChild(orderItem);
  }
}

customElements.define("order-component", Comanda);
