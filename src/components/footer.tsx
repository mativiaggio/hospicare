"use client";
import { Separator } from "@/components/ui/separator";
import { useWindowSize } from "@/hooks/use-window-size";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { width } = useWindowSize();
  const isDesktop = width !== undefined && width >= 1280;

  return (
    <>
      {isDesktop && (
        <footer className="text-primary print:hidden bg-main">
          <div className="container p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex gap-2 text-lg font-semibold mb-4">
                  <Link className="flex items-center justify-center" href="/">
                    <span className="flex items-center justify-between gap-2 w-full">
                      <span className="flex items-center gap-2">
                        <Image
                          src={"/static/svg/logo2.svg"}
                          height={40}
                          width={40}
                          alt="Logo"
                          className="block dark:hidden h-[40px] max-h-[40px] w-[40px] max-w-[40px]"
                        />
                        <Image
                          src={"/static/svg/logo2-dark.svg"}
                          height={40}
                          width={40}
                          alt="Logo"
                          className="hidden dark:block h-[40px] max-h-[40px] w-[40px] max-w-[40px]"
                        />
                      </span>
                    </span>
                    <span className="flex flex-col text-primary ml-2 font-bold">
                      <h1 className="text-xl">Hospicare</h1>
                      <p className="text-xs text-nowrap font-normal">
                        por Madre Teresa Hospice
                      </p>
                    </span>
                  </Link>
                </div>
                <p className="text-sm">
                  Brindando atención y cuidado a quienes más lo necesitan. Una
                  iniciativa de nuestra ONG para mejorar la calidad de vida de
                  nuestros huéspedes.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-sm hover:underline">
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link href="/huespedes" className="text-sm hover:underline">
                      Huéspedes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/medicamentos"
                      className="text-sm hover:underline">
                      Medicamentos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/obras-sociales"
                      className="text-sm hover:underline">
                      Obras Sociales
                    </Link>
                  </li>
                  <li>
                    <Link href="/personal" className="text-sm hover:underline">
                      Personal
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <a
                      href="mailto:info@hospicare.org"
                      className="text-sm hover:underline">
                      info@hospicare.org
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <a
                      href="tel:+541234567890"
                      className="text-sm hover:underline">
                      +54 (123) 456-7890
                    </a>
                  </li>
                  <li className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      Calle Principal 123, Ciudad, País
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <Separator className="my-8 bg-primary-foreground/20" />
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-center md:text-left">
                © {currentYear} Hospicare. Todos los derechos reservados.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
