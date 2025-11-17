import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem("wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to read wishlist from storage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to persist wishlist", error);
    }
  }, [wishlist]);

  const addToWishlist = (book) => {
    setWishlist((prev) => {
      if (prev.some((item) => item._id === book._id)) {
        return prev;
      }
      return [...prev, book];
    });
  };

  const removeFromWishlist = (bookId) => {
    setWishlist((prev) => prev.filter((item) => item._id !== bookId));
  };

  const clearWishlist = () => setWishlist([]);

  const isInWishlist = (bookId) =>
    wishlist.some((item) => item._id === bookId);

  const value = useMemo(
    () => ({
      wishlist,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isInWishlist,
    }),
    [wishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);

