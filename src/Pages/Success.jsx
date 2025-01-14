import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";

function Success() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const setTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(setTimer);
  }, []);
  return (
    <>
      {loading ? (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center">
          <PropagateLoader color="rgba(78, 199, 0, 1)" size={15} />
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <div className="">
            {" "}
            <p className="text-4xl text-green-500 font-semibold">
              Successefull!!
            </p>
            <p className="text-xl text-green-500 font-semibold">
              your order got placed
            </p>
          </div>{" "}
        </div>
      )}
    </>
  );
}

export default Success;
