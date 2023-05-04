import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()


mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';



function App() {
const [isListening, setIsListening] = useState(false)
const [note, setNote] = useState(null)
const [savedNotes, setSavedNotes] = useState([])

useEffect(()=>{
  handleListen()
},[isListening])


const handleListen = () => {
  if (isListening) {
    mic.start();
    mic.onend = () => {
      console.log("Continue");
      mic.start()
    }
  }else{
    mic.stop();
    mic.onend = () => {
      console.log("Stopped mic");
    }
  }
  mic.onstart = () => {
    console.log("mics on");
  }
  mic.onresult = (event) =>{
    const transcript = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('')
    console.log(transcript);
    setNote(transcript)
    mic.onerror = event => {
      console.log(event.error);
    }
  }
}



  return (
    <>
      <div>
        {isListening ? <span>👍</span> : <span>👌</span> }
        <button onClick={()=>setIsListening(prevState => !prevState)}>Record/Stop</button>
        <p>{note}</p>
      </div>
    </>
  )
}

export default App
