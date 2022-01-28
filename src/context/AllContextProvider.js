import { createContext } from 'react';
import useFirebase from '../hooks/useFirebase';
import useLocalStorage from '../hooks/useLocalStorage';

export const allContext = createContext(undefined);

export default function AllContextProvider({ children }) {

    const firebaseContext = useFirebase();
    const localStorageContext = useLocalStorage();
    const allTheContext = { ...firebaseContext, ...localStorageContext };

    // allTheContext.selectedTestId = selectedTestId;
    // console.log(allTheContext);

    return (
        <allContext.Provider value={allTheContext}>
            {children}
        </allContext.Provider>
    );
}