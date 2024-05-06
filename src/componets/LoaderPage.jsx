import duck from '../assets/duck.webp'
import { ring2 } from 'ldrs'

ring2.register()


const LoaderPage = () => {
  return (
    <div className="absolute z-[100] w-full h-[100dvh] bg-pink  flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <img src={duck} alt="Funny Duck Image" className="w-32" />
        <l-ring-2
          size="40"
          stroke="5"
          stroke-length="0.25"
          bg-opacity="0.1"
          speed="0.8"
          color="white"
        ></l-ring-2>{" "}
      </div>
    </div>
  );
};

export default LoaderPage;
