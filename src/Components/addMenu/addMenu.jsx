import React, { useEffect, useState } from "react";
import "./style.css";
import { FaRegWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { menuChange } from "../../store/Slices/menuCard";
import { clearEdit, menuInfo } from "../../store/Slices/menuData";

function AddMenu() {
  const dispatch = useDispatch();
  const editData = useSelector((state) => state.menuData.editData);
  const [data, setData] = useState({
    name: "",
    price: "",
    img: "",
    desc: "",
    category: "",
    rating: "",
  });

  useEffect(() => {
    if (editData !== null) {
      setData(editData);
    }
  }, [editData]);
  
  

  const validateData = () => {
    const { name, price, img, desc, category, rating } = data;
    return (
      name && img && desc && category && price > 0 && rating >= 0 && rating <= 5
    );
  };

  const handleKeyDown = (event, nextId) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (nextId) {
        document.getElementById(nextId).focus();
      }
    }
  };

  return (
    <div className="">
      <FaRegWindowClose
        className="absolute top-5 right-5 text-3xl rounded-lg hover:scale-150 hover:fill-green-500 transition-all duration-300 ease-in-out"
        onClick={() => {
          dispatch(menuChange());
          dispatch(clearEdit());
          setData({
            name: "",
            price: "",
            img: "",
            desc: "",
            category: "",
            rating: "",
          });
        }}
      />
      <h1 className="p-5">Menu</h1>
      <div className="p-2 bg-green-500 rounded-lg ">
        <div className="p-2 bg-gray-100 flex justify-between">
          <label htmlFor="">Image URL:</label>
          <input
            type="text"
            className="w-[70%] p-2"
            onChange={(e) => setData({ ...data, img: e.target.value })}
            value={data.img}
            placeholder=" eg: https://tcrn.ch/3yJH0vv"
            id="id1"
            onKeyDown={(event) => handleKeyDown(event, "id2")}
          />
        </div>
        <div className="p-2 bg-gray-100 flex justify-between ">
          <label htmlFor="">Product name:</label>
          <input
            type="text"
            className="w-[70%] p-2"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data.name}
            placeholder=" eg: Pizza"
            id="id2"
            onKeyDown={(event) => handleKeyDown(event, "id3")}
          />
        </div>
        <div className="p-2 bg-gray-100 flex justify-between">
          <label htmlFor="">Price(in ₹):</label>
          <input
            type="number"
            className="w-[70%] p-2"
            onChange={(e) => setData({ ...data, price: e.target.value })}
            value={data.price}
            placeholder=" eg: 200"
            id="id3"
            onKeyDown={(event) => handleKeyDown(event, "id4")}
          />
        </div>
        <div className="p-2 bg-gray-100 flex justify-between">
          <label htmlFor="">Description:</label>
          <textarea
            type="text"
            className="w-[70%] h-[100px] p-2"
            onChange={(e) => setData({ ...data, desc: e.target.value })}
            value={data.desc}
            placeholder=" eg: This is a delicious pizza"
            id="id4"
            onKeyDown={(event) => handleKeyDown(event, "id5")}
          />
        </div>
        <div className="p-2 bg-gray-100 flex justify-between">
          <label htmlFor="">Category:</label>
          <select
            name=""
            id="id5"
            className="w-[70%] p-1"
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
            onKeyDown={(event) => handleKeyDown(event, "id6")}>
            <option value="" disabled>
              Select category
            </option>
            <option value="Lunch">Lunch</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Dinner">Dinner</option>
            <option value="Snacks">Snacks</option>
          </select>
        </div>
        <div className="p-2 bg-gray-100 flex justify-between">
          <label htmlFor="">Rating(1 - 5):</label>
          <input
            type="number"
            className="w-[70%] p-2"
            onChange={(e) => setData({ ...data, rating: e.target.value })}
            value={data.rating}
            placeholder=" eg: 4.2"
            id="id6"
            onKeyDown={(event) => handleKeyDown(event, "id7")}
          />
        </div>
      </div>
      <button
        className="bg-green-500 text-white px-10 m-5 hover:scale-125 transition-all duration-500 ease-in-out"
        id="id7"
        onClick={() => {
          if (validateData()) {
            if (editData === null) {
              dispatch(menuInfo(data));
              dispatch(menuChange());
              setData({
                name: "",
                price: "",
                img: "",
                desc: "",
                category: "",
                rating: "",
              });
            } else {
              dispatch(menuInfo(data))
              dispatch(menuChange());
              dispatch(clearEdit());
              setData({
                name: "",
                price: "",
                img: "",
                desc: "",
                category: "",
                rating: "",
              });
            }
          } else {
            alert("Please fill all fields and fill it correctly.");
          }
        }}>
        {editData === null ? "Add" : "Edit"}
      </button>
    </div>
  );
}

export default AddMenu;
