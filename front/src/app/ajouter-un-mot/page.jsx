"use client"
import React, { useState, useRef, useEffect } from "react"
import NavBar from "../components/NavBar"
import { useForm, SubmitHandler } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ajouterUnMot() {
  const [vocabulaire, setVocabulaire] = useState()
  const form = useRef(null)

  const submit = async(e) => {
    e.preventDafault()
    try{
      const data = new FormData(form.current)
      const response = await fetch("http://localhost:3001/api/", {
          method: "POST",
          body: data
          });
      const json = await response.json()
      setVocabulaire(json.vocabulaire)
    }catch(error){
      throw error
    }
  } 

  return (
    <>
    <div>
      <NavBar/>
    </div>
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Ajouter un mot</CardTitle>
          <CardDescription>Ajouter un mot à apprendre</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} ref={form}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="mot">Nouveau mot</Label>
                <Input id="mot" name="vocabulaire[fr]" defaultValue={vocabulaire.fr} required/>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="traduction">Traduction</Label>
                <Input id="traduction" name="vocabulaire[ch]" defaultValue={vocabulaire.ch} required/>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="jeux">Traduction en un mot</Label>
                <Input id="jeux" placeholder="Il sert aux jeux memory" name="vocabulaire[jeux]" defaultValue={vocabulaire.jeux} required/>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Annuler</Button>
          <Button style={{backgroundColor: 'rgb(52, 84, 180)'}} type="submit">Soumettre</Button>
        </CardFooter>
      </Card>
    </div> 
    </>
  )
}


