"use client";

import { toast } from "sonner";
import { StoreProduct } from "@/types/database";
import { useCart } from "@/components/context/CartContext";

interface ProductCardProps {
  product: StoreProduct;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    getQuantity,
  } = useCart();

  const quantity = getQuantity(product.id);

  return (
  <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition w-full max-w-[180px]">
<div className="h-44 flex items-center justify-center bg-white p-2">
      {product.image_url ? (
        <img
          src={product.image_url}
          alt={product.name}
          className="h-40 object-contain"
        />
      ) : (
        <span className="text-gray-400">No Image</span>
      )}
    </div>

    <div className="p-2">
      <h3 className="font-medium text-sm line-clamp-2 min-h-[40px]">
        {product.name}
      </h3>
    <p className="text-xs text-gray-500 line-clamp-1">
     {product.description || ""}
    </p>
      <div className="flex justify-between items-end">
        <p className="font-bold text-xl">
          ₹{product.price}
        </p>

        {quantity === 0 ? (
          <button
            onClick={() => {
              if (product.stock <= 0) {
                toast.error("Product Out of Stock");
                return;
              }

              addToCart(product);

              toast.success("Added to Cart", {
                description: product.name,
              });
            }}
            className="px-3 py-1.5 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700"
          >
            + Add
          </button>
        ) : (
          <div className="flex items-center bg-green-600 text-white rounded-lg overflow-hidden">
            <button
              onClick={() => decreaseQuantity(product.id)}
              className="w-8 h-8 hover:bg-green-700"
            >
              -
            </button>

            <span className="w-8 text-center font-semibold">
              {quantity}
            </span>

            <button
              onClick={() => {
                if (quantity >= product.stock) {
                  toast.error("Product Out of Stock");
                  return;
                }

                increaseQuantity(product.id);
              }}
              className="w-8 h-8 hover:bg-green-700"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);
}