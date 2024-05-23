interface DropdownItemProps {
  className?: string;
  category: {
    id: number;
    title: string;
    subCategories?: {
      id: number;
      title: string;
    }[];
  };
}

const DropdownItem = ({ className, category }: DropdownItemProps) => {
  const { title, subCategories } = category;
  return (
    <div className="group cursor-pointer h-full">
      <button className={`menu-hover h-full ${className}`}>
        <p>{title}</p>
        <span className={`${!subCategories && "hidden"} inline`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.6"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </button>
      <div className="invisible absolute z-50 flex flex-col py-0 min-w-48 text-gray-800 shadow-xl group-hover:visible">
        {subCategories?.map(({ id, title }) => (
          <a
            key={id}
            href="#/"
            className="block border-b border-slate-400 px-3 bg-gray-200 py-2 font-semibold text-gray-500 hover:text-black"
          >
            {title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default DropdownItem;
