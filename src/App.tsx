import React from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2>React Redux Toolkit CRUD with Validation</h2>
      <Form />
      <Table />
    </div>
  );
};

export default App;
