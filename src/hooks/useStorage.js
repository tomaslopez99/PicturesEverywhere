import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStorage = (key, initialValue) => {
  const [value, setValue] = useState(null);

  const setStoredValue = async newValue => {
    const jsonValue = JSON.stringify(newValue);
    await AsyncStorage.setItem(key, jsonValue);
    setValue(newValue);
  };

  useEffect(() => {
    const getValue = async () => {
      const jsonValue = await AsyncStorage.getItem(key);
      const storedValue = JSON.parse(jsonValue);
      setValue(storedValue ? storedValue : initialValue);
    };

    getValue();
  }, [initialValue, key, value]);

  return [value, setStoredValue];
};
