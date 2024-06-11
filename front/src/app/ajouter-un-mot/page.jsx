"use client"
import React, { useState } from "react"
import NavBar from "../components/NavBar"
import { useForm } from "react-hook-form"

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
  const [viewVocabulaire, setViewVocabulaire] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/api/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Une erreur est survenue');
      }
      const json = await response.json()
      console.log(json)
      setViewVocabulaire(true)
    } catch (error) {
      throw error
    }
  }

  function refreshPage() {
    window.location.reload();
  }


  return (!viewVocabulaire ? (
    <>
      <div>
        <NavBar />
      </div>
      <div className="flex justify-center items-center h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Ajouter un mot</CardTitle>
            <CardDescription>Ajouter un mot à apprendre</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="mot">Nouveau mot</Label>
                  <Input id="mot" name="mot" {...register("fr", { required: true })} />
                  {errors.fr && <span>Ce champs est obligatoire ! </span>}

                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="traduction">Traduction</Label>
                  <Input id="traduction" name="traduction" {...register("ch", { required: true })} />
                  {errors.ch && <span>Ce champs est obligatoire ! </span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="jeux">Traduction en un mot</Label>
                  <Input id="jeux" placeholder="Il sert aux jeux memory" name="jeux" {...register("jeux", { required: true })} />
                  {errors.jeux && <span>Ce champs est obligatoire ! </span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Button variant="outline">Annuler</Button>
                  <Button style={{ backgroundColor: 'rgb(52, 84, 180)' }} type="submit">Soumettre</Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  ) : (<>
    <div className="flex justify-center items-center h-screen">
      Votre nouveau vocabulaire est bien enregistré !
      <div>
        <Button style={{ backgroundColor: 'rgb(52, 84, 180)' }} onClick={() => refreshPage()}>Ajouter un autre mot</Button>
      </div>
    </div>
  </>
  ))

}


