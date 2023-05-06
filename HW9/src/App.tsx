import React, { useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/header/Header';
import { Lists } from './components/lists/Lists';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getToDos, selectToDos } from './features/todo/todoSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getToDos());
  }, []);

  return (
    <div>
      <Header/>
      <Lists/>
    </div>
  );
}

export default App;
