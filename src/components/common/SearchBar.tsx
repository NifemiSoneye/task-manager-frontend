import { useSelector, useDispatch } from "react-redux";
import { selectSearch, setSearch } from "@/features/ui/searchSlice";
import { Input } from "../ui/input";
const SearchBar = () => {
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };
  return (
    <div>
      <Input
        name="search"
        type="text"
        placeholder="Search Boards..."
        className="lg:w-[15vw] rounded-sm lg:p-5 text-white focus:outline-none w-[50vw] p-3 border-transparent "
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
