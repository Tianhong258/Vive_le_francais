import { Fragment, useState, useEffect, react, createContext, useContext } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { AuthContext } from '../authContext';
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast";

//todo : ajouter le logo et un footer
const Jeux = [
  { name: 'Association', href: "association", description: 'Réviser mot par mot', icon: ChartPieIcon },
  { name: 'Memory', href: "memory", description: 'Réviser comme un jeux de mémoriser', icon: CursorArrowRaysIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function navBar() {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { toast } = useToast()

  async function deconnection() {
    try {
      const response = await fetch("http://localhost:3001/api/auth/deconnection", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Une erreur est survenue');
      }
      const json = await response.json();
      toast({
        title: " Vous vous êtes déconnecté !",
        description: "A bientôt ! ",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oups, il y a une erreur !",
        description: "Vous pourrez réessayer plus tard.",
      });
      console.error("Erreur lors de la déconnection :", error);
    }
  };


  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-start">
          <Link href="/">
            <img src="/logo_instant.png" alt="Logo du site" className="h-8 w-8 mr-2 " />
          </Link>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Jeux
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {Jeux.map((item) => (
                    <Link href={`/jeux/${item.href}`} key={item.name}>
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                        </div>
                        <div className="flex-auto">
                          {item.name}
                          <span className="absolute inset-0" />
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          <Link href="/mon-cahier" className="text-sm font-semibold leading-6 text-gray-900">
            Mon cahier
          </Link>
          <Link href="/ajouter-un-mot" className="text-sm font-semibold leading-6 text-gray-900">
            Ajouter un mot
          </Link>
          {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Ma progression
          </a> */}
          <Link href="/correction-orthographe" className="text-sm font-semibold leading-6 text-gray-900">
            Correction orthographe
          </Link>
          {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            A propos
          </a> */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isAuthenticated ? (
              <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                  Bienvenue, {user?.pseudo} !
                  <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute left-1/2 transform -translate-x-1/2 top-full z-10 mt-2 max-w-sm w-full overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      <Link href={`/profil/${user?.utilisateurs_Id}`} >
                        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                          <div className="flex-auto">
                            Profil
                            <span className="absolute inset-0" />
                          </div>
                        </div>
                      </Link>
                      <button type="button" onClick={() => deconnection()}>
                        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                          <div className="flex-auto">
                            Déconnection
                            <span className="absolute inset-0" />
                          </div>
                        </div>
                      </button>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            ) : (
              <Link href="/inscription-connection" className="text-sm font-semibold leading-6 text-gray-900">
                Inscription/Connexion <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </Popover.Group>

      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-10 w-auto"
                src="/logo_instant.png"
                alt="Logo instant"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Jeux de mémoriser
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {Jeux.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={`/jeux/${item.href}`}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link href="/mon-cahier"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Mon cahier
                </Link>
                <Link
                  href="/ajouter-un-mot"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Ajouter un mot
                </Link>
                {/* <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Ma progression
                </a> */}
                <Link
                  href="/correction-orthographe"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Correction orthographe
                </Link>
                {/* <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  A propos
                </a> */}
              </div>
              <div className="py-6">
                {isAuthenticated ? (
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Bienvenue, {user?.pseudo} !
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          <Disclosure.Button
                            as="a"
                            href={`/profil/${user?.utilisateurs_Id}`}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            Profil
                          </Disclosure.Button>
                          <Disclosure.Button
                            as="a"
                            onClick={() => deconnection()}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            Déconnection
                          </Disclosure.Button>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ) : (
                  <Link href="/inscription-connection" className="text-sm font-semibold leading-6 text-gray-900">
                    Inscription/Connexion <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}


