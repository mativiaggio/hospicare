import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPhoneNumber = (numero: number) => {
  let numStr = numero.toString();

  if (numStr.startsWith("54")) {
    numStr = numStr.slice(2);
  }

  let esMovil = false;

  if (numStr.startsWith("9")) {
    esMovil = true;
    numStr = numStr.slice(1);
  }

  const codigosArea = [2, 3, 4];
  let codigoArea = "";
  let numeroLocal = "";

  for (const longitud of codigosArea) {
    const posibleCodigo = numStr.slice(0, longitud);
    codigoArea = posibleCodigo;
    numeroLocal = numStr.slice(longitud);
    break;
  }

  let numeroFormateado = "";
  if (numeroLocal.length === 8) {
    numeroFormateado = `${numeroLocal.slice(0, 4)}-${numeroLocal.slice(4)}`;
  } else if (numeroLocal.length === 7) {
    numeroFormateado = `${numeroLocal.slice(0, 3)}-${numeroLocal.slice(3)}`;
  } else {
    numeroFormateado = numeroLocal;
  }

  let telefonoFormateado = "+54 ";
  if (esMovil) {
    telefonoFormateado += "9 ";
  }
  telefonoFormateado += `${codigoArea} ${numeroFormateado}`;

  return telefonoFormateado;
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const calcularEdad = (fechaNacimiento: string | undefined): number => {
  if (fechaNacimiento != undefined) {
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();
    const dia = hoy.getDate() - fechaNacimientoDate.getDate();

    // Ajustar la edad si el mes actual es menor o si estamos en el mes de nacimiento pero antes del día.
    if (mes < 0 || (mes === 0 && dia < 0)) {
      edad--;
    }

    return edad;
  } else {
    return 0;
  }
};

export const dateFormat = (fecha: string | undefined): string => {
  if (fecha != undefined) {
    const fechaDate = new Date(fecha);

    // Validar si la fecha es válida
    if (isNaN(fechaDate.getTime())) {
      throw new Error("La fecha proporcionada no es válida.");
    }

    // Obtener los componentes de la fecha
    const dia = fechaDate.getDate().toString().padStart(2, "0");
    const mes = (fechaDate.getMonth() + 1).toString().padStart(2, "0"); // Los meses comienzan desde 0
    const anio = fechaDate.getFullYear();

    return `${dia}/${mes}/${anio}`;
  } else {
    return "";
  }
};
