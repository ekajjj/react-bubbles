import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
// import axios from "axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    axiosWithAuth()
        .put(`colors/${colorToEdit.id}`, colorToEdit)
        .then(res => {
            console.log('PUT response', res.data);
            updateColors(colors);
            setEditing(false);
        })
        .catch(err => {
            console.log(`PUT error: ${err}`);
        }, []);
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
};

const deleteColor = color => {
  axiosWithAuth()
      .delete(`/colors/${colorToEdit.is}`, colorToEdit)
      .then(res => {
          console.log('Delete response', res.data);
          updateColors(colors.filter(item => item.id !== color.id));
          setEditing(false);
      })
      .catch(err => {
          console.log(`Delete error: ${err}`);
      }, []);
  // make a delete request to delete this color
};

// STRETCH: ADD COLOR

const addColor = e => {
  e.preventDefault();

  axiosWithAuth()
      .post('/colors', colorToAdd)
      .then(res => {
          console.log('PUT response', res.data);
          updateColors([...colors, colorToAdd]);
          setEditing(false)
      })
      .catch(err => {
          console.log(`PUT error: ${err}`);
      }, [colors]);
};

return (
  <div className='colors-wrap'>
      <p>colors</p>
      <ul>
          {colors.map(color => (
              <li key={color.color} onClick={() => editColor(color)}>
                  <span>
                      <span
                          className='delete'
                          onClick={e => {
                              e.stopPropagation();
                              deleteColor(color);
                          }}>
                          x
                      </span>{' '}
                      {color.color}
                  </span>
                  <div
                      className='color-box'
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
                          setColorToEdit({
                              ...colorToEdit,
                              color: e.target.value
                          })
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
              <div className='button-row'>
                  <button type='submit'>save</button>
                  <button onClick={() => setEditing(false)}>
                      cancel
                  </button>
              </div>
          </form>
      )}
      <form>
          <legend>Add Color</legend>
          <label>
              color name:
              <input
                  onChange={e =>
                      setColorToAdd({
                          ...colorToAdd,
                          color: e.target.value
                      })
                  }
                  value={colorToAdd.color}
              />
          </label>
          <label>
              hex code:
              <input
                  onChange={e =>
                      setColorToAdd({
                          ...colorToAdd,
                          code: { hex: e.target.value }
                      })
                  }
                  value={colorToAdd.code.hex}
              />
          </label>
          <div className='button-row'>
              <button onClick={addColor}>Add</button>
          </div>
      </form>

      <div className='spacer' />
  </div>
);
};

export default ColorList;