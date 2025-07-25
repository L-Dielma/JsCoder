// let historial = [];

//     function sumar(a, b) {
//       let resultado = a + b;
//       guardarEnHistorial(`${a} + ${b} = ${resultado}`);
//       return resultado;
//     }

//     function restar(a, b) {
//       let resultado = a - b;
//       guardarEnHistorial(`${a} - ${b} = ${resultado}`);
//       return resultado;
//     }

//     function multiplicar(a, b) {
//       let resultado = a * b;
//       guardarEnHistorial(`${a} * ${b} = ${resultado}`);
//       return resultado;
//     }

//     function dividir(a, b) {
//       if (b === 0) {
//         guardarEnHistorial(`Error: división por cero`);
//         return 'Error: división por cero';
//       }
//       let resultado = a / b;
//       guardarEnHistorial(`${a} / ${b} = ${resultado}`);
//       return resultado;
//     }

//     function guardarEnHistorial(operacion) {
//       historial.push(operacion);
//     }

//     function mostrarHistorial() {
//       alert("Historial de operaciones:\n" + historial.join("\n"));
//     }

//     function calculadora() {
//       let seguir = true;

//       while (seguir) {
//         let operacion = prompt("¿Qué operación quieres hacer? (+, -, *, /) o escribe 'historial' o 'salir'").trim();

//         if (operacion === "salir") {
//           seguir = false;
//           break;
//         }

//         if (operacion === "historial") {
//           mostrarHistorial();
//           continue;
//         }

//         let num1 = parseFloat(prompt("Ingresa el primer número:"));
//         let num2 = parseFloat(prompt("Ingresa el segundo número:"));

//         if (isNaN(num1) || isNaN(num2)) {
//           alert("Por favor ingresa números válidos.");
//           continue;
//         }

//         let resultado;

//         switch (operacion) {
//           case "+":
//             resultado = sumar(num1, num2);
//             break;
//           case "-":
//             resultado = restar(num1, num2);
//             break;
//           case "*":
//             resultado = multiplicar(num1, num2);
//             break;
//           case "/":
//             resultado = dividir(num1, num2);
//             break;
//           default:
//             alert("Operación no válida.");
//             continue;
//         }

//         alert("Resultado: " + resultado);
//       }

//       alert("¡Gracias por usar la calculadora!");
//     }

//     // Ejecutar la calculadora al cargar
//     calculadora();

// Al cargar, recuperamos el historial guardado
let historial = JSON.parse(localStorage.getItem("historial")) || [];

let pantalla = document.getElementById("pantalla");
let listaHistorial = document.getElementById("listaHistorial");

mostrarHistorial(); // mostrar historial guardado al cargar

function agregar(valor) {
  pantalla.value += valor;
}

function borrar() {
  pantalla.value = "";
}

function calcular() {
  try {
    let expresion = pantalla.value;
    let resultado = eval(expresion);
    pantalla.value = resultado;

    let operacion = `${expresion} = ${resultado}`;
    historial.push(operacion);

    // Guardamos el historial actualizado en localStorage
    localStorage.setItem("historial", JSON.stringify(historial));

    mostrarHistorial();
  } catch (e) {
    pantalla.value = "Error";
  }
}

// function mostrarHistorial() {
//   listaHistorial.innerHTML = "";
//   historial.forEach(op => {
//     let item = document.createElement("li");
//     item.textContent = op;
//     listaHistorial.appendChild(item);
//   });
// }

function mostrarHistorial() {
  listaHistorial.innerHTML = "";

  historial.forEach((op, index) => {
    let item = document.createElement("li");
    item.textContent = op;

    item.classList.add("animate__animated", "animate__slideInRight");

    // Crear botón eliminar
    let btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.onclick = function () {
      eliminarOperacion(index);
    };

    item.appendChild(btnEliminar);
    listaHistorial.appendChild(item);
  });
}

function eliminarOperacion(index) {
  const items = document.querySelectorAll("#listaHistorial li");
  const item = items[index];

  // Agregar clase de animación salida
  item.classList.remove("animate__slideInRight");
  item.classList.add("animate__animated", "animate__slideOutRight");

  
  item.addEventListener("animationend", () => {
    // Eliminar del array historial
    historial.splice(index, 1);

    // Actualizar localStorage
    localStorage.setItem("historial", JSON.stringify(historial));

    // Volver a mostrar el historial actualizado
    mostrarHistorial();

    // Mostrar notificación con Toastify
    Toastify({
      text: `Operación eliminada.`,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#e74c3c",
      stopOnFocus: true
    }).showToast();
  }, { once: true });
}

// Activar dark mode si ya estaba guardado
if (localStorage.getItem("modo") === "oscuro") {
  document.body.classList.add("dark-mode");
  document.getElementById("toggleDarkMode").checked = true;
}

// Evento del botón slider
document.getElementById("toggleDarkMode").addEventListener("change", function () {
  document.body.classList.toggle("dark-mode");

  // Guardar preferencia
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("modo", "oscuro");
  } else {
    localStorage.setItem("modo", "claro");
  }
});

document.addEventListener("keydown", function(event) {
  const tecla = event.key;

  // Números y operaciones válidas
  const teclasValidas = "0123456789+-*/().";

  if (teclasValidas.includes(tecla)) {
    agregar(tecla);  // Agrega el carácter a la pantalla
  } else if (tecla === "Enter") {
    calcular();      
  } else if (tecla === "Backspace") {
    pantalla.value = pantalla.value.slice(0, -1);       // va eliminando uno en uno
  }
});