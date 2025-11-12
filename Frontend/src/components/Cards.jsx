import React from "react";
import { useCart } from "../context/CartProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Cards({ item }) {
  const { addToCart } = useCart();

  const handleBuyNow = () => {
    addToCart(item);
    if (item.category === "Free") {
      toast.success("Your book has been bought!");
    } else {
      toast.success(
        `Proceed to payment for ${item.name} (e.g., via Card, Visa, Master, etc.)`
      );
    }
  };

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 h-[300px] bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <Link to={`/book/${item._id}`}>
            <figure>
              <img
                src={item.image}
                alt="Shoes"
                className="h-32 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {item.name}
                <div className="badge badge-secondary">{item.category}</div>
              </h2>
              <p>{item.title}</p>
              <div className="card-actions justify-between">
                <div className="badge badge-outline">${item.price}</div>
                {/* The "Buy Now" button will remain outside the Link to ensure its onClick works independently */}
                <div
                  className=" cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Cards;
