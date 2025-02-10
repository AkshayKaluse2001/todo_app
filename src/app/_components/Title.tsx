import React from "react";
import { TitleProps } from "../types/todoType";

const Title: React.FC<TitleProps> = ({ text }) => {
  return <h1 className="text-2xl font-bold mb-4">{text}</h1>;
};

export default Title;
