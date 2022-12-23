import React, { useState } from "react";
import AddBlock from "./addBlock";
import Products from "./products";
import "./page.css";

export default function Page() {
  const [add, changeAdd] = useState(false);
  return (
    <>
      <h1 className="label">Добавление товара</h1>
      <div className="page">
        <AddBlock
          makeAddTrue={() => {
            changeAdd(true);
          }}
        ></AddBlock>
        <Products
          makeAddFalse={() => {
            changeAdd(false);
          }}
          add={add}
        ></Products>
      </div>
    </>
  );
}
