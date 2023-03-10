import { BsGoogle } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

export default function AddressLink({ children, className = null }) {
  if (!className) {
    className = "my-3 block";
  }
  className += " flex gap-1 font-semibold underline";
  return (
    <div className="">
      <a
        className={className}
        target="_blank"
        href={"https://maps.google.com/?q=" + children}
      >
        <div className="flex items-center  gap-1">
          <HiLocationMarker className="text-red-500" size={24} />
          {children}
        </div>
      </a>
    </div>
  );
}
