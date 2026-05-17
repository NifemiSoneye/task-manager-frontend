import { useSelector, useDispatch } from "react-redux";
import { selectSearch, setSearch } from "@/features/ui/searchSlice";
import { DebouncedInput } from "../DebouncedInput";
const SearchBar = () => {
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();
  return (
    <div>
      <DebouncedInput
        name="search"
        type="text"
        placeholder="Search Boards..."
        className="lg:w-[15vw] rounded-sm lg:p-5 text-white focus:outline-none w-[50vw] p-3 border-transparent  "
        value={search}
        onChange={(value) => dispatch(setSearch(value as string))}
      />
    </div>
  );
};

export default SearchBar;
