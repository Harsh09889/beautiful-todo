import Table from "./components/Table";
import { useSpring, animated } from "react-spring";
import Celebration from "./components/Celebration";
import { useState } from "react";

function App() {

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
