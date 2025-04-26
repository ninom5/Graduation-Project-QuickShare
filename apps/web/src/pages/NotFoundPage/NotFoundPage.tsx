import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>Page not found</div>
      <button onClick={() => navigate(-1)}>Go back</button>
    </>
  );
};
