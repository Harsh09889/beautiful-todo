import Table from "./components/Table";
import { useSpring, animated } from "react-spring";
import Celebration from "./components/Celebration";
import { useState, useEffect, useCallback } from "react";

function App() {
  const [speechCount, setSpeechCount] = useState(0)
  const speeches = {
    welcome:'Hello, and Welcome To the Tooodooo App made by Harsh Kumar.'
  }

  const playText = useCallback(() => { 
    const utterance = new SpeechSynthesisUtterance(speeches.welcome)
    speechSynthesis.speak(utterance)
  },[speeches.welcome]);

  
  console.log(speechCount)
  useEffect(() => {
    if(speechCount === 0){
      playText()
      console.log("speech")
      setSpeechCount(speechCount+1)
    }
  },[speechCount, playText])
  

  const [showCeleb, setShowCeleb] = useState(false);

  const wholeAnimation = useSpring({
    transform: "scale(1) translateY(0)",

    from: {
      transform: "scale(0) translateY(-150%)",
    },
  });

  return (
    <>
      {showCeleb && <Celebration />}
      <animated.div className="card mask-custom" style={wholeAnimation}>
        <div className="card-head">
          <img
            alt="logo"
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
          />
          <h1 className="head-text">To-Do List</h1>
        </div>
        <Table setShowCeleb = {setShowCeleb} />
      </animated.div>
    </>
  );
}

export default App;
