import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import {
  addProduct,
  removeProduct,
  deleteOption,
} from "../store/Slices/cartData";

function CartSlit({ data }) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="shadow-md border px-[6px] py-[10px] my-3 relative bg-white rounded-xl">
        <div className="flex">
          <div className="">
            <img
              src={data.img}
              className="h-[50px] bg-slate-300 w-[70px]"
              alt="image"
            />
          </div>
          <div className=" pl-3 ">
            <p className=" text-left">{data.name}</p>
            <p className="text-green-500 font-bold text-left">₹{data.price}</p>
          </div>
          <div className=" flex  absolute right-0   bottom-1 h-8 w-[100px]   justify-around items-center">
            <button
              onClick={() => {
                dispatch(removeProduct(data));
              }}
              className="bg-white border px-2 py-1 border-black hover:text-red-500 hover:border-red-500 hover:scale-110 duration-300 transition-all ease-in-out hover:text-lg">
              -
            </button>
            <p className="font-bold">{data.quantity}</p>
            <button
              onClick={() => {
                dispatch(addProduct(data));
              }}
              className="bg-white border px-1.5 py-1 border-black hover:text-green-500 hover:border-green-500 hover:scale-110 duration-300 transition-all ease-in-out hover:text-lg">
              +
            </button>
          </div>
        </div>

        <MdDelete
          className="absolute right-1 top-[3px]  text-xl hover:fill-red-500 hover:scale-125 duration-200 transition-all ease-in-out "
          onClick={() => {
            dispatch(deleteOption(data));
          }}
        />
      </div>
    </>
  );
}

export default CartSlit;
