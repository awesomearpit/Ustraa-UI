import React, { useState, useEffect } from "react";
import "./App.css";
import Categories from "./Components/Categories";
import Products from "./Components/Products";
import { get } from "./utils/API";

const App = (props) => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        device_type: "mob"
      };
      try {
        const { data } = await get("/homemenucategories/v1.0.1", params);
        let categDropDown = [];
        data.category_list.map((data) =>
          categDropDown.push({
            value: data.category_id,
            label: data.category_name
          })
        );
        setCategoriesList(data.category_list);
        setProductList(data.product_list.products);
        setCategoryName(data.category_list[0].category_name);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const fetchProducts = async (categ_id) => {
    const params = {
      category_id: categ_id
    };
    try {
      const { data } = await get("/catalog/v1.0.1", params);
      setProductList(data.products);
      setCategoryName(
        categoriesList.filter((data) => data.category_id === categ_id)[0]
          .category_name
      );
    } catch (e) {
      console.log(e);
    }
  };

  const changeCategFetchProd = (category) => {
    fetchProducts(category.category_id);
    setCategoryName(category.category_name);
  };

  return (
    <div className="container-fluid">
      <Categories
        categoriesList={categoriesList}
        fetchProducts={fetchProducts}
      />
      <Products
        productList={productList}
        categoryName={categoryName}
        categoriesList={categoriesList}
        changeCategFetchProd={changeCategFetchProd}
      />
    </div>
  );
};

export default App;
