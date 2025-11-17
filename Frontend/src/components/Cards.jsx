import React from "react";
import { useCart } from "../context/CartProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistProvider";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function Cards({ item }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(item._id);

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

  const handleWishlistToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(item._id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(item);
      toast.success("Added to wishlist");
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
                <button
                  className="btn btn-ghost btn-circle btn-sm"
                  onClick={handleWishlistToggle}
                  aria-label={
                    inWishlist ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  {inWishlist ? (
                    <FaHeart className="text-pink-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Cards;
