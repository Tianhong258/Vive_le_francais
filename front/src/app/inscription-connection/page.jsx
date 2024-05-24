"use client";
//todo : validation du mot de passe : au moins 1 lettre majuscule !

    import { zodResolver } from "@hookform/resolvers/zod";
    import { useForm } from "react-hook-form";
    import { Button } from "@/components/ui/button";
    import {
      Form,
      FormControl,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
    } from "@/components/ui/form";
    import { Input } from "@/components/ui/input";
    import { useToast } from "@/components/ui/use-toast";
    import NavBar from "../components/NavBar"
    import { z } from "zod";
    import { Separator } from "@/components/ui/separator"

   
  const FormSchema = z.object({
    pseudo: z.string().min(2, {message: "Le pseudo doit comporter au moins 2 caractères"}),
    email: z.string().min(1, {message: "Entrez une adresse mail, SVP !"}).email(),
    password: z.string().min(4, {message: "Le mot de passe doit comporter au moins 4 caractères ! "}),
    confirmPassword: z.string().min(4, {message: "Le mot de passe doit comporter au moins 4 caractères"})
    }).refine((data) => data.password === data.confirmPassword, {
       path: ["confirmPassword"],
      message: "Les mots de passe ne correspondent pas !"
  });

    export default function inscription() {

    const { toast } = useToast()
     
      const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pseudo: "",
            email:"",
            password: "",
            confirmPassword:"",
      }});
     


      async function onSubmitInscription(data) {
       
        try{
          const response = await fetch("http://localhost:3001/api/auth/inscription", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({data}), 
            });
          const json = await response.json()
          console.log(data)
          toast({
            title: "Vous vous êtes bien inscript ! ",
            description: "Bienvenue chez Vive le Français !",
          })
            console.log("c'est bien submit")
        }catch(error){
            toast({
                variant: "destructive",
                title: "Oups, il y a une erreur ! ",
                description: "Vous pourrez essayer un peu plus tard !",
              });
          throw error
          
        }
  }

      return (
        <>
        <div>
            <NavBar/>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitInscription)} className="w-2/3 space-y-6 gap-4">
            <FormField
              name="pseudo"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pseudo</FormLabel>
                  <FormControl>
                    <Input className="w-1/2" placeholder="Pseudo" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
           
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="w-1/2" placeholder="Email" {...field} />  
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
             <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de Passe</FormLabel>
                  <FormControl>
                    <Input className="w-1/2" type="password" placeholder="Mot de Passe" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )} />
             <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmez votre mot de passe</FormLabel>
                  <FormControl>
                    <Input className="w-1/2" type="password" placeholder="Confirmez le mot de passe" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <Separator  orientation="vertical" />
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitInscription)} className="w-2/3 space-y-6 gap-4">
            <FormField
              name="pseudo"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pseudo</FormLabel>
                  <FormControl>
                    <Input className="w-1/2" placeholder="Pseudo" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
           
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="w-1/2" placeholder="Email" {...field} />  
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
             <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de Passe</FormLabel>
                  <FormControl>
                    <Input className="w-1/2" type="password" placeholder="Mot de Passe" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )} />
             <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmez votre mot de passe</FormLabel>
                  <FormControl>
                    <Input className="w-1/2" type="password" placeholder="Confirmez le mot de passe" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>

        </>

      );
    }
    



  