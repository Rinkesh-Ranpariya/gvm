import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <div>Opps!!! Page not found</div>
        <button
          className="w-full bg-black text-white px-5 py-2 mt-3 rounded-md"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
