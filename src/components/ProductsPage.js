import React, { useState } from "react";
import AddBlock from "./AddBlock";
import Products from "./Products";
import "../styles/page.css";

export default function ProductsPage() {
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
