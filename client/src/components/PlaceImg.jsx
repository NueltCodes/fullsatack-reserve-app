export default function PlaceImg({ place, index = 0, className = null }) {
  if (!className) {
    className = "object-cover sm:h-48 h-48 w-full";
  }

  return (
    <>
      {place && (place.images?.length > 0 || place.photos?.length > 0) && (
        <div>
          {place.images?.[0] ? (
            <img
              className={className}
              src={"http://localhost:4000/" + place.images?.[0]}
              alt="House Image"
            />
          ) : (
            <img
              className={className}
              src={"http://localhost:4000/uploads/" + place.photos?.[0]}
              alt="House Image"
            />
          )}
        </div>
      )}
    </>
  );
}
