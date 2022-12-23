import React, { useState, useEffect } from "react";
import "./addBlock.css";

export default function AddBlock(props) {
  const [name, changeName] = useState("");
  const [description, changeDescription] = useState("");
  const [link, changeLink] = useState("");
  const [price, changePrice] = useState(0);
  const [additionAllowed, changeAdditionAllowed] = useState(0);
  const [nameText, changeNameText] = useState("");
  const [linkText, changeLinkText] = useState("");
  const [priceText, changePriceText] = useState("");

  const handleСhangeName = (event) => {
    changeName(event.target.value);
  };

  const handleСhangeDescription = (event) => {
    changeDescription(event.target.value);
  };

  const handleChangeLink = (event) => {
    changeLink(event.target.value);
  };

  useEffect(() => {
    if (name) {
      changeNameText("");
    }
    if (name && link && price) {
      changeAdditionAllowed(1);
    } else {
      changeAdditionAllowed(0);
    }
  }, [name]);

  useEffect(() => {
    if (link) {
      changeLinkText("");
    }
    if (name && link && price) {
      changeAdditionAllowed(1);
    } else {
      changeAdditionAllowed(0);
    }
  }, [link]);

  useEffect(() => {
    if (price) {
      changePriceText("");
    }
    if (name && link && price) {
      changeAdditionAllowed(1);
    } else {
      changeAdditionAllowed(0);
    }
  }, [price]);

  const handleСhangePrice = (event) => {
    changePrice(
      event.target.value
        .toString()
        .replace(/[^+\d]/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    );
  };

  const addProduct = async (product) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    return fetch("https://api.escuelajs.co/api/v1/products/", requestOptions)
      .then((response) => response.json())
      .then((data) => data);
  };

  const add = async () => {
    if (additionAllowed) {
      await addProduct({
        title: name,
        description: description,
        images: [link],
        categoryId: 1,
        price: +price.replace(/\s/g, ""),
      });
      props.makeAddTrue();
      changeName("");
      changeDescription("");
      changeLink("");
      changePrice(0);
      changeAdditionAllowed(0);
    } else {
      if (!name) {
        changeNameText("Поле является обязательным");
      }
      if (!link) {
        changeLinkText("Поле является обязательным");
      }
      if (!price) {
        changePriceText("Поле является обязательным");
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
        <input
          placeholder="Введите наименование товара"
          onChange={handleСhangeName}
          value={name}
          style={{
            outline: nameText ? "1px solid #FF8484" : "",
            marginBottom: nameText ? "" : "18.3px",
          }}
        ></input>
        <div className="warning">{nameText}</div>
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
        <input
          placeholder="Введите ссылку"
          onChange={handleChangeLink}
          value={link}
          style={{
            outline: linkText ? "1px solid #FF8484" : "",
            marginBottom: linkText ? "" : "18.3px",
          }}
        ></input>
        <div className="warning">{linkText}</div>
        <div className="fieldBlock">
          <div>Цена товара</div>
          <div className="requiredField"></div>
        </div>
        <input
          placeholder="Введите цену"
          onChange={handleСhangePrice}
          value={price ? price : ""}
          style={{
            outline: priceText ? "1px solid #FF8484" : "",
            marginBottom: priceText ? "" : "18.3px",
          }}
        ></input>
        <div className="warning">{priceText}</div>
        <button
          onClick={add}
          style={{
            backgroundColor: additionAllowed ? "#7BAE73" : "#eeeeee",
            color: additionAllowed ? "#FFFFFF" : "#b4b4b4",
          }}
        >
          Добавить товар
        </button>
      </div>
    </div>
  );
}
