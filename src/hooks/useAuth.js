import { useContext } from 'react';
import { allContext } from '../context/AllContextProvider';

export default function useAuth() {
    return useContext(allContext);
}