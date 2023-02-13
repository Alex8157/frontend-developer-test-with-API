import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Spinner } from "./UI/spinner/Spinner";
import { Product } from "./Product";
import { DeleteButton } from "./UI/deleteButton/DeleteButton";
import { Select } from "./UI/select/Select";
import { PostService } from "../API/PostService";
import "../styles/products.css";

export default function Products(props) {
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (props.add === true) {
      setFetching(true);
      props.makeAddFalse();
    }
  }, [props.add]);

  useEffect(() => {
    if (fetching) {
      (async () => {
        setProducts([
          ...products,
          ...(await PostService.getProducts(products.length, 10)),
        ]);
        setFetching(false);
      })();
    }
  }, [fetching]);

  useEffect(() => {
    document
      .getElementById("products")
      .addEventListener("scroll", scrollHandler);
    return function name() {
      document
        .getElementById("products")
        .removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const changeSelect = (value) => {
    alert(
      "К сожалению, у https://fakeapi.platzi.com нет API с пагинацией и сортировкой."
    );
  };

  const scrollHandler = () => {
    if (
      document.getElementById("products").scrollHeight -
        (document.getElementById("products").scrollTop +
          document.getElementById("products").clientHeight) <
      200
    ) {
      setFetching(true);
    }
  };

  const deleteProduct = async (product) => {
    PostService.deleteProduct(product.id);
    setProducts(products.filter((commodity) => commodity !== product));
  };

  return (
    <>
      <div className="right">
        <Select
          callback={changeSelect}
          options={[
            { value: "default", text: "По умолчанию" },
            { value: "min", text: "По цене min" },
            { value: "max", text: "По цене max" },
            { value: "name", text: "По наименованию" },
          ]}
        ></Select>
      </div>
      <div id="products" className="products">
        {fetching && <Spinner />}
        {products.map((product) => {
          return (
            <Fade key={product.id} className="fade">
              <div>
                <DeleteButton callback={() => deleteProduct(product)} />
                <Product product={product} />
              </div>
            </Fade>
          );
        })}
      </div>
    </>
  );
}
