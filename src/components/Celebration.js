import React from "react";
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const Celebration = () => {

    // const { width, height } = useWindowSize()

  return (
    <div>
      <Confetti numberOfPieces={500} width={window.innerWidth} height={window.innerHeight} />
    </div>
  );
};

export default Celebration;
