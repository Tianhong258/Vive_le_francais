"use client";
import React, { useState, useEffect } from 'react';
import { HfInference } from "@huggingface/inference";
import NavBar from "../components/NavBar";


//todo: le premier clique il y a une erreur "TypeError: Cannot read properties of null (reading 'signal')"
export default function Correction() {
  const [generatedText, setGeneratedText] = useState([]);
  const [textInput, setTextInput] = useState("");

  const handleOnChange = (event) => {
    const value = event.target.value;
    setTextInput(value);
  };
  //todo : Le stream de texte change trop vite
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
      console.log("input est " + input);
      yield tokens;
    }
  }

  async function handleRun() {
    const controller = new AbortController();
    const message =
      "<s>[INST]{:}[/INST]";
    //todo : améliorer le promp, trop embêtent d'avoir toujours félicitations
    const input = message.replace(
      "{:}",
      `Tu es un assistant qui corrige tout le temps la syntaxe et l'orthographe des phrases françaises. Si la phrase est correcte, tu peux me répondre "Félicitations ! Votre phrase est correcte ! ", si la phrase n'est pas correcte, tu peux juste l'afficher la phrase corrigée sans afficher d'autres phrases, maintenant tu me corrige la phrase suivante : ${textInput}`
    );
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
    } catch (e) {
      console.log(e);
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
                  Entrez la phrase français que vous voulez corriger : 
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
                  onClick={()=>controller.abort()}
                >
                  Arrêter
                </button>
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleRun}                
                >
                  Submettre
                </button>
              </div>
            </div>
      </form>
        <div id="generation">
          {generatedText}
        </div>
        </div>
      {/* 
      <div className="container">
          <h1>Entrez la phrase français que vous voulez corriger : </h1>
          <Input id="input" type="text" style={{ width: '500px', marginTop: '20px' }} onChange={handleOnChange}/>
        
          <button id="run" type="button" class="btn btn-primary" onClick={handleRun}>Run</button>
          <button id="abort" type="button" class="btn btn-danger"  onClick={()=>controller.abort()}>Abort</button>
      </div>
        <div id="generation">
          {generatedText}
        </div>
      </div> */}
    </div>
  );
}

    



