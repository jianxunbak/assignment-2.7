import { useState, useContext, useMemo } from "react";

import styles from "./Product.module.css";
import Card from "./Card";
import ViewList from "./ViewList";
import Button from "./Button";

import ProductContext from "../context/ProductContext";
import ModeContext from "../context/ModeContext";
import Toggle from "./Toggle";

import { v4 as uuid } from "uuid";
import Edit from "./Edit";

/* -------------------------- CONTEXT -------------------------- */

function Product() {
  const ctx = useContext(ProductContext);
  const modeCtx = useContext(ModeContext);
  const [list, setList] = useState([]);
  // const [sumTotal, setSumTotal] = useState(0);
  const [isLisVisible, setisLisVisible] = useState(false);
  const [sumTotal, setSumTotal] = useState(0);

  //isEditing state to manage if edit.js component shows or not
  const [isEditing, setIsEditing] = useState(false);

  //formData state to manage the details of item when edit button is clicked
  const [formData, setFormData] = useState({
    index: 0,
    name: "",
    quantity: 0,
    price: 0,
    discount: 0,
  });

  /* -------------------------- HANDLERS -------------------------- */

  const handlerDeleteItem = (id) => {
    setList((prevList) => {
      const updatedList = prevList.filter((item) => item.id !== id);
      return updatedList;
    });
  };
  //create handler to show or hide list
  const handlerShowList = () => {
    setisLisVisible((isLisVisible) => !isLisVisible);
  };

  const currItemTotal = useMemo(() => {
    return (ctx.count * ctx.price * (100 - ctx.discount)) / 100;
  }, [ctx.count, ctx.price, ctx.discount]);

  const handlerAddProduct = () => {
    // Create new list item
    const newItem = {
      id: uuid(),
      name: ctx.name,
      quantity: ctx.count,
      price: ctx.price,
      discount: ctx.discount,
      total: currItemTotal,
    };

    // Copy previous list and append new item to its end
    const newList = [...list, newItem];
    //  console.log('  newList:', newList);
    setList(newList);
    // use reduce method to sum up all totals inside list.
    const totalCalc = newList.reduce((acc, item) => {
      return acc + item.total;
    }, 0);
    setSumTotal(totalCalc);
  };

  //handleFindEditItem is called when user click on edit from ViewList.js
  const handleFindEditItem = (id) => {
    //to find the index of the item inside list that is same as the id passed from ViewList.js
    const index = list.findIndex((item) => item.id === id);
    //Create an object and insert the values from list using index found above
    const selectedItem = {
      index: index,
      name: list[index].name,
      quantity: list[index].quantity,
      price: list[index].price,
      discount: list[index].discount,
    };

    //After creating the object, setIsEditing to true to display the edit component
    setIsEditing(true);
    // update formData using selectedItem so it can be displayed using edit.js
    setFormData(selectedItem);
  };

  // function to update the information that user type inside input field in edit.js.
  // Takes in the event and key to dynamically update all the items
  const updateFormData = (e, key) => {
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  // to be called once user clicks submit. takes in event to prevent default from reloading page.
  const handleSubmit = (e) => {
    e.preventDefault();
    //create a copy of the original item from list and updating it using formData information
    const newItem = { ...list[formData.index] };
    newItem.name = formData.name;
    newItem.quantity = formData.quantity;
    newItem.price = formData.price;
    newItem.discount = formData.discount;
    newItem.total =
      (formData.quantity * formData.price * (100 - formData.discount)) / 100;

    // create a copy of the list
    const newList = [...list];
    // updating the copy of list
    newList[formData.index] = newItem;
    // updating state
    setList(newList);

    // Remove the total sum and replace with the new total
    const newSum = sumTotal - list[formData.index].total + newItem.total;
    setSumTotal(newSum);
    setIsEditing(false);
  }; /* -------------------------- JSX -------------------------- */

  return (
    <div className={`${styles.container} ${!modeCtx.isLight && styles.dark}`}>
      <Toggle />
      <Card handlerAddProduct={handlerAddProduct} />
      <p>Current Total: ${currItemTotal.toFixed(2)}</p>
      <Button
        // use ternary operator to change the lable of button
        label={isLisVisible ? "Hide Cart" : "Show Cart"}
        onClick={handlerShowList}
      />

      {/* conditioning rendering method 3: short circuil evaluation */}
      {isLisVisible && (
        <ViewList
          list={list}
          sum={sumTotal}
          handlerDeleteItem={handlerDeleteItem}
          handleFindEditItem={handleFindEditItem}
          isEditing={isEditing}
        />
      )}
      {!isLisVisible && "Click 'Show Cart' to display the cart."}

      {/* editing Component */}
      <Edit
        item={formData}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
        updateFormData={updateFormData}
      />
    </div>
  );
}
export default Product;
