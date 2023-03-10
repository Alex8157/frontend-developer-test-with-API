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

  const handleĞ¡hangeName = (event) => {
    changeName(event.target.value);
  };

  const handleĞ¡hangeDescription = (event) => {
    changeDescription(event.target.value);
  };

  const handleChangeLink = (event) => {
    changeLink(event.target.value);
  };

  const handleĞ¡hangePrice = (event) => {
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
          <div>ĞĞ°Ğ¸Ğ¼ĞµĞ½Ğ¾Ğ²Ğ°Ğ½Ğ¸Ğµ ÑĞ¾Ğ²Ğ°ÑĞ°</div>
          <div className="requiredField"></div>
        </div>
        <InputWarning
          name={"name"}
          placeholder={"ĞĞ²ĞµĞ´Ğ¸ÑĞµ Ğ½Ğ°Ğ¸Ğ¼ĞµĞ½Ğ¾Ğ²Ğ°Ğ½Ğ¸Ğµ ÑĞ¾Ğ²Ğ°ÑĞ°"}
          changeHandler={handleĞ¡hangeName}
          value={name}
          warningSignal={nameWarning}
        ></InputWarning>
        <div className="fieldBlock">
          <div>ĞĞ¿Ğ¸ÑĞ°Ğ½Ğ¸Ğµ ÑĞ¾Ğ²Ğ°ÑĞ°</div>
        </div>
        <textarea
          placeholder="ĞĞ²ĞµĞ´Ğ¸ÑĞµ Ğ¾Ğ¿Ğ¸ÑĞ°Ğ½Ğ¸Ğµ ÑĞ¾Ğ²Ğ°ÑĞ°"
          onChange={handleĞ¡hangeDescription}
          value={description}
        ></textarea>
        <div className="fieldBlock">
          <div>Ğ¡ÑÑĞ»ĞºĞ° Ğ½Ğ° Ğ¸Ğ·Ğ¾Ğ±ÑĞ°Ğ¶ĞµĞ½Ğ¸Ğµ ÑĞ¾Ğ²Ğ°ÑĞ°</div>
          <div className="requiredField"></div>
        </div>
        <InputWarning
          name={"link"}
          placeholder={"ĞĞ²ĞµĞ´Ğ¸ÑĞµ ÑÑÑĞ»ĞºÑ Ğ½Ğ° Ğ¸Ğ·Ğ¾Ğ±ÑĞ°Ğ¶ĞµĞ½Ğ¸Ğµ"}
          changeHandler={handleChangeLink}
          value={link}
          warningSignal={linkWarning}
        ></InputWarning>
        <div className="fieldBlock">
          <div>Ğ¦ĞµĞ½Ğ° ÑĞ¾Ğ²Ğ°ÑĞ°</div>
          <div className="requiredField"></div>
        </div>
        <InputWarning
          name={"price"}
          placeholder={"ĞĞ²ĞµĞ´Ğ¸ÑĞµ ÑĞµĞ½Ñ ÑĞ¾Ğ²Ğ°ÑĞ°"}
          changeHandler={handleĞ¡hangePrice}
          value={price}
          warningSignal={priceWarning}
        ></InputWarning>
        <ColorChangingButton
          onClickFunction={add}
          change={additionAllowed}
          value={"ĞĞ¾Ğ±Ğ°Ğ²Ğ¸ÑÑ ÑĞ¾Ğ²Ğ°Ñ"}
        ></ColorChangingButton>
      </div>
    </div>
  );
}
