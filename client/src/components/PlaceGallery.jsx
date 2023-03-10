import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsImages } from "react-icons/bs";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="fixed z-50 overflow-y-scroll inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="sm:text-3xl text-sm sm:mr-48 mr-20 w-auto">
              Photos of {place.title}
            </h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 items-center py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              <AiOutlineClose size={20} />
              <span className="hidden sm:block">Close photos</span>
            </button>
          </div>

          <div className="flex flex-col justify-center items-center gap-6 mt-5">
            {place?.images?.length > 0 &&
              place.images.map((images) => (
                <div>
                  <img
                    src={"http://localhost:4000/" + images}
                    alt=""
                    className="w-[500px] sm:h-[900px] h-[500px] md:w-[1200px] object-cover"
                  />
                </div>
              ))}

            {place?.photos?.length > 0 &&
              place.photos.map((photo) => (
                <div>
                  <img
                    src={"http://localhost:4000/uploads/" + photo}
                    alt=""
                    className="w-[500px] sm:h-[900px] h-[500px] md:w-[1200px] object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  const total = place.images.length + place.photos.length;

  return (
    <div className="relative cursor-pointer">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-lg overflow-hidden">
        <div>
          {place.images?.[0] ? (
            <div>
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square w-full cursor-pointer object-cover"
                src={"http://localhost:4000/" + place.images[0]}
                alt=""
              />
            </div>
          ) : (
            <div>
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square w-full cursor-pointer object-cover"
                src={"http://localhost:4000/uploads/" + place.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid">
          {place.images?.[1] ? (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="aspect-square cursor-pointer object-cover pb-1 w-full"
              src={"http://localhost:4000/" + place.images[1]}
              alt=""
            />
          ) : (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="aspect-square cursor-pointer object-cover pb-1 w-full"
              src={"http://localhost:4000/uploads/" + place.photos[1]}
              alt=""
            />
          )}
          <div className="overflow-hidden">
            {place.images?.[2] ? (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square cursor-pointer object-cover pt-1 w-full"
                src={"http://localhost:4000/" + place.images[2]}
                alt=""
              />
            ) : (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square cursor-pointer object-cover pt-1 w-full"
                src={"http://localhost:4000/uploads/" + place.photos[2]}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      <div
        onClick={() => setShowAllPhotos(true)}
        className="flex items-center justify-center gap-1 absolute sm:bottom-2 bottom-0 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
      >
        <BsImages size={22} />

        <div className="hidden sm:flex">View images</div>
        <span className="flex">{total}</span>
      </div>
    </div>
  );
}
