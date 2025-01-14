import React from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../store/Slices/cartData";
import { Toaster, toast } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { deleteMenu, editMenu } from "../store/Slices/menuData";
import { MdModeEdit } from "react-icons/md";
import { menuChange } from "../store/Slices/menuCard";

function ProductSlit({ data }) {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartData.cartItems);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className=" min-h-[380px] bg-white justify-between w-full rounded-2xl p-4 flex flex-col relative ">
        {data?.id && data.id > 20 ? (
          <>
            <MdDelete
              className="absolute top-1 right-1 m-0 text-2xl opacity-50 hover:fill-red-500 hover:scale-125 duration-200 transition-all ease-in-out hover:opacity-100"
              onClick={() => {
                dispatch(deleteMenu(data.id));
              }}
            />
            <MdModeEdit
              className="text-2xl absolute top-1 left-1
           hover:fill-green-500 hover:scale-125 duration-200 transition-all ease-in-out opacity-50 hover:opacity-100"
              onClick={() => {
                dispatch(editMenu(data));
                dispatch(menuChange());
              }}
            />
          </>
        ) : (
          ""
        )}

        <div className="h-[310px]">
          <div className="flex justify-center h-[170px] p-2">
            <img
              src={data.img}
              alt="product image"
              className="h-full w-full bg-gray-300"
            />
          </div>
          <div className="flex justify-between py-2">
            <p className="text-xl font-semibold ">{data.name}</p>
            <p className="text-green-500 font-bold">₹{data.price}</p>
          </div>
          <div className="w-full">
            <p className="text-left">{data.desc.slice(0, 60)}</p>
          </div>
        </div>

        <div className="flex justify-between  ">
          <div className="flex items-center ">
            <FaStar className="fill-yellow-200 text-xl" />
            <span className="pl-3 font-bold">{data.rating}</span>
          </div>
          <div className="">
            <button
              className={`bg-green-500 text-white disabled:opacity-50 `}
              onClick={() => {
                dispatch(addProduct(data));
                toast.success("Successfully added to cart!");
              }}
              disabled={cartData.some((item) => data.id === item.id)}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductSlit;
