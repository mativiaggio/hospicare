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
