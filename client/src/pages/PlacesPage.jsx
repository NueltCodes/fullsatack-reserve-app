import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import PlaceImg from "../components/PlaceImg";
import Spinner from "../components/Spinner";
import { MdDelete, MdEdit } from "react-icons/md";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
      setLoading(false);
    });
  }, []);

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
                    // key={index}
                    className="flex 
                    sm:flex-row flex-col mb-4 
                     gap-4 bg-gray-100 p-4 rounded-2xl"
                  >
                    <div className="flex sm:w-32 sm:h-32 w-full h-full bg-gray-300 grow shrink-0">
                      <PlaceImg place={place} index={place} />
                    </div>

                    <div className="w-full pb-2">
                      <h2 className="text-xl">{place.title}</h2>
                      <p className="text-sm mt-2">{place.description}</p>
                    </div>

                    <div className="flex flex-row sm:flex-col gap-6">
                      <Link
                        to={"/account/places/" + place._id}
                        className="flex items-center gap-1 text-sm font-semibold cursor-pointer bg-white p-1 px-2 rounded-lg"
                      >
                        <MdEdit size={20} className="text-red-500" />
                        <span>edit</span>
                      </Link>

                      <div className="flex items-center gap-1 text-sm font-semibold cursor-pointer bg-black text-white p-1 px-2 rounded-lg">
                        <MdDelete size={20} className="text-red-500" />
                        <span>Delete</span>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
