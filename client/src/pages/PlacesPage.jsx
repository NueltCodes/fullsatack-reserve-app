import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import PlaceImg from "../components/PlaceImg";
import Spinner from "../components/Spinner";
import { MdDelete, MdEdit } from "react-icons/md";
import { animated } from "react-spring";
import { BsArrowUpCircle } from "react-icons/bs";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [placeToDelete, setPlaceToDelete] = useState(null);
  const [deleteHovered, setDeleteHovered] = useState(false);
  const [editHovered, setEditHovered] = useState(false);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
      setLoading(false);
    });
  }, []);

  // ...

  const handleDeletePlace = () => {
    if (placeToDelete) {
      axios
        .delete(`/user-places/${placeToDelete._id}`)
        .then(() => {
          const updatedPlaces = places.filter(
            (place) => place._id !== placeToDelete._id
          );
          setPlaces(updatedPlaces);
          setPlaceToDelete(null);
          setShowDeleteModal(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const springProps = {
    transform: editHovered ? "scale(1.1)" : "scale(1)",
    color: editHovered ? "#f59e0b" : "#000",
  };
  const springProp = {
    transform: deleteHovered ? "scale(1.1)" : "scale(1)",
    color: deleteHovered ? "#f59e0b" : "#000",
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="px-4 lg:px-32 md:px-16 mx-auto overflow-hidden min-h-screen">
          {" "}
          <div className="sm:block hidden">
            <AccountNav />
          </div>{" "}
          <div className="text-center">
            <Link
              className="inline-flex 
              items-center gap-1 bg-primary text-white py-2 px-6 rounded-full "
              to={"/account/places/new"}
            >
              <AiOutlinePlus />
              Add new places
            </Link>
          </div>
          <div className="mt-4">
            {places.length > 0 &&
              places.map((place) => (
                <>
                  <div
                    key={place._id}
                    className="flex 
                    sm:flex-row flex-col mb-4 
                     gap-4 bg-gray-100 p-4 rounded-2xl"
                  >
                    <div className="flex sm:w-32 sm:h-32 w-full h-full bg-gray-300 grow shrink-0">
                      <PlaceImg place={place} index={place} />
                    </div>

                    <div className="w-full pb-2">
                      <h2 className="text-xl">{place.title}</h2>
                      <p className="text-sm mt-2 line-clamp-3">
                        {place.description}
                      </p>
                    </div>

                    <div className="flex flex-row sm:flex-col gap-6">
                      <Link
                        to={"/account/places/" + place._id}
                        onMouseEnter={() => setEditHovered(true)}
                        onMouseLeave={() => setEditHovered(false)}
                        className="flex items-center gap-1 text-sm font-semibold cursor-pointer bg-white p-1 px-2 rounded-lg"
                      >
                        <animated.div style={springProps}>
                          <MdEdit size={20} className="text-red-500" />
                        </animated.div>

                        <span>edit</span>
                      </Link>

                      <div
                        onClick={() => {
                          setPlaceToDelete(place);
                          setShowDeleteModal(true);
                        }}
                        className="flex items-center gap-1 text-sm font-semibold cursor-pointer bg-black text-white p-1 px-2 rounded-lg"
                        onMouseEnter={() => setDeleteHovered(true)}
                        onMouseLeave={() => setDeleteHovered(false)}
                      >
                        <animated.div style={springProp}>
                          <MdDelete size={20} className="text-red-500" />
                        </animated.div>
                        <span>Delete</span>
                      </div>
                    </div>
                  </div>
                </>
              ))}
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

      {showDeleteModal && (
        <div
          onClick={() => setShowDeleteModal(false)}
          className="fixed z-50 top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-4 rounded-lg">
            <p className="text-xl font-semibold mb-2">
              Are you sure you want to delete this place?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 py-1 px-4 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePlace}
                className="bg-red-500 text-white py-1 px-4 rounded-lg text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
