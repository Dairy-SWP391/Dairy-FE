interface SearchProps {
  placeholder?: string;
  query?: string;
  setQuery?: (value: string) => void;
  wrapperClass?: string;
}

const Search = ({
  placeholder = "Search...",
  query,
  setQuery,
  wrapperClass,
}: SearchProps) => {
  return (
    <div className={`relative ${wrapperClass || ""}`}>
      <input
        className="field-input !pr-[60px]"
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={setQuery ? (e) => setQuery(e.target.value) : undefined}
      />
      <button
        className={`field-btn text-red !right-[40px] transition ${query ? "opacity-100" : "opacity-0"}`}
        onClick={setQuery ? () => setQuery("") : undefined}
        aria-label="Clear all"
      >
        <i className="icon-xmark-regular" />
      </button>
      <button className="field-btn icon" aria-label="Search">
        <i className="icon-magnifying-glass-solid" />
      </button>
    </div>
  );
};

export default Search;
