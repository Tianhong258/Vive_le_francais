"use client"
import React, { useState, useEffect } from 'react'
import NavBar from "../../components/NavBar";
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

//bouton modifier => modifier et supprimer le compte
//bouton déconnecter

async function getProfil(id) {
    try {
        let response = await fetch(`http://localhost:3001/api/auth/profil/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
        let data = await response.json();
        console.log("profil data est " + data)
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération de le profil de l'utilisateur :", error);
    }
}


export default function modificationProfil({ params }) {
    const [viewModification, setViewModification] = useState(false)
    const [profil, setProfil] = useState(null)
    useEffect(() => {
        async function getUtilisateur() {
            const getData = await getProfil(params.id)
            setProfil(getData)
            const defaultValues = {
                pseudo: getData.pseudo,
                email: getData.email,
                password: getData.password
            };
            reset(defaultValues);
        }
        getUtilisateur()
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()


    const onSubmit = async (data) => {
        try {
            const response = await fetch(`http://localhost:3001/api/auth/${params.id}`, {
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
                        <CardTitle>Modifier votre profil</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="id">Id</Label>
                                    <Input type="text" id="id" name="id" readOnly value={params.id} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="pseudo">Pseudo</Label>
                                    <Input type="text" id="pseudo" name="pseudo" placeholder="pseudo" {...register("pseudo")} />
                                    {errors.pseudo && <span>Ce champs est obligatoire ! </span>}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="text" id="email" name="email" placeholder="email"  {...register("email")} />
                                    {errors.email && <span>Ce champs est obligatoire ! </span>}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input type="text" id="password" name="password" placeholder="password"  {...register("password")} />
                                    {errors.password && <span>Ce champs est obligatoire ! </span>}
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
            Votre profil est bien modifié !
        </div>
    </>
    ))

}