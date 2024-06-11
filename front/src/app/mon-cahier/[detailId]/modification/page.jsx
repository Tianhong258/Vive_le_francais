"use client"
import React, { useState, useEffect } from "react"
import NavBar from "../../../components/NavBar"
import { useForm } from "react-hook-form"
import { getDetail } from "../../getDatail"


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

//todo:afficher les erreurs quand le fetch ne marche pas 

export default function modifierVocabulaire({ params }) {
  const [viewModification, setViewModification] = useState(false)
  const [data, setData] = useState({})


  useEffect(() => {
    async function getDetailVocabulaire() {
      const getData = await getDetail(params.detailId);
      setData(getData);
      const defaultValues = {
        fr: getData.fr,
        ch: getData.ch,
        jeux: getData.jeux
      };
      reset(defaultValues);
    }

    getDetailVocabulaire();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()


  const onSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:3001/api/${params.detailId}`, {
        method: "PUT",
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
      setViewModification(true)
    } catch (error) {
      throw error
    }
  }

  return (!viewModification ? (
    <>
      <div>
        <NavBar />
      </div>
      <div className="flex justify-center items-center h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Modifier le mot</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="fr">Nouveau mot</Label>
                  <Input type="text" id="fr" name="fr" placeholder="fr" {...register("fr")} />
                  {errors.fr && <span>Ce champs est obligatoire ! </span>}

                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="ch">Traduction</Label>
                  <Input type="text" id="ch" name="ch" placeholder="ch" {...register("ch")} />
                  {errors.ch && <span>Ce champs est obligatoire ! </span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="jeux">Traduction en un mot</Label>
                  <Input type="text" id="jeux" name="jeux" placeholder="jeux"  {...register("jeux")} />
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
      Votre nouveau vocabulaire est bien modifié !
    </div>
  </>
  ))

}
