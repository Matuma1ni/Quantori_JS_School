import React, { useEffect, useState } from 'react';
import './App.css';
import { Item } from './models/Item';
import { apiClient } from './clients/apiClient';
import { Tag } from './models/Tag';
import { Header } from './components/header/Header';

function App() {

  const [items, setItems] = useState<Item[]>([]);
  const [searchString, setSearchString] = useState<string>('');


  useEffect(() => {
    const fetchItems = async () => {
      const initialItemsList = await apiClient.getTodos();
      setItems(initialItemsList);
    }
    void fetchItems();
  }, []);

  function handleSearch(searchString: string): void {
    setSearchString(searchString);
  }

  async function handleAddItem(text: string, tag: Tag): Promise<void> {
    const item = await apiClient.addTodo(text, tag);
    setItems([...items, item]);
  }

  return (
    <div>
      <Header items={items} searchString={searchString} onAddItem={handleAddItem} onSearch={handleSearch}/>
    </div>
  );
}

export default App;
