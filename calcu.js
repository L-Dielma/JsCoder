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

function mostrarHistorial() {
  listaHistorial.innerHTML = "";
  historial.forEach(op => {
    let item = document.createElement("li");
    item.textContent = op;
    listaHistorial.appendChild(item);
  });
}