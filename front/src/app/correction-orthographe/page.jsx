"use client";
import React, { useState, useEffect } from 'react';
import { HfInference } from "@huggingface/inference";


export default function Correction(){
  const [generatedText, setGeneratedText] = useState([]);
    const[controller, setController] = useState(null)
    const[textInput, setTextInput] = useState("")

    
   const handleOnChange = (event) => {
    const value = event.target.value
    setTextInput(value)
}


async function* textStreamRes(hf, controller, input){
    let tokens = [];
   
    for await (const output of hf.textGenerationStream(
      {
        model: "mistralai/Mistral-7B-Instruct-v0.1",
        inputs: input,
        parameters: { max_new_tokens: 1000 },
      },
      {
        use_cache: false,
        signal: controller.signal,
      }
    )) {
      tokens.push(output);
      console.log(tokens)
      yield tokens;
    }
  };


   async function handleRun(){
    setController(new AbortController());
      const message = "<s>[INST]{:}[/INST]";
      const input = message.replace("{:}", textInput);
      const token = "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"
      const hf = new HfInference(token);
      try {
        let newToken = []
        for await (const tokens of textStreamRes(hf, controller.signal, input)) {
            if(tokens[tokens.length-1].token.text != "</s>") {
                newToken.push(tokens[tokens.length-1].token.text)
            }
          //setGeneratedText([...generatedText, lastToken.token.text]);
        }
        setGeneratedText(newToken)
      } catch (e) {
        console.log(e);
      }
    };


 

  return (
    <div>
      <input id="input" type="text" onChange={handleOnChange}/>
      <button id="run" onClick={handleRun}>Run</button>
      <button id="abort" onClick={()=>controller.abort()}>Abort</button>
      <div id="generation">
      {generatedText.map((token, index) => (
        <span key={index}>{token}</span>
      ))}
    </div>
    </div>
  );
};



