import { useGetWishListQuery } from "../redux/features/wishlist/wishlistApi";
import { useAppSelector } from "../redux/hooks";
import "./pages.css";
import { Helmet } from "react-helmet-async";

export default function WishList() {
  const { email } = useAppSelector((state) => state.user.user);
  const { data } = useGetWishListQuery(email);
  // console.log(data);
  return (
    <div>
      <Helmet title="BookShelf | WishList"></Helmet>
      <h1 className="text-5xl font-bold pb-10 text-[#57cc99] text-center">
        My Wishlist List
      </h1> 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto place-items-center gap-4">
        {data?.map((book: any) => (
          <div className="card w-96 mb-16 bg-base-100 shadow-2xl">
            <figure>
              <img
                src="https://i.ibb.co/3dxFsTN/book-of-famous-writer-humayun-ahmed.jpg"
                alt="Shoes"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title justify-center">{book?.newdata?.Title}</h2>
              <p>
                Books have the power to transport us to new worlds, ignite our
                imaginations, and inspire us to reach for greatness.
              </p>
              <p>Genre: {book?.newdata?.Genre}</p>
              <p>Author: {book?.newdata?.Author}</p>
              <p>Published: {book?.newdata?.PublicationDate}</p>
              <div className="card-actions justify-center mt-6">
                <button className="btn btn-primary w-32 bg-red-500 text-[#fff] border-0">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
