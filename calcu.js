let operacion;

while (true) {
  operacion = prompt("Ingrese una operación (SUMA, RESTA) o escriba ESC para salir:");

  if (operacion === null || operacion.toUpperCase() === "ESC") {
    alert("Programa finalizado.");
    break;
  }

  operacion = operacion.toUpperCase();

  if (operacion === "SUMA" || operacion === "RESTA") {
    let num1 = parseFloat(prompt("Ingrese el primer número:"));
    let num2 = parseFloat(prompt("Ingrese el segundo número:"));

    if (isNaN(num1) || isNaN(num2)) {
      alert("Por favor ingrese números válidos.");
      continue;
    }

    let resultado;
    if (operacion === "SUMA") {
      resultado = num1 + num2;
    } else if (operacion === "RESTA") {
      resultado = num1 - num2;
    }

    alert(`El resultado de la ${operacion.toLowerCase()} es: ${resultado}`);
  } else {
    alert("Operación no válida. Intente con SUMA, RESTA o ESC.");
  }
}