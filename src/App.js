import Table from "./components/Table";

function App() {
  return (
    <div className="card mask-custom">
      
      <div className="card-head">
        <img alt="logo" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp" />
        <h1 className="head-text">My Tasks</h1>
      </div>
      <Table />
    </div>
  );
}

export default App;
