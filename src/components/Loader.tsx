import Ring from "../assets/oval.svg";

const Loader = () => {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="w-[150px] h-[150px] text-accent">
        <img src={Ring} alt="Ring" />
      </div>
    </div>
  );
};

export default Loader;
