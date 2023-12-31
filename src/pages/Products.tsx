import { addBook, resetStatus } from "../redux/features/Books/BookSlice";
import {
  useGetAllBooksQuery,
  useGetBooksQuery,
} from "../redux/features/Books/Booksapi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { IBook } from "../types/BooksType";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiBookReader } from "react-icons/bi";
import {
  addToReadingList,
  addToWishlist,
} from "../redux/features/wishlist/whishListSlice";
import {
  useAddToReadingListMutation,
  usePostWishListMutation,
} from "../redux/features/wishlist/wishlistApi";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./pages.css";
import { Helmet } from "react-helmet-async";
import Button from "../Components/Button/Button";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [Genre, setGenre] = useState("");
  const [Year, setYear] = useState(0);
  const { togglePostBook } = useAppSelector((state) => state.book);
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const [addWishlist, { isError: wisherror }] = usePostWishListMutation();
  const [addReadingList, { isError: readingerror }] =
    useAddToReadingListMutation();
  console.log(wishlist);
  console.log(wishlist); //
  const { email } = useAppSelector((state) => state.user.user);
  const { data, isLoading } = useGetBooksQuery({
    Genre,
    Year,
    searchTerm,
  });
  const { data: mainbook, isLoading: bookloading } =
    useGetAllBooksQuery(undefined);

  const { status } = useAppSelector((state) => state.book);
  const HandleSearch = (event: any) => {
    event.preventDefault();
    setSearchTerm(event.target.searchTerm.value);
  };

  const dispatch = useAppDispatch();
  const handleSingleBook = (book: IBook) => {
    dispatch(addBook(book));
  };

  if (status) {
    toast.success("product deleted successfully");
    dispatch(resetStatus());
  }

  if (togglePostBook) {
    toast.success("book added successfully");
  }
  const handleAddWishList = (book: IBook) => {
    dispatch(addToWishlist(book));
    addWishlist(book);
    if (!wisherror) {
      toast.success("book added in wishlist");
    } else {
      toast.error("something went wrong");
    }
  };
  const handleAddToReadingList = (book: IBook) => {
    dispatch(addToReadingList(book));
    addReadingList(book);
    if (!readingerror) {
      toast.success("book added in reading list");
    } else {
      toast.error("something went wrong");
    }
  };

  if (isLoading || bookloading) {
    return (
      <>
        <div className="text-center">
          <span className="loading text-center loading-bar text-white loading-lg"></span>
        </div>
      </>
    );
  }

  return (
    <div>
      <Helmet title="BookShelf | Products"></Helmet>

      <div className="mb-16">
        <form action="" onSubmit={HandleSearch}>
          <div className="join flex justify-center flex-row mb-4">
            <div className="max-w-xs">
              <div>
                <input
                  name="searchTerm"
                  className="input input-bordered input-accent border-[#57cc99] join-item"
                  placeholder="Search.."
                />
              </div>
            </div>
            <select
              className="select border-[#57cc99] select-accent join-item"
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">All Genres</option>
              {mainbook?.data
                ?.map((book: IBook) => book.Genre)
                .filter(
                  (
                    genre: string | undefined,
                    index: number,
                    genres: (string | undefined)[]
                  ) => genres.indexOf(genre) === index
                )
                .map((genre: string | undefined, index: number) => (
                  <option value={genre} key={index}>
                    {genre}
                  </option>
                ))}
            </select>

            <select
              className="select border-[#57cc99] select-accent join-item"
              onChange={(e) => setYear(Number(e.target.value))}
            >
              <option value="">All Year</option>
              {Array.from(
                new Set(
                  mainbook?.data.map((book: IBook) =>
                    new Date(book.PublicationDate!).getFullYear()
                  )
                )
              ).map((year) => (
                <option value={year?.toString()} key={year?.toString()}>
                  {year as number}
                </option>
              ))} 
            </select>

            <div className="indicator">
              <span className="indicator-item badge badge-secondary">
                search here
              </span>
              <button type="submit" className="btn bg-[#57cc99] text-lg hover:text-white hover:bg-[#57cc99] border-[#57cc99] join-item">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer />

      <div className="grid grid-cols-1 mx-auto sm:grid-cols-2 md:grid-cols-3 place-items-center gap-4">
        {data?.data?.map((book: IBook) => (
          <div className="card w-96 h-auto mb-20 shadow-2xl ">
            <figure className="p-0">
              <img
                className=" h-96 w-full"
                src="https://i.ibb.co/cDk7sRV/Brishti-Bilash-By-Humayun-Ahmed.jpg"
                alt="Shoes"
              />
            </figure>

            <div className="card-body mb-6">
              <h2 className="card-title justify-center mb-4 uppercase">
                {book?.Title}
              </h2>
              <p>
                Books have the power to transport us to new worlds, ignite our
                imaginations, and inspire us to reach for greatness.
              </p>
              <p>Genre: {book?.Genre}</p>
              <p>Author: {book?.Author}</p>
              <p>Published: {book?.PublicationDate}</p>
              {email && (
                <div className="flex justify-around mb-4 mt-4">
                  <div className="indicator">
                    <span className="indicator-item badge badge-primary">
                      wishlist
                    </span>

                    <AiFillHeart
                      onClick={() => handleAddWishList(book)}
                      size={44}
                      color="#57cc99"
                    />
                  </div>
                  <div className="indicator">
                    <span className="indicator-item badge  badge-secondary">
                      readingList
                    </span>
                    <BiBookReader
                      onClick={() => handleAddToReadingList(book)}
                      size={44}
                      color="#57cc99"
                    />
                  </div>
                </div>
              )}
              <div className="card-actions justify-center">
                <Link to={`/product-details/${book._id}`}>
                  <Button
                    onClick={() => handleSingleBook(book)}
                    btnNam="View Details"
                  ></Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
