import React, { useState, useEffect } from "react";
import { PostService } from "../API/PostService";
import { InputWarning } from "./UI/inputWithWarning/InputWarning";
import { ColorChangingButton } from "./UI/colorChangingButton/ColorChangingButton";
import "../styles/addBlock.css";

export default function AddBlock(props) {
  const [name, changeName] = useState("");
  const [description, changeDescription] = useState("");
  const [link, changeLink] = useState("");
  const [price, changePrice] = useState(0);
  const [additionAllowed, changeAdditionAllowed] = useState(0);
  const [nameWarning, changeNameWarning] = useState(0);
  const [linkWarning, changeLinkWarning] = useState(0);
  const [priceWarning, changePriceWarning] = useState(0);

  const handleСhangeName = (event) => {
    changeName(event.target.value);
  };

  const handleСhangeDescription = (event) => {
    changeDescription(event.target.value);
  };

  const handleChangeLink = (event) => {
    changeLink(event.target.value);
  };

  const handleСhangePrice = (event) => {
    changePrice(
      event.target.value
        .toString()
        .replace(/[^+\d]/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    );
  };

  useEffect(() => {
    if (name && link && price) {
      changeAdditionAllowed(1);
    } else {
      changeAdditionAllowed(0);
    }
  }, [name, link, price]);

  const addProduct = async (product) => {
    PostService.addProduct(product);
  };

  const add = async () => {
    if (additionAllowed) {
      await addProduct({
        title: name,
        description: !description ? " " : description,
        images: [link],
        categoryId: Math.round(Math.random() * 4 + 1),
        price: +price.replace(/\s/g, ""),
      });
      props.makeAddTrue();
      changeName("");
      changeDescription("");
      changeLink("");
      changePrice(0);
      changeAdditionAllowed(0);
      changeNameWarning(0);
      changeLinkWarning(0);
      changePriceWarning(0);
    } else {
      if (!name) {
        changeNameWarning(1);
      }
      if (!link) {
        changeLinkWarning(1);
      }
      if (!price) {
        changePriceWarning(1);
      }
    }
  };

  return (
    <div className="outdoorAddBlock">
      <div className="addBlock">
        <div className="fieldBlock">
          <div>Наименование товара</div>
          <div className="requiredField"></div>
        </div>
        <InputWarning
          name={"name"}
          placeholder={"Введите наименование товара"}
          changeHandler={handleСhangeName}
          value={name}
          warningSignal={nameWarning}
        ></InputWarning>
        <div className="fieldBlock">
          <div>Описание товара</div>
        </div>
        <textarea
          placeholder="Введите описание товара"
          onChange={handleСhangeDescription}
          value={description}
        ></textarea>
        <div className="fieldBlock">
          <div>Ссылка на изображение товара</div>
          <div className="requiredField"></div>
        </div>
        <InputWarning
          name={"link"}
          placeholder={"Введите ссылку на изображение"}
          changeHandler={handleChangeLink}
          value={link}
          warningSignal={linkWarning}
        ></InputWarning>
        <div className="fieldBlock">
          <div>Цена товара</div>
          <div className="requiredField"></div>
        </div>
        <InputWarning
          name={"price"}
          placeholder={"Введите цену товара"}
          changeHandler={handleСhangePrice}
          value={price}
          warningSignal={priceWarning}
        ></InputWarning>
        <ColorChangingButton
          onClickFunction={add}
          change={additionAllowed}
          value={"Добавить товар"}
        ></ColorChangingButton>
      </div>
    </div>
  );
}
