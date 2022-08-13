import Table from "./components/Table";
import { useSpring, animated } from 'react-spring';


function App() {
  
  const wholeAnimation = useSpring({
        
    transform: 'scale(1) translateY(0)',

    from:{
        transform: 'scale(0) translateY(-150%)',
    }
})

  return (
    <animated.div className="card mask-custom" style = {wholeAnimation}>
      {/* <Timer initialSeconds= {0} initialMinute={2}/> */}
      <div className="card-head">
        <img alt="logo" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp" />
        <h1 className="head-text">To-Do List</h1>
      </div>
      <Table />
    </animated.div>
  );
}

export default App;
