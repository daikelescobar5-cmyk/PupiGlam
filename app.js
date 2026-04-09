// CONFIG FIREBASE (pon aquí tus datos)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO",
  projectId: "TU_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let carrito = [];

// Cargar productos
db.collection("productos").onSnapshot((snapshot) => {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  snapshot.forEach(doc => {
    const p = doc.data();

    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}" width="100">
        <h3>${p.nombre}</h3>
        <p>$${p.precio}</p>
        <button onclick='agregarCarrito(${JSON.stringify(p)})'>
          Añadir
        </button>
      </div>
    `;
  });
});

function agregarCarrito(producto) {
  carrito.push(producto);
  mostrarCarrito();
}

function mostrarCarrito() {
  const lista = document.getElementById("carrito");
  lista.innerHTML = "";

  carrito.forEach(p => {
    lista.innerHTML += `<li>${p.nombre} - $${p.precio}</li>`;
  });
}

function enviarWhatsApp() {
  let mensaje = "Pedido:%0A";

  carrito.forEach(p => {
    mensaje += `${p.nombre} - $${p.precio}%0A`;
  });

  window.open(`https://wa.me/5359227882?text=${mensaje}`);
}
