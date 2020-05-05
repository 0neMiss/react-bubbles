import React, { useState } from "react";
import axios from "axios";
import axiosWithAuth from '../utils/axiosWithAuth';
//setting initail color for state of colorToEdit
const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  //setting hook statement to swithc between true and false and update the form to either be shown or not.
  const [editing, setEditing] = useState(false);
  //setting hook statement to change the initial color state
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  //setting function to be called on button click.
  const editColor = color => {
    //changing boolion to true
    setEditing(true);
    //selecting which color to pull up information on in the box
    setColorToEdit(color);
  };
//declaring function to be evaluatedon the event of form submission
  const saveEdit = e => {
    //preventing default behavior from the broweser
    e.preventDefault();

    console.log(colorToEdit);
    //accesssing API with autherization token being passed.
    axiosWithAuth()
    //updating the information located in colors/:id with the colorToEdit variable ie. the state of the editing box upon submission
      .put(`colors/${colorToEdit.id}`, colorToEdit)
      //after replacing that information then evaluate whats below
      .then(res =>{
        console.log(colorToEdit);
        //updates the array of colors in state
        updateColors(colors
          //returns new array containing all colors that pass the test evaluated on them
          .map(
            //evaluating on current element in the array
            color =>{
              console.log(colorToEdit.id);
              console.log(color.id);
              //if the color ID does not equal the ID of the current color being edited, return the color unedited
              if(color.id != colorToEdit.id){

                  console.log(color);
                  return color;
            }
            //if thats not the case ie. the ID does match the one being edited, return the contents of the submission in place of its origional value
            else{
              return colorToEdit;
            }

          }
        ));
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`colors/${color.id}`)
      .then(res => {
        console.log(res);
        updateColors(colors.filter( color => color.id != res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
