import './App.css';
import CardList from "./components/card-list/cardList.component";
import SearchBox from "./components/search-box/searchBox.component";
import {useState, useEffect} from "react";

const App = () => {
  const [searchField, setSearchField] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(()=> {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, [])

  useEffect( () => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return  monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    let searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  return (
      <div className="App">
        <h1 className='title'>Monsters Rolodex</h1>
        <SearchBox
            onChangeHandler={onSearchChange}
            placeholder='search monsters'
            className='monsters-search-box'
        />
        <CardList monsters={filteredMonsters}/>
      </div>
  );
}

export default App;
