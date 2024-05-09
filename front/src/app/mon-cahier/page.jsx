"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import Link from 'next/link';
import NavBar from "../components/NavBar";
//Todo : mettre en page : 10 mots par page, trier par ordre alphabétique : regarde shadcn/ui Table
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '@/components/ui/button'

  
async function getListVocabulaire(){
  try{
    let response = await fetch("http://localhost:3001/api/");
    let data = await response.json();
    return data;
  } catch (error) {
      console.error("Erreur lors de la récupération de la liste de vocabulaire :", error);
  }
}

export default function cahier(){
  const [liste, setListe] = useState([])
  useEffect(() => {
    async function generateliste(){
      const getData = await getListVocabulaire()
      setListe(getData)
    }
    generateliste()
 }, []);

  return (
    <div>
      <div>
        <NavBar/>
      </div>
        <Table className="text-center">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Vocabulaire</TableHead>
              <TableHead className="text-center">Définition</TableHead>
              <TableHead className="text-center">Voir les détails</TableHead>
            </TableRow>
          </TableHeader>
        <TableBody>    
            {liste.map((vocabulaire, index) =>
            <TableRow key={index} className="text-center">
              <TableCell className="font-medium text-center">{vocabulaire.fr}</TableCell>
              <TableCell className="font-medium">{vocabulaire.jeux}</TableCell>
              <TableCell className="font-medium">
              <Link href={`/mon-cahier/${vocabulaire._id}`}><Button style={{backgroundColor: 'rgb(52, 84, 180)'}}>Détails</Button></Link>
              </TableCell>
            </TableRow>
            )}
        </TableBody>
      </Table>
    </div>
  )
}
