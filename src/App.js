import React, { useState, useEffect } from "react";
import "./styles.css";
import { Editor } from "./maps/Editor";

export default function App() {
  const [Mapitems] = useState([
    <Editor />,
  ]);

  const [items] = useState([
    { label: "Test Map", value: 1 }
  ]);

  const [value, setValue] = useState(0);

  return (
    <>
      <div style={{ height: "3vh" }}>
        <b>React ESRI Map Examples --{">"} </b>
        <select onChange={e => setValue(e.currentTarget.value)}>
          {items.map(item => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      {Mapitems[value]}
    </>
  );
}
