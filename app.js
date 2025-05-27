let mascotas = [];

function mostrarMenu() {
  return prompt(
    "=== MENÚ VETERINARIA ===\n" +
    "1. Registrar nueva mascota\n" +
    "2. Listar todas las mascotas\n" +
    "3. Buscar mascota por nombre\n" +
    "4. Actualizar estado de salud\n" +
    "5. Eliminar mascota por nombre\n" +
    "6. Salir\n\n" +
    "Seleccione una opción (1-6):"
  );
}

// Registro asincrónico de mascota
function registrarMascota() {
  const nombre = prompt("Ingrese el nombre de la mascota:");
  const especie = prompt("Ingrese la especie (Perro, Gato, etc.):");
  const edad = parseInt(prompt("Ingrese la edad de la mascota (en años):"));
  const peso = parseFloat(prompt("Ingrese el peso de la mascota (en kg):"));
  const estadoSalud = prompt("Ingrese el estado de salud (Sano, Enfermo, En tratamiento):");

  if (!nombre || !especie || isNaN(edad) || isNaN(peso) || !estadoSalud) {
    alert("Error: Todos los campos son obligatorios.");
    return;
  }

  alert("Validando información...");

  setTimeout(() => {
    mascotas.push({ nombre, especie, edad, peso, estadoSalud });
    alert("Mascota registrada exitosamente (simulación con retraso).");
  }, 2000);
}

// Listar mascotas (sin cambios)
function listarMascotas() {
  if (mascotas.length === 0) {
    alert("No hay mascotas registradas.");
    return;
  }

  let lista = "=== Lista de Mascotas ===\n";
  mascotas.forEach((m, i) => {
    lista += `${i + 1}. ${m.nombre} - ${m.especie} - ${m.edad} años - ${m.peso} kg - Estado: ${m.estadoSalud}\n`;
  });

  alert(lista);
}

// Búsqueda asincrónica con retardo
function buscarMascota() {
  const nombre = prompt("Ingrese el nombre de la mascota a buscar:");
  alert("Buscando en base de datos...");

  setTimeout(() => {
    const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());

    if (mascota) {
      alert(`Mascota encontrada:\nNombre: ${mascota.nombre}\nEspecie: ${mascota.especie}\nEdad: ${mascota.edad} años\nPeso: ${mascota.peso} kg\nEstado de salud: ${mascota.estadoSalud}`);
    } else {
      alert("Mascota no encontrada.");
    }
  }, 1500);
}

// Actualización de estado de salud con espera
function actualizarEstado() {
  const nombre = prompt("Ingrese el nombre de la mascota:");
  const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());

  if (mascota) {
    const nuevoEstado = prompt("Ingrese el nuevo estado de salud (Sano, Enfermo, En tratamiento):");
    alert("Actualizando estado de salud...");

    setTimeout(() => {
      mascota.estadoSalud = nuevoEstado;
      alert("Estado de salud actualizado correctamente (con retardo).");
    }, 2000);
  } else {
    alert("Mascota no encontrada.");
  }
}

// Eliminar mascota (sin cambios)
function eliminarMascota() {
  const nombre = prompt("Ingrese el nombre de la mascota a eliminar:");
  const index = mascotas.findIndex(m => m.nombre.toLowerCase() === nombre.toLowerCase());

  if (index !== -1) {
    mascotas.splice(index, 1);
    alert("Mascota eliminada exitosamente.");
  } else {
    alert("Mascota no encontrada.");
  }
}

// Bucle principal del menú
let opcion;
function iniciarMenu() {
  opcion = mostrarMenu();

  switch (opcion) {
    case "1":
      registrarMascota();
      break;
    case "2":
      listarMascotas();
      break;
    case "3":
      buscarMascota();
      break;
    case "4":
      actualizarEstado();
      break;
    case "5":
      eliminarMascota();
      break;
    case "6":
      alert("¡Gracias por usar el sistema de gestión veterinaria!");
      return;
    default:
      alert("Opción no válida. Intente nuevamente.");
  }

  // Esperar un poco antes de mostrar el siguiente menú para no solaparlo con alertas anteriores
  setTimeout(iniciarMenu, 1000);
}

// Iniciar
iniciarMenu();
