import React,{useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
function Table() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);
  const navigate = useNavigate();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const Delete = (index) =>{
   const Clone = [...items];
   Clone.splice(index,1)
   setItems(Clone)
  }
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);
  const handleSort = (criteria) => {
    if (sortCriteria === criteria) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
        setSortCriteria(criteria);
        setSortOrder('asc');
    }
};
const currentItems = items
.filter(item => {
    const values = Object.values(item).join('').toLowerCase();
    return values.includes(searchQuery.toLowerCase());
})
.slice(indexOfFirstItem, indexOfLastItem);

const sortedItems = currentItems.slice().sort((a, b) => {
  if (!sortCriteria) return 0;
  const valueA = a[sortCriteria].toLowerCase();
  const valueB = b[sortCriteria].toLowerCase();
  if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
  if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
  return 0;
});
  return (
    <>
      <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
            />
      <button onClick={() => navigate("/create")}>Add</button>
{
 <table>
    <tr>
                    <th onClick={() => handleSort('firstName')}>Name</th>
                    <th onClick={() => handleSort('lastName')}>Age</th>
                    <th onClick={() => handleSort('email')}>Gender</th>
                </tr>
    {sortedItems.map((val, key) => {
        return (
            <tr key={key}>
                <td>{val.firstName}</td>
                <td>{val.lastName}</td>
                <td>{val.email}</td>
                <td>{val.image && <img src={val.image} alt="Preview" style={{ maxWidth: '100px' }} />}</td>
                <td onClick={() =>  navigate(`/edit/${val.firstName}`)}><button>Edit</button></td>
                <td><button onClick={() => Delete(key) }>Delete</button></td>
                <td><button onClick={() => navigate(`/view/${key}`) }>View</button></td>
            </tr>
        )
    })}
</table>
}
<div>
        <button onClick={() => paginate(1)}>1</button>
        <button onClick={() => paginate(2)}>2</button>
      </div>
    </>
  );
}

export default Table;

