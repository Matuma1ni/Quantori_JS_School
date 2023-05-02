import React, { useEffect, useState } from 'react';
import './App.css';
import { Item } from './models/Item';
import { apiClient } from './clients/apiClient';
import { Tag } from './models/Tag';
import { Header } from './components/header/Header';
import { Lists } from './components/lists/Lists';

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

  async function handleDeleteItem(item: Item): Promise<void> {
    await apiClient.deleteTodo(item.id);
    items.splice(items.indexOf(item), 1);
    setItems([...items]);
  }

  async function handleCompleteItem(item: Item): Promise<void> {
    item.isCompleted = true;
    await apiClient.updateTodo(item.id, item);
    setItems([...items]);
  }

  return (
    <div>
      <Header items={items} searchString={searchString} onAddItem={handleAddItem} onSearch={handleSearch}/>
      <Lists items={items} searchString={searchString} onDelete={handleDeleteItem} onComplete={handleCompleteItem}/>
    </div>
  );
}

export default App;
