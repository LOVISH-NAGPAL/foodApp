import React, { useEffect, useState } from "react";
import FoodData from "../assets/data";
import ProductSlit from "../Components/product-slit";
import { FaRegWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../store/Slices/Cartshown";
import { FaShoppingCart } from "react-icons/fa";
import CartSlit from "../Components/cartSlit";
import { useNavigate } from "react-router-dom";
import { changeCategory } from "../store/Slices/category";
import { searching } from "../store/Slices/search";
import AddMenu from "../Components/addMenu/addMenu";
import { menuChange } from "../store/Slices/menuCard";

function Home() {
  const [time, setTime] = useState(new Date().toLocaleString());
  // useEffect(() => {
  //   const interval = setInterval(
  //     () => setTime(new Date().toLocaleString()),
  //     1000
  //   );
  //   return () => clearInterval(interval);
  // }, []);
  const menuData = useSelector((state) => state.menuData.Data) || FoodData;

  const show = useSelector((state) => {
    return state.cartShow.show;
  });
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartData.cartItems);
  const totalQuantity = cartData.reduce((acc, pointer) => {
    return acc + pointer.quantity;
  }, 0);
  const totalAmount = cartData.reduce((acc, pointer) => {
    return acc + pointer.quantity * pointer.price;
  }, 0);
  const navigate = useNavigate();
  const types = [...new Set(menuData.map((item) => item.category))];
  const selectedCategory = useSelector((state) => state.category.category);
  const search = useSelector((state) => state.search.search);
  let updateFoodData = menuData.filter((data) => {
    if (selectedCategory === "All") {
      return data.name.toLowerCase().includes(search.toLowerCase());
    } else {
      return (
        data.category === selectedCategory &&
        data.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  });
  const menu = useSelector((state) => state.menu.menuOpen);

  return (
    <>
      <div className="p-4">
        <div
          className={` fixed h-[100vh] w-[95%] sm:w-[500px] bg-[#efefef] shadow-2xl left-0 top-0 p-4 z-10 ${
            menu ? "translate-x-0" : "-translate-x-full"
          }  transition-all duration-400 ease-in-out`}>
          <AddMenu />
        </div>
        <div className=" flex justify-between items-center ">
          <div className="">
            <p className="text-xl text-left text-gray-600 font-semibold">
              {time}
            </p>
            <p className="text-4xl text-left font-semibold">Yummy Food</p>
          </div>
          <div className="">
            <input
              type="search"
              className="h-[40px] sm:h-[60px] w-[80%] sm:w-[360px] rounded-xl  bg-slate-200 border border-3 border-black text-left font-medium sm:p-2 text-2xl text-gray-500
              "
              placeholder=" Search"
              onChange={(e) => {
                dispatch(searching(e.target.value));
              }}
            />
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-semibold text-2xl text-left">Find the best food</p>
          <button
            className="bg-green-500 text-white hover:scale-125 transition-all duration-500 ease-in-out flex-shrink-0"
            onClick={() => dispatch(menuChange())}>
            Add menu
          </button>
        </div>
        <div className="flex gap-2 mt-2 lg:gap-5 overflow-auto p-2 sm:p-0">
          <button
            className={`bg-gray-300 ${
              selectedCategory === "All" ? "bg-green-500 text-white" : ""
            }`}
            onClick={() => dispatch(changeCategory("All"))}>
            All
          </button>
          {types.map((item, index) => {
            return (
              <button
                key={index}
                className={`bg-gray-300 ${
                  selectedCategory === item ? "bg-green-500 text-white" : ""
                }`}
                onClick={() => dispatch(changeCategory(item))}>
                {item}
              </button>
            );
          })}
        </div>
        <div
          className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]
 gap-5 mt-5">
          {updateFoodData.map((data) => {
            return (
              <div className="" key={data.id}>
                <ProductSlit data={data} />
              </div>
            );
          })}
        </div>

        <div
          className={`bg-green-100 fixed h-[100vh] w-[95%] sm:w-[350px]  right-0 top-0 p-4 z-10 ${
            show ? "translate-x-0" : "translate-x-full"
          } transition-all duration-400 ease-in-out`}>
          <div className="flex justify-between items-center p-2 ">
            <p className="text-2xl font-semibold">My order</p>
            <FaRegWindowClose
              className={`text-xl rounded-lg hover:scale-150 hover:fill-green-500 transition-all duration-400 ease-in-out`}
              onClick={() => {
                dispatch(toggleCart());
              }}
            />
          </div>
          {totalQuantity >= 1 ? (
            ""
          ) : (
            <p className={`text-2xl mt-5`}>Your cart is empty</p>
          )}
          <div className=" overflow-auto h-[78%] pb-14 sm:pb-12 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {cartData.map((data) => {
              return (
                <div key={data.id}>
                  <CartSlit data={data} />
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-0  text-center w-full pb-10 p-2 sm:p-2 bg-green-100">
            <p className="text-xl font-medium text-left">
              Items: {totalQuantity}
            </p>
            <p className="text-xl font-medium text-left">
              Total Amount: ₹{totalAmount}
            </p>
            <div className="text-center w-full">
              {" "}
              <button
                className="bg-green-500 text-white  my-5 w-[270px] hover:scale-110 transition-all duration-400 ease-in-out"
                onClick={() => {
                  navigate("/success");
                }}>
                Checkout
              </button>
            </div>
          </div>
        </div>
        <div
          className={`fixed right-[50px] bottom-[50px]  bg-green-500 p-3 rounded-full hover:scale-125 transition-all duration-400 ease-in-out ${
            totalQuantity >= 1 ? "animate-bounce " : ""
          }`}
          onClick={() => {
            dispatch(toggleCart());
          }}>
          <FaShoppingCart className={`text-3xl fill-white -z-10 `} />
        </div>
      </div>
    </>
  );
}

export default Home;
