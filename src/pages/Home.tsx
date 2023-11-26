import { addBook } from "../redux/features/Books/BookSlice";
import { useGetAllBooksQuery } from "../redux/features/Books/Booksapi";
import { useAppDispatch } from "../redux/hooks";
import { IBook } from "../types/BooksType";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Button from "../Components/Button/Button";




export default function Home() {
  const dispatch = useAppDispatch();
  const { data: result, isLoading } = useGetAllBooksQuery(undefined);
  const handleSingleBook = (book: IBook) => {
    dispatch(addBook(book));
  };
  console.log(isLoading);

  console.log(result);
  let sortedData: IBook[] = [];
  if (result?.data) {
    sortedData = [...result.data].sort((a, b) => {
      const dateA = new Date(a.PublicationDate);
      const dateB = new Date(b.PublicationDate);
      return dateB.getTime() - dateA.getTime();
    });
  }
  if (isLoading) {
    <>
      <span className="loading loading-bars text-white loading-lg"></span>
      <p>loading</p>
    </>;
  }
  return (
    <>
    <Helmet title="BookShelf | Home"></Helmet>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {sortedData?.map((book: IBook) => (
        <div className="card w-96 bg-base-100v shadow-2xl m-6 mt-0 text-center">
          <figure>
            <img src="https://i.ibb.co/3dxFsTN/book-of-famous-writer-humayun-ahmed.jpg" alt="Shoes" />
          </figure>

          <div className="card-body">
            <h2 className="card-title uppercase justify-center">{book?.Title}</h2>
            <p>
              Books have the power to transport us to new worlds, ignite our
              imaginations, and inspire us to reach for greatness.
            </p>
            <p>Genre: {book?.Genre}</p>
            <p>Author: {book?.Author}</p>
            <p>Published: {book?.PublicationDate}</p>
            <div className="card-actions justify-center mt-6">
              <Link to={`/product-details/${book._id}`}>
                <Button onClick={() => handleSingleBook(book)} btnNam="View Details"></Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
