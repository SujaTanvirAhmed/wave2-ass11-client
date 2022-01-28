import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { allContext } from '../context/AllContextProvider';

export default function ProtectedRoute(props) {
    const { isAuthed } = React.useContext(allContext);
    return isAuthed() ? props.children :
        <Navigate to="/login" state={{ from: props.path }} />;
}