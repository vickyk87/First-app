import React, { useRef, useState } from "react";
import "./Crud.css";
function Crud() {
  const list = [
    {
      id: 1,
      name: "HP",
      price: "2000",
    },
    {
      id: 2,
      name: "Dell",
      price: "3000",
    },
  ];

  const [lists, setList] = useState(list);
  const [updateState, setUpdateState] = useState(-1);
  return (
    <div className="crud">
      <div>
        <AddList setList={setList} />
        <form onSubmit={handleSubmit}>
          <table>
            {lists.map((current, index) =>
              updateState === current.id ? (
                <EditList current={current} lists={lists} setList={setList} />
              ) : (
                <tr key={index}>
                  <td>{current.name}</td>
                  <td>{current.price}</td>
                  <td>
                    <button
                      className="btn btn-primary my-2"
                      onClick={() => handleEdit(current.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-primary my-2"
                      type="button"
                      onClick={() => handleDelete(current.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </table>
        </form>
      </div>
    </div>
  );

  function handleEdit(id) {
    setUpdateState(id);
  }

  function handleDelete(id) {
    const newList = lists.filter((li) => li.id !== id);
    setList(newList);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const price = e.target.elements.price.value;
    const newList = lists.map((li) =>
      li.id === updateState ? { ...li, name: name, price: price } : li
    );

    setList(newList);
    setUpdateState(-1);
  }
}

function EditList({ current, lists, setList }) {
  function handleInputName(e) {
    const value = e.target.value;
    const newList = lists.map((li) =>
      li.id === current.id ? { ...li, name: value } : li
    );

    setList(newList);
  }

  function handleInputPrice(e) {
    const value = e.target.value;
    const newList = lists.map((li) =>
      li.id === current.id ? { ...li, price: value } : li
    );

    setList(newList);
  }
  return (
    <tr>
      <td>
        <input
          type="text"
          name="name"
          onChange={handleInputName}
          value={current.name}
        />
      </td>
      <td>
        <input
          type="text"
          name="price"
          onChange={handleInputPrice}
          value={current.price}
        />
      </td>
      <td>
        <button type="submit">Update</button>
      </td>
    </tr>
  );
}

function AddList({ setList }) {
  const nameRef = useRef();
  const priceRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const price = e.target.elements.price.value;
    const newList = {
      id: 3,
      name,
      price,
    };
    setList((prevList) => {
      return prevList.concat(newList);
    });
    nameRef.current.value = "";
    priceRef.current.value = "";
  }
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Enter your name"
        ref={nameRef}
      />
      <input
        name="price"
        type="text"
        placeholder="Enter your price"
        ref={priceRef}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default Crud;
