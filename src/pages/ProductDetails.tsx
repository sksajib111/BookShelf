import {
  deleteBook,
  resetStatus,
  toggleModal,
} from "../redux/features/Books/BookSlice";
import {
  useDeleteBookMutation,
  usePostReviewMutation,
  useSingleBookQuery,
} from "../redux/features/Books/Booksapi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";
import { Helmet } from "react-helmet-async";



export default function ProductDetails() {
  const { id } = useParams();

  const [review, setReview] = useState("");
  const [updatePost] = usePostReviewMutation();
  const { data } = useSingleBookQuery(id);
  const email = useAppSelector((state) => state.user.user.email);
  const { modalStatus } = useAppSelector((state) => state.book);
  const navigate = useNavigate();
  console.log(data);
  const [deletePost ] = useDeleteBookMutation();
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    deletePost(id!).then(() => {
      dispatch(deleteBook());
    });
    dispatch(deleteBook());
    navigate("/products");
    dispatch(resetStatus());
  };
  // Inside your component

  const handleReview = (event: any) => {
    event.preventDefault();

    // Do something with the review value, such as sending it to the backend
    if (!review) {
      toast.error("please input a review");
    } else {
      const options = {
        id: id,
        data: { review: review },
      };

      updatePost(options);
      // Clear the input field
      toast.success("review added successfully");
    }
    setReview("");
  };
  const handleEdit = () => {
    dispatch(toggleModal(true));
  };

  return (
    <div>
      <ToastContainer />
      <Helmet title="BookShelf | ProductDetails"></Helmet>
      <div className="hero min-h-screen ">
        <div className="hero-content gap-8 flex-col rounded-xl bg-gray-400 lg:flex-row">
          <img
            src="https://i.ibb.co/tzGJ8QR/book136.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="flex justify-center">
            <div className="ml-8">
              <h1 className="text-5xl font-bold mb-6">{data?.Title}</h1>
              <p className="mb-4">
                <span className="font-semibold">Genre:</span> {data?.Genre}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Author:</span> {data?.Author}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Published:</span>{" "}
                {data?.PublicationDate}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Reviews:</span>{" "}
                {data?.Reviews?.map((review: string, index: number) => (
                  <span key={index} className="mr-2">
                    {review},
                  </span>
                ))}
              </p>
              <div>
                <form
                  onSubmit={handleReview}
                  className="flex flex-row items-center"
                >
                  <textarea
                    placeholder="Give a review"
                    className="textarea textarea-bordered textarea-lg mb-4 w-full max-w-xs mr-2"
                    value={review}
                    onChange={(event) => setReview(event.target.value)}
                  ></textarea>
                  <button type="submit" className="btn btn-accent  border-0">
                    Submit Review
                  </button>
                </form>
              </div>
              <div className="flex gap-4">
                {data?.email === email && (
                  <>
                    <label
                      className="btn btn-primary"
                      onClick={handleEdit}
                      htmlFor={`my-modal-${data?._id}`}
                    >
                      Edit
                    </label>
                    <button
                      className="btn btn-primary bg-red-500 border-0"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalStatus && <Modal book={data} />}
    </div>
  );
}
