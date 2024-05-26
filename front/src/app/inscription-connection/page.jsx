"use client";
//todo : validation du mot de passe : au moins 1 lettre majuscule !
//todo: margin left des pseudo
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
    import { Card } from "@/components/ui/card"
    import { Input } from "@/components/ui/input";
    import { useToast } from "@/components/ui/use-toast";
    import NavBar from "../components/NavBar"
    import { z } from "zod";
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
    import Cookies from 'js-cookie';
    import { useAuth } from '../authContext';
    import { jwtDecode }  from 'jwt-decode';

   
  const FormSchemaInscription = z.object({
    pseudo: z.string().min(2, {message: "Le pseudo doit comporter au moins 2 caractères"}),
    email: z.string().min(1, {message: "Entrez une adresse mail, SVP !"}).email(),
    password: z.string().min(4, {message: "Le mot de passe doit comporter au moins 4 caractères ! "}),
    confirmPassword: z.string().min(4, {message: "Le mot de passe doit comporter au moins 4 caractères"})
    }).refine((data) => data.password === data.confirmPassword, {
       path: ["confirmPassword"],
      message: "Les mots de passe ne correspondent pas !"
  });

  const FormSchemaConnection = z.object({
    email: z.string().min(1, {message: "Entrez une adresse mail, SVP !"}).email(),
    password: z.string().min(4, {message: "Le mot de passe doit comporter au moins 4 caractères ! "}),
});

    export default function inscription() {
    const { setIsAuthenticated, setUser } = useAuth();
    const { toast } = useToast()
     
      const formInscription = useForm({
        resolver: zodResolver(FormSchemaInscription
        ),
        defaultValues: {
            pseudo: "",
            email:"",
            password: "",
            confirmPassword:"",
      }});

      const formConnection = useForm({
        resolver: zodResolver(FormSchemaConnection),
        defaultValues: {
            email:"",
            password: "",
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
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Une erreur est survenue');
              }
              const json = await response.json();
              console.log(data);
              toast({
                title: "Inscription réussie !",
                description: "Bienvenue chez Vive le Français ! Vous pouvez maintenant vous connecter.",
              });
            } catch (error) {
              toast({
                variant: "destructive",
                title: "Oups, il y a une erreur !",
                description: error.message + " Vous pourrez vous connecter !" || "Vous pourrez réessayer plus tard.",
              });
              console.error("Erreur lors de l'inscription :", error);
            }
          };


  async function onSubmitConnection(data) {
       
    try{
      const response = await fetch("http://localhost:3001/api/auth/connection", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({data}), 
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Une erreur est survenue');
          }
      const json = await response.json()
      const token = Cookies.get('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        setIsAuthenticated(true);
        setUser(decodedToken);
      }  
      console.log(json)
      toast({
        title: "Vous vous êtes bien connecté ! "
      })
        console.log("L'utilisateur est bien connecté")
    }catch(error){
        toast({
            variant: "destructive",
            title: "Oups, il y a une erreur ! ",
            description:  error.message ||"Vous pourrez réessayer un peu plus tard.",
          });
      throw error 
    }
}

      return (
        <>
        <div>
            <NavBar/>
        </div>
        <div className="flex justify-center items-center h-screen">
        <Tabs defaultValue="connection" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="inscription">Inscription</TabsTrigger>
                <TabsTrigger value="connection">Connection</TabsTrigger>
            </TabsList>
                <TabsContent value="inscription">
                <Card>
                <Form {...formInscription} >
          <form onSubmit={formInscription.handleSubmit(onSubmitInscription)} className="space-y-2 space-x-4">
         
             <FormField
              className="space-y-2"
              name="pseudo"
              control={formInscription.control}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Pseudo</FormLabel>
                  <FormControl>
                    <Input className="w-3/4" placeholder="Pseudo" {...field} />  
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
           
            <FormField
              className="space-y-2"
              name="email"
              control={formInscription.control}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="w-3/4" placeholder="Email" {...field} />  
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
             <FormField
              className="space-y-2"
              name="password"
              control={formInscription.control}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Mot de Passe</FormLabel>
                  <FormControl>
                    <Input className="w-3/4" type="password" placeholder="Mot de Passe" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )} />
             <FormField
              className="space-y-2"
              name="confirmPassword"
              control={formInscription.control}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Confirmez votre mot de passe</FormLabel>
                  <FormControl>
                    <Input className="w-3/4" type="password" placeholder="Confirmez le mot de passe" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button className="space-y-2" type="submit">Submit</Button>
          </form>
        </Form>
        </Card>
                </TabsContent>
                <TabsContent value="connection" className="space-x-2">
                <Card>
                <Form {...formConnection}>
          <form onSubmit={formConnection.handleSubmit(onSubmitConnection)} className="space-y-2 space-x-2">
            <FormField
              className="space-y-2"
              name="email"
              control={formConnection.control}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="w-3/4" placeholder="Email" {...field} />  
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
             <FormField
              className="space-y-2"
              name="password"
              control={formConnection.control}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Mot de Passe</FormLabel>
                  <FormControl>
                    <Input className="w-3/4" type="password" placeholder="Mot de Passe" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )} />
            <Button className="space-y-2" type="submit">Submit</Button>
          </form>
        </Form>
        </Card>
                </TabsContent>
        </Tabs>
        </div>
        </>
      );
    }