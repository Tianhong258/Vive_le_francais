"use client";
//todo : validation du mot de passe : au moins 1 lettre majuscule !

    import { zodResolver } from "@hookform/resolvers/zod";
    import { useForm, Controller } from "react-hook-form";
    import { z } from "zod";
    
    import { Button } from "@/components/ui/button";
    import {
      Form,
      FormControl,
      FormDescription,
      FormItem,
      FormLabel,
      FormMessage,
    } from "@/components/ui/form";
    import { Input } from "@/components/ui/input";
    import { toast } from "@/components/ui/use-toast";
    import NavBar from "../components/NavBar"

   

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
          console.log(json)
          toast({
            title: "You submitted the following values:",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
              </pre>
            ),
          });
            console.log("c'est bien submit")
        }catch(error){
            toast({
                title: "Oups, il y a une erreur"
              });
          throw error
          
        }
  }
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
        const {
            formState: { errors },
          } = useForm();
       

      const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pseudo: "",
            email:"",
            motDePasse: "",
            confirmeMotDePasse:"",
      }});

      return (
        <>
        <div>
            <NavBar/>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitInscription)} className="w-2/3 space-y-6 gap-4">
            <Controller
              name="pseudo"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pseudo</FormLabel>
                  <FormControl>
                    <Input placeholder="Pseudo" {...field} />
                  </FormControl>
                  {errors?.pseudo && <span>{errors.pseudo.message}</span>}
                </FormItem>
              )}
            />
           
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />  
                  </FormControl>
                  {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
                </FormItem>
              )}
            />
             <Controller
              name="motDePasse"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de Passe</FormLabel>
                  <FormControl>
                    <Input placeholder="Mot de Passe" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )} />
             <Controller
              name="confirmeMotDePasse"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmez votre mot de passe</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirmez le mot de passe" {...field} />
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
    



  