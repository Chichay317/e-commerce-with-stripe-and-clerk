import Image from "next/image";
import { logo } from "../public/assets/images/index";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { NavbarBottom } from "./NavbarBottom";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { useSession, signIn, signOut } from "next-auth/react";
import { useUser } from "@clerk/nextjs";
import { addUser, removeUser } from "@/redux/shopperSlice";
import { useClerk } from "@clerk/clerk-react";

const Navbar = () => {
  const productData = useSelector((state: any) => state.shopper.productData);
  const userInfo = useSelector((state: any) => state.shopper.userInfo);
  const [totalAmt, setTotalAmt] = useState("");
  const dispatch = useDispatch();
  const { signOut } = useClerk();

  const { user } = useUser();
  console.log(user);

  useEffect(() => {
    let price = 0;
    productData.map((item: any) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [productData]);

  useEffect(() => {
    if (user) {
      dispatch(
        addUser({
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          image: user?.imageUrl,
        })
      );
    } else {
      dispatch(removeUser());
    }
  }, [user, dispatch]);

  return (
    <div className="w-full bg-blue text-white sticky top-0 z-50">
      <div className="w-full h-full border-b-[1px] border-b-white">
        <div className="max-w-container mx-auto h-20 px-4 flex items-center justify-between gap-2">
          <Link href="/">
            <div className="navBarHover">
              <Image src={logo} className="w-44" alt="logo" />
            </div>
          </Link>

          <div className="navBarHover">
            <div className="w-4 grid grid-cols-2 gap-[2px]">
              <span className="w-1.5 h-1.5 border-[1px] border-white inline-flex"></span>
              <span className="w-1.5 h-1.5 border-[1px] border-white inline-flex"></span>
              <span className="w-1.5 h-1.5 border-[1px] border-white inline-flex"></span>
              <span className="w-1.5 h-1.5 border-[1px] border-white inline-flex"></span>
            </div>
            <p className="text-base font-semibold">Departments</p>
          </div>

          <div className="navBarHover">
            <div className="w-4 grid grid-cols-2 gap-[2px]">
              <span className="w-1.5 h-1.5 rounded-md border-[1px] border-white inline-flex"></span>
              <span className="w-1.5 h-1.5 rounded-md border-[1px] border-white inline-flex"></span>
              <span className="w-1.5 h-1.5 rounded-md border-[1px] border-white inline-flex"></span>
              <span className="w-1.5 h-1.5 rounded-md border-[1px] border-white inline-flex"></span>
            </div>
            <p className="text-base font-semibold">Services</p>
          </div>

          <div className="h-10 flex flex-1 relative">
            <input
              className="h-full w-full rounded-full px-4 text-black text-base outline-none border-[1px] border-transparent focus-visible:border-black duration-200"
              type="text"
              placeholder="Search anything at my store!"
            />
            <span className="absolute w-8 h-8 rounded-full flex items-center justify-center top-1 right-1 bg-yellow text-black text-xl">
              <IoSearchOutline />
            </span>
          </div>

          <div className="navBarHover">
            <AiOutlineHeart />
            <div>
              <p className="text-xs">Recorder</p>
              <h2 className="text-base font-semibold -mt-1">My Items</h2>
            </div>
          </div>

          {/* <UserButton afterSignOutUrl="/" /> */}
          {/* onClick={() => signIn()} */}

          {userInfo ? (
            // <Link href="/sign-in">
            <div onClick={() => signOut()} className="navBarHover">
              <Image
                width={500}
                height={500}
                className="w-10 rounded-full object-cover"
                src={userInfo.image}
                alt="UserImage"
              />
              <div>
                <p className="text-xs">Sign Out</p>
                <h2 className="text-base font-semibold -mt-1">
                  {userInfo.name}
                </h2>
              </div>
            </div>
          ) : (
            // </Link>
            <Link href="/sign-in">
              <div className="navBarHover">
                <AiOutlineUser className="text-lg" />
                <div>
                  <p className="text-xs">Sign In</p>
                  <h2 className="text-base font-semibold -mt-1">Account</h2>
                </div>
              </div>
            </Link>
          )}

          <Link href="/cart">
            <div className="flex flex-col justify-center items-center gap-2 h-12 px-5 rounded-full bg-transparent hover:bg-hoverBg duration-300 relative">
              <BsCart2 className="text-2xl" />
              <p className="text-[10px] -mt-2">$${totalAmt}</p>
              <span className="absolute w-4 h-4 bg-yellow text-black top-0 right-4 rounded-full flex items-center justify-center font-bodyFont text-xs">
                {productData.length > 0 ? productData.length : 0}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <NavbarBottom />
    </div>
  );
};

export default Navbar;
