import React from "react";
import { useCart } from "../context/CartProvider";
import { FaTrash } from "react-icons/fa";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const getTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <dialog id="my_cart_modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl dark:bg-slate-800 dark:text-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Your Shopping Cart</h3>
        {cart.length === 0 ? (
          <p className="py-4">Your cart is empty.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={item.image} alt={item.name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.name}</div>
                          <div className="text-sm opacity-50">
                            {item.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item._id, parseInt(e.target.value))
                        }
                        className="input input-bordered w-20 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                      />
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <FaTrash className="text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4 font-bold text-xl">
              Total: ${getTotal()}
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}

export default Cart;
