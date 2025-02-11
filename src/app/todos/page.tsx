import React from "react";
import Todos from "../_components/Todos";

const page = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  const todos = await response.json();

  return <Todos todos={todos} />;
};

export default page;
