"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import Link from 'next/link';
import NavBar from "../components/NavBar";

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Vocabulaire</TableHead>
          <TableHead>Définition</TableHead>
          <TableHead>Voir les détails</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>    
        {liste.map((vocabulaire, index) =>
          <TableRow key={index}>
            <TableCell className="font-medium">{vocabulaire.fr}</TableCell>
            <TableCell className="font-medium">{vocabulaire.jeux}</TableCell>
            <TableCell><Button><Link href={`/mon-cahier/detail-mot/${vocabulaire._id}`}>Détails</Link></Button></TableCell>
          </TableRow>
        )}
      </TableBody>
</Table>
</div>
  )
}
