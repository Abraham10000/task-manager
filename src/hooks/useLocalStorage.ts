import { useState, useEffect } from 'react';

const useLocalStorage = (key : string, initialValue : any) => {
  const [value, setValue] = useState(() => {
    //Verify if the key is already in the local storage
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    // Update the value in the local storage everytime there is a current changement of the value
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
