import { auth } from "../lib/firebase";
import { setUser } from "../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";


export default function Navbar() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleLogout = () => [
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(setUser(null));
      })
      .catch((error:string) => {
        // An error happened.
        console.error(error);
      }),
  ];

  return (
    <div className="navbar bg-base-200 rounded-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#57cc99]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>{user?.email && <Link to="/addProduct">Add Product</Link>}</li>
          {user?.email && (
            <li>
              <Link to="/reading">My ReadingList</Link>
            </li>
          )}
          {user?.email && (
            <li>
              <Link to="/wishlist" >My WishList</Link>
            </li>
          )}

          <li>{!user.email && <Link to="/login">login</Link>}</li>
      </ul>
        </div>
        <Link to="/home" className="btn btn-ghost text-[#57cc99] normal-case text-2xl">Book-Shelf</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/home" className="text-lg">Home</Link>
          </li>
          <li>
            <Link to="/products" className="text-lg">Products</Link>
          </li>
          <li>{user?.email && <Link to="/addProduct" className="text-lg">Add Product</Link>}</li>
          {user?.email && (
            <li>
              <Link to="/reading" className="text-lg">My ReadingList</Link>
            </li>
          )}
          {user?.email && (
            <li>
              <Link to="/wishlist" className="text-lg">My WishList</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {!user.email ? (
          <Link to="/signup" className="m-4 ">
            {" "}
            {!user.email && <Link to="/login" className="btn text-xl border-none bg-[#57cc99] text-white mr-4">login</Link>}
            <a className="btn text-xl bg-[#57cc99] text-white border-none">Sign up</a>
          </Link>
        ) : (
          <>
            {" "}
            <a className="me-2" href="">
              {user.email}{" "}
            </a>{" "}
            <a onClick={handleLogout} className="btn bg-[#57cc99] border-none">
              LogOut
            </a>
          </>
        )}
      </div>
    </div>
  );
}
