import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import { HiArrowLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import PlaceImg from "../components/PlaceImg";
import Spinner from "../components/Spinner";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/favorites").then((response) => {
      setFavorites(response.data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (favorite) => {
    axios
      .delete(`/favorites/${favorite._id}`)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Favorite place deleted",
          text: "This favorite place has been cleared.",
          showConfirmButton: false,
          timer: 4000,
        });

        setFavorites(favorites.filter((f) => f._id !== favorite._id));
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Delete failed",
          text: "Failed to delete favorite place. Please try again later.",
        });
      });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="px-4 lg:px-32 md:px-16 mx-auto overflow-hidden min-h-screen">
          <div
            onClick={() => navigate("/")}
            className={
              "text-black w-9 sm:hidden flex justify-center items-center z-50 shadow-md bg-white p-2 rounded-full hover:shadow transition duration-200 ease-in-out cursor-pointer"
            }
          >
            <HiArrowLeft className="sm:text-2xl" />
          </div>
          <h1 className="sm:hidden flex justify-center items-center bg-gray-500 p-2 mb-4 w-auto mx-auto my-3 text-white font-bold rounded-2xl">
            Your favorite places
          </h1>
          {favorites?.length > 0 && (
            <div className="flex justify-center items-center p-2 mb-4 w-auto mx-auto my-3 text-red-500 font-bold rounded-2xl">
              Tap on the places to view
            </div>
          )}
          <div className="">
            <div className="">
              {favorites?.length > 0 ? (
                favorites.map((favorite) =>
                  favorite.place ? (
                    <Link
                      key={favorite._id}
                      to={`/place/${favorite.place._id}`}
                      className="flex-col flex mb-4 sm:items-center gap-4 bg-gray-200 rounded-2xl overflow-hidden"
                    >
                      <div className="justify-center flex bg-black w-full">
                        <PlaceImg place={favorite.place} />
                      </div>
                      <div className="py-3 p-2 pr-3 grow">
                        <h2 className="text-xl">{favorite.place.title}</h2>
                        {/* <p className="text-sm mt-2 line-clamp-3">
                          {favorite.place.description}
                        </p> */}
                        <p
                          className="leading-8 text-sm mt-2 line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html: favorite.place.description,
                          }}
                        ></p>
                      </div>
                      <div
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                        className="mr-4 mb-4"
                      >
                        <button
                          className="primary"
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            handleDelete(favorite);
                          }}
                        >
                          Delete favorite
                        </button>
                      </div>
                    </Link>
                  ) : (
                    <div className="sm:flex-row flex-col flex mb-4 gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                      <div className="sm:w-48 w-full">
                        <PlaceImg place={favorite.place} />
                      </div>
                      <div className="py-3 p-2 pr-3 grow">
                        <div className="sm:text-2xl text-xl font-semibold">
                          {!favorite.place?.title && (
                            <div>
                              <span className="text-red-500">Note:</span>{" "}
                              <p className="sm:text-2xl text-lg font-bold grid gap-8 grid-cols-1 sm:grid-cols-[2fr_1fr]">
                                {" "}
                                This space has been removed by its owner. Please
                                click the delete button to clear it out.
                                <button
                                  className="primary"
                                  type="button"
                                  onClick={() => handleDelete(favorite)}
                                >
                                  Delete favorite
                                </button>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className="text-center py-10">
                  <p className="text-2xl font-bold mb-2">
                    No favorites place created yet!
                  </p>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 shadow-md rounded-full hover:bg-blue-600 animate-bounce"
          >
            <p className="sm:block hidden">Back to Top</p>
            <BsArrowUpCircle className="w-full sm:hidden block" />
          </button>
        </div>
      )}
    </>
  );
}
