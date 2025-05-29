
let dueños = [];
let mascotas = [];
let idDueño = 1;
let idMascota = 1;

const generarIdDueño = () => idDueño++;
const generarIdMascota = () => idMascota++;
const esperar = (ms) => new Promise(res => setTimeout(res, ms));

// Registrar Dueño
const registrarDueño = (callback) => {
  const nombre = prompt("Nombre del dueño:");
  const cedula = prompt("Cédula:");
  const telefono = prompt("Teléfono:");
  const email = prompt("Correo electrónico:");

  if (!nombre || !cedula || !telefono || !email) {
    alert("Todos los campos son obligatorios.");
    return callback();
  }

  setTimeout(() => {
    dueños.push({ id: generarIdDueño(), nombre, cedula, telefono, email });
    alert("Dueño registrado correctamente.");
    callback();
  }, 1500);
};

// Registrar Mascota
const registrarMascota = (callback) => {
  const nombre = prompt("Nombre de la mascota:");
  const especie = prompt("Especie (Perro, Gato, Ave, Reptil, Otro):");
  const edad = parseInt(prompt("Edad (años):"));
  const peso = parseFloat(prompt("Peso (kg):"));
  const estado = prompt("Estado de salud (Sano, Enfermo, En tratamiento):");
  const cedulaDueño = prompt("Cédula del dueño:");

  if (!nombre || !especie || isNaN(edad) || edad <= 0 || isNaN(peso) || peso <= 0 || !estado || !cedulaDueño) {
    alert("Campos inválidos.");
    return callback();
  }

  setTimeout(() => {
    const dueño = dueños.find(d => d.cedula === cedulaDueño);
    if (!dueño) {
      alert("Dueño no encontrado.");
      return callback();
    }

    mascotas.push({ id: generarIdMascota(), nombre, especie, edad, peso, estado, idDueño: dueño.id });
    alert("Mascota registrada correctamente.");
    callback();
  }, 2000);
};

// Listar Mascotas
const listarMascotas = (callback) => {
  if (mascotas.length === 0) alert("No hay mascotas registradas.");
  else mascotas.forEach(m => console.log(m));
  callback();
};

// Buscar por Nombre
const buscarMascota = (callback) => {
  const nombre = prompt("Nombre de la mascota a buscar:");
  buscarMascotaPorNombre(nombre)
    .then(result => {
      console.log(result);
      callback();
    })
    .catch(err => {
      alert(err);
      callback();
    });
};

const buscarMascotaPorNombre = (nombre) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
      mascota ? resolve(mascota) : reject("Mascota no encontrada.");
    }, 1500);
  });
};

// Actualizar Salud
const actualizarSalud = async (callback) => {
  const nombre = prompt("Nombre de la mascota:");
  const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
  if (!mascota) {
    alert("Mascota no encontrada.");
    return callback();
  }

  await esperar(1000);
  const nuevoEstado = prompt("Nuevo estado de salud (Sano, Enfermo, En tratamiento):");

  if (!["Sano", "Enfermo", "En tratamiento"].includes(nuevoEstado)) {
    alert("Estado inválido.");
    return callback();
  }

  mascota.estado = nuevoEstado;
  alert("Estado actualizado.");
  callback();
};

// Eliminar Mascota
const eliminarMascota = (callback) => {
  const nombre = prompt("Nombre de la mascota a eliminar:");
  eliminarMascotaPorNombre(nombre)
    .then(msg => {
      alert(msg);
      callback();
    })
    .catch(err => {
      alert(err);
      callback();
    });
};

const eliminarMascotaPorNombre = (nombre) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mascotas.findIndex(m => m.nombre.toLowerCase() === nombre.toLowerCase());
      if (index === -1) return reject("Mascota no encontrada.");
      mascotas.splice(index, 1);
      resolve("Mascota eliminada exitosamente.");
    }, 2000);
  });
};

// Ver mascotas de un dueño
const verMascotasDeDueño = async (callback) => {
  const cedula = prompt("Cédula del dueño:");
  const dueño = dueños.find(d => d.cedula === cedula);
  if (!dueño) {
    alert("Dueño no encontrado.");
    return callback();
  }

  await esperar(2000);
  const resultado = mascotas.filter(m => m.idDueño === dueño.id);

  if (resultado.length === 0) alert("Este dueño no tiene mascotas.");
  else resultado.forEach(m => console.log(m));
  callback();
};

// Menú Principal
const mostrarMenu = () => {
  const opcion = prompt(`--- MENÚ VETERINARIA ---
1. Registrar nuevo dueño
2. Registrar nueva mascota
3. Listar todas las mascotas
4. Buscar mascota por nombre
5. Actualizar estado de salud
6. Eliminar mascota por nombre
7. Ver mascotas de un dueño
8. Salir`);

  switch (opcion) {
    case "1": registrarDueño(mostrarMenu); break;
    case "2": registrarMascota(mostrarMenu); break;
    case "3": listarMascotas(mostrarMenu); break;
    case "4": buscarMascota(mostrarMenu); break;
    case "5": actualizarSalud(mostrarMenu); break;
    case "6": eliminarMascota(mostrarMenu); break;
    case "7": verMascotasDeDueño(mostrarMenu); break;
    case "8": alert("Gracias por usar el sistema."); break;
    default:
      alert("Opción inválida.");
      mostrarMenu();
  }
};

mostrarMenu();