import "../App.css";
import { HiOutlineSearch, HiUser } from "react-icons/hi";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

export default function IndexPage() {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="px-2 lg:px-32 mx-auto overflow-hidden min-h-screen">
          <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
            {places.length > 0 &&
              places.map((place) => (
                <Link
                  to={"/place/" + place._id}
                  key={place._id}
                  className="bg-gray-100 rounded-2xl"
                >
                  <div className="bg-gray-500 mb-2 rounded-2xl flex">
                    {place.images?.[0] ? (
                      <img
                        className="rounded-t-2xl object-cover aspect-square"
                        src={"http://localhost:4000/" + place.images?.[0]}
                        alt="House Image"
                      />
                    ) : (
                      <img
                        className="rounded-t-2xl object-cover aspect-square"
                        src={
                          "http://localhost:4000/uploads/" + place.photos?.[0]
                        }
                        alt="House Image"
                      />
                    )}
                  </div>

                  <div className="p-2">
                    <h2 className="font-bold w-full truncate">
                      {place.address}
                    </h2>
                    <h3 className="text-sm text-gray-500 w-full truncate">
                      {place.title}
                    </h3>

                    <div className="mt-1">
                      <span className="font-bold">${place.price}</span> per
                      night
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
