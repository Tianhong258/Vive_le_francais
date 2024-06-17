"use client";
import React, { useState, useEffect } from 'react';
import { HfInference } from "@huggingface/inference";
import NavBar from "../components/NavBar";
import { Button } from '@/components/ui/button';



export default function Correction() {
  const [generatedText, setGeneratedText] = useState([]);
  const [textInput, setTextInput] = useState("");

  const handleOnChange = (event) => {
    const value = event.target.value;
    setTextInput(value);
  };
  //todo : Le stream de texte est généré trop vite
  async function* textStreamRes(hf, controller, input) {
    let tokens = [];

    for await (const output of hf.textGenerationStream(
      {
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        inputs: input,
        parameters: { max_new_tokens: 1000 },
      },
      {
        use_cache: false,
        signal: controller.signal,
      }
    )) {
      tokens.push(output);
      yield tokens;
    }
  }

  async function handleRun() {
    const controller = new AbortController();
    const message =
      "<s>[INST]{:}[/INST]";
    const input = message.replace(
      "{:}",
      `Tu es un assistant spécialisé dans la correction de la syntaxe et de l'orthographe des phrases en français. Si la phrase est correcte, réponds simplement par "Félicitations ! Votre phrase est correcte !". Si la phrase est incorrecte, affiche uniquement la phrase corrigée sans ajouter d'autres commentaires. Corrige la phrase suivante :${textInput}`
    );
    //todo : il faut cacher dans le .env
    const token = "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";
    const hf = new HfInference(token);
    try {
      let newToken = [];
      for await (const tokens of textStreamRes(
        hf,
        controller ? controller.signal : undefined,
        input
      )) {
        if (tokens[tokens.length - 1].token.text != "</s>") {
          newToken.push(tokens[tokens.length - 1].token.text);
          setGeneratedText(newToken.slice());
        }
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
      {/* <div className="space-y-12">  */}
      <div className="space-y-12 flex flex-col items-center justify-center h-full">
        <form className="flex flex-col items-center justify-center">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="phrase"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Entrez la phrase française que vous voulez corriger :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="phrase"
                    id="phrase"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => controller.abort()}
              >
                Arrêter
              </button>
              <Button
                type="button"
                style={{ backgroundColor: 'rgb(52, 84, 180)' }}
                onClick={handleRun}
              >
                Submettre
              </Button>
            </div>
          </div>
        </form>
        <div id="generation">
          {generatedText}
        </div>
      </div>
    </div>
  );
}





