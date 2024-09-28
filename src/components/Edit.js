import styles from "./ViewList.module.css";
import { useContext } from "react";
import ModeContext from "../context/ModeContext";

const Edit = ({ handleSubmit, item, isEditing, updateFormData }) => {
  /* -------------------------- CONTEXT -------------------------- */

  const modeCtx = useContext(ModeContext);

  /* -------------------------- JSX -------------------------- */
  /* if isEditing is true, then the below JSX will be shown. if false, wont be shown */
  if (isEditing === true)
    return (
      <form onSubmit={handleSubmit}>
        <table className={`${styles.table} ${!modeCtx.isLight && styles.dark}`}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Disc %</th>
            </tr>
          </thead>
          <tbody>
            <tr key={item.index}>
              <td>
                <input
                  type="text"
                  /* Passing the name from item, which is passed from form data in product.js */
                  value={item.name}
                  /* Passing in the event when use types in details into updateFormData */
                  onChange={(e) => updateFormData(e, "name")}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateFormData(e, "quantity")}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => updateFormData(e, "price")}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.discount}
                  onChange={(e) => updateFormData(e, "discount")}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
        {/* isEditing state change to flase when clicked cancel and the edit component closes */}
        <button onclick={isEditing === false}>Cancel</button>
      </form>
    );
};

export default Edit;
