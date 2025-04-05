import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';

export const UserSearchPage = () => {
  return (
    <>
      <h1>User Search</h1>
      <SearchBar
      // onSearchChange={setQuery} value={query}
      />
      <Link to="user-detail/1">Go to user detail</Link>
    </>
  );
};
