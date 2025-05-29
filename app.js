const dueños = [];
const mascotas = [];

let idDueño = 1;
let idMascota = 1;

const registrarDueño = () => {
  const nombre = prompt("Nombre del dueño:");
  const cedula = prompt("Cédula:");
  const telefono = prompt("Teléfono:");
  const correo = prompt("Correo electrónico:");

  if (!nombre || !cedula || !telefono || !correo) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  dueños.push({ id: idDueño++, nombre, cedula, telefono, correo });
  alert("Dueño registrado con éxito.");
};

const registrarMascota = () => {
  const cedulaDueño = prompt("Cédula del dueño:");
  const dueño = dueños.find(d => d.cedula === cedulaDueño);

  if (!dueño) {
    alert("Dueño no encontrado.");
    return;
  }

  const nombre = prompt("Nombre de la mascota:");
  const especie = prompt("Especie (Perro, Gato, Ave, Reptil, Otro):");
  const edad = parseFloat(prompt("Edad (años):"));
  const peso = parseFloat(prompt("Peso (kg):"));
  const estadoSalud = prompt("Estado de salud (Sano, Enfermo, En tratamiento):");

  if (!nombre || !especie || isNaN(edad) || edad <= 0 || isNaN(peso) || peso <= 0 ||
    !["Sano", "Enfermo", "En tratamiento"].includes(estadoSalud)) {
    alert("Datos inválidos.");
    return;
  }

  mascotas.push({
    id: idMascota++, nombre, especie, edad, peso, estadoSalud,
    idDueño: dueño.id
  });

  alert("Mascota registrada con éxito.");
};

// Otras funciones sincrónicas: listar, buscar, actualizar, eliminar, ver por dueño
const registrarDueñoAsync = (callback) => {
  setTimeout(() => {
    registrarDueño();
    callback();
  }, 1500);
};

const registrarMascotaAsync = (callback) => {
  setTimeout(() => {
    registrarMascota();
    callback();
  }, 2000);
};
const buscarMascotaPorNombre = (nombre) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const resultado = mascotas.filter(m => m.nombre.toLowerCase() === nombre.toLowerCase());
      resolve(resultado);
    }, 1500);
  });
};

const eliminarMascotaPorNombre = (nombre) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mascotas.findIndex(m => m.nombre === nombre);
      if (index !== -1) {
        mascotas.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 2000);
  });
};
//
const actualizarSaludMascota = async () => {
  const nombre = prompt("Nombre de la mascota a actualizar:");
  const mascota = mascotas.find(m => m.nombre === nombre);

  if (!mascota) return alert("Mascota no encontrada.");

  await new Promise(res => setTimeout(res, 1000));
  const nuevoEstado = prompt("Nuevo estado de salud:");
  mascota.estadoSalud = nuevoEstado;
  alert("Estado actualizado.");
};

const verMascotasDeDueño = async () => {
  const cedula = prompt("Ingrese cédula del dueño:");
  const dueño = dueños.find(d => d.cedula === cedula);

  if (!dueño) return alert("Dueño no encontrado.");

  await new Promise(res => setTimeout(res, 2000));
  const resultados = mascotas.filter(m => m.idDueño === dueño.id);
  console.log(`Mascotas de ${dueño.nombre}:`, resultados);
};

const menu = async () => {
  let opcion;

  do {
    opcion = prompt(
      `Seleccione una opción:
1. Registrar dueño
2. Registrar mascota
3. Listar mascotas
4. Buscar mascota
5. Actualizar salud
6. Eliminar mascota
7. Ver mascotas por dueño
8. Salir`
    );

    switch (opcion) {
      case "1":
        registrarDueñoAsync(() => menu());
        return;
      case "2":
        registrarMascotaAsync(() => menu());
        return;
      case "3":
        console.log(mascotas);
        break;
      case "4":
        const nombre = prompt("Nombre de la mascota:");
        const resultado = await buscarMascotaPorNombre(nombre);
        console.log(resultado.length ? resultado : "No encontrada");
        break;
      case "5":
        await actualizarSaludMascota();
        break;
      case "6":
        const eliminar = prompt("Nombre de la mascota a eliminar:");
        const confirmacion = await eliminarMascotaPorNombre(eliminar);
        alert(confirmacion ? "Eliminada." : "No encontrada.");
        break;
      case "7":
        await verMascotasDeDueño();
        break;
    }
  } while (opcion !== "8");
};

menu();
