import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsStarFill, BsInfoCircle } from "react-icons/bs";
import { ship1Img, ship2Img, ship3Img } from "@/public/assets/images";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/shopperSlice";
import toast, { Toaster } from "react-hot-toast"; //for notifications

const ProductDetails = () => {
  const router = useRouter();
  const [product, setProduct] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    setProduct(router.query);
    setIsLoading(false);
  }, []);

  const _id = Number(product._id);

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-contentContainer flex items-center py-4">
        <div className="h-full w-2/3 flex items-center justify-center overflow-hidden relative">
          <img
            src={product.image}
            alt="ProductImage"
            className="w-[80%] transform-origin-top-left cursor-move duration-500"
          />
        </div>

        <div className="h-full w-1/3 flex flex-col gap-2">
          <p className="p-2 text-[#004f9a] text-sm font-semibold border border-gray-400 rounded-md">
            500+ bought since yesterday.
          </p>

          <div className="px-2 py-4 border border-gray-400 rounded-md flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button className="px-2 py-[1px] text-[#004f9a] text-sm border-[1px] border-[#004f9a] rounded-sm">
                  Best seller
                </button>
                <button className="px-2 py-[1px] text-red-600 text-sm border-[1px] border-red-600 rounded-sm">
                  Rollback
                </button>
              </div>
              <IoMdHeartEmpty className="text-gray-600 text-xl" />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm underline underline-offset-4">
                {product.brand}
              </p>
              <p className="text-xl font-semibold text-black">
                {product.title}
              </p>
              <p className="text-base text-zinc-500">{product.description}</p>
              <div className="flex gap-2 items-center text-sm mt-2">
                <div className="flex gap-1 text-sm">
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <p>25</p>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <p className="font-semibold text-2xl text-[#2a8703]">
                  Now ${product.price}
                </p>
                <p className="text-sm text-zinc-500 line-through flex items-center gap-1">
                  {product.oldPrice}
                  <span>
                    <BsInfoCircle />
                  </span>
                </p>
              </div>
            </div>

            <div className="text-sm text-black flex flex-col gap-1">
              <p>
                <span className="font-semibold">$18/mo</span>{" "}
                <span className="font-bold">withAffirm</span>{" "}
                <span className="underline underline-offset-2">Learn how</span>
              </p>
              <p className="text-xs text-zinc-500 flex items-center gap-1">
                Price when purchased online
                <span>
                  <BsInfoCircle />
                </span>
              </p>
            </div>

            <div className="border-b-[1px] border-b-zinc-500 pb-4">
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      _id: _id,
                      title: product.title,
                      description: product.description,
                      price: product.price,
                      oldPrice: product.oldPrice,
                      brand: product.brand,
                      category: product.category,
                      image: product.image,
                      quantity: 1,
                    })
                  ) &&
                  toast.success(
                    `${product.title.substring(0, 20)} is added to cart!`
                  )
                }
                className="w-32 h-10 bg-blue text-white rounded-full hover:bg-[#004f9a] duration-300"
              >
                Add to cart
              </button>
            </div>

            <div>
              <p className="text-base font-semibold">
                How do you want your item?
              </p>
              <div className="grid w-full grid-cols-3 gap-4 text-xs">
                <div className="w-full border border-zinc-400 rounded-md flex flex-col items-center justify-center p-2">
                  <Image className="w-10" src={ship1Img} alt="Shipping Image" />
                  <p>Shipping</p>
                  <p>Tomorrow</p>
                  <p>Free</p>
                </div>
                <div className="w-full border border-zinc-400 rounded-md flex flex-col items-center justify-center p-2">
                  <Image className="w-10" src={ship2Img} alt="Shipping Image" />
                  <p>Pickup</p>
                  <p>Tomorrow</p>
                  <p>Free</p>
                </div>
                <div className="w-full border border-zinc-400 rounded-md flex flex-col items-center justify-center p-2">
                  <Image className="w-10" src={ship3Img} alt="Shipping Image" />
                  <p>Delivery</p>
                  <p>Tomorrow</p>
                  <p>Free</p>
                </div>
              </div>
              <p className="font-bold text-xs">
                Satellite, 98743{" "}
                <span className="font-normal underline underline-offset-2 ml-1">
                  Change
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        reverseOrder={false}
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default ProductDetails;
