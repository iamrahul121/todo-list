import React, { useEffect, useState } from "react";

const GetData = () => {
  return JSON.parse(localStorage.getItem("list"));
};

const ToDoList = () => {
  const [toDo, setToDo] = useState("");
  const [items, setItems] = useState(GetData());
  const [toggleItem, setToggleItem] = useState(true);
  const [storeID, setStoreId] = useState("");

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(items));
  }, [items]);

  const AddToDo = () => {
    if (toDo === "") {
      alert("Write Something");
    } else if (toDo && !toggleItem) {
      setItems(
        items.map((elm) => {
          if (elm.id === storeID) {
            return { ...elm, name: toDo };
          }
          return elm;
        })
      );
      setToggleItem(true);
      setToDo("");
      setStoreId("");
    } else {
      const allData = { id: new Date().getTime().toString(), name: toDo };
      setItems([...items, allData]);
    }
    setToDo("");
  };
  const DeleteItem = (id) => {
    const updatedToDo = items.filter((val) => {
      return id !== val.id;
    });
    setItems(updatedToDo);
  };

  const EditItem = (id) => {
    let getId = items.find((elm) => {
      return elm.id === id;
    });
    setToggleItem(false);
    setToDo(getId.name);
    setStoreId(id);
  };

  const RemoveAll = () => {
    setItems([]);
  };
  return (
    <>
      <div className="main">
        <div className="center">
          {/* <figure>
                        <img src="" alt="" />
                        <p>Add Your List Here...</p>
                    </figure> */}
          <div className="inp">
            <input
              type="text"
              placeholder="✍ Add Items.."
              value={toDo}
              name="todoItem"
              onChange={(event) => setToDo(event.target.value)}
            />
            {toggleItem ? (
              <i className="fa-solid fa-plus" onClick={AddToDo}></i>
            ) : (
              <i className="fa-regular fa-pen-to-square" onClick={AddToDo}></i>
            )}
          </div>
          <ul>
            {items.map((element) => {
              return (
                <div className="items" key={element.id}>
                  <li>{element.name}</li>
                  <i
                    className="fa-regular fa-pen-to-square"sss
                    onClick={() => EditItem(element.id)}
                  ></i>
                  <i
                    className="fa-sharp fa-solid fa-xmark"
                    onClick={() => DeleteItem(element.id)}
                  ></i>
                </div>
              );
            })}
          </ul>
          <div className="btn">
            <button onClick={RemoveAll}>Remove All</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoList;
