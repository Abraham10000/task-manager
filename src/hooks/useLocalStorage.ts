import { useState, useEffect } from 'react';

const useLocalStorage = (key : string, initialValue: any) => {
  const [value, setValue] = useState(() => {
    // Verify if the key is already in the local storage
    const storedValue = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    // Update the value in the local storage every time there is a current change of the value
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
