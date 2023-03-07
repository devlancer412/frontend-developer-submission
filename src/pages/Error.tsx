import { useGallery } from "../hooks"
import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
  const navigate = useNavigate();
  const { error } = useGallery();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className='text-xl md:text-6xl text-center font-bold mb-5'>Something went wrong</h1>
      <p className='text-md md:text-lg text-center mb-4'>{error ?? "UnKnown error"}</p>
      <button
        type="button"
        className='btn-primary w-40 mt-4 rounded'
        onClick={() => navigate("/")}>
        Retry
      </button>
    </div>
  )
}