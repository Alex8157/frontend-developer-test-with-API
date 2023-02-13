import React from "react";
import "../styles/product.css";

export const Product = (props) => {
  const makePrice = (price) => {
    return price
      .toString()
      .replace(/[^+\d]/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  return (
    <div className="product">
      <img src={props.product.images[0]} className="productImage"></img>
      <div className="productText">
        <h3 className="productName">{props.product.title}</h3>
        <div className="productDescription">{props.product.description}</div>
        <h2 className="productPrice">{makePrice(props.product.price)} руб.</h2>
      </div>
    </div>
  );
};
