export default function PlaceImg({ place, index = 0, className = null }) {
  if (!className) {
    className = "object-cover";
  }

  return (
    <>
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
    </>
  );
}
