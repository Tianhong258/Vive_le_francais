'use client';
import NavBar from "./components/NavBar";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import React, { useState, useEffect } from 'react';



async function getListVocabulaire(){
  try{
    let response = await fetch("http://localhost:3001/api/");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
      console.error("Erreur lors de la récupération de la liste de vocabulaire :", error);
  }
}

export default function Home() {
  const [isCommandListVisible, setCommandListVisible] = useState(false);
  const [listVocabulaire, setListVocabulaire] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const vocabulaireData = await getListVocabulaire();
      setListVocabulaire(vocabulaireData);
    }
    fetchData();
  }, []);
  
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="flex items-center justify-center">
        <a href="#" className="-m-1.5 p-1.5">
           <span className="sr-only">Logo du site</span>
           <img className="h-40 w-auto mx-auto mt-auto"  src="/logo_instant.png" alt="instant Logo" />
        </a>
      </div>
      <div>
        <Command>
          <CommandInput placeholder="Chercher un mot..." onClick={() => setCommandListVisible(!isCommandListVisible)}/>
          { isCommandListVisible ? (
            <CommandList>
              <CommandEmpty key="empty">Aucun résultat.</CommandEmpty>
                  {listVocabulaire.map((item) => (
                     <CommandItem key={item._id}>
                      <div>
                          {item.fr}
                    </div>
                    </CommandItem>
                  ))}
            </CommandList>) : null
          }
        </Command>
      </div>
   </div>
  );
}



