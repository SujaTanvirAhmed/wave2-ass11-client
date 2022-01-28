import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { allContext } from "../context/AllContextProvider";

export default function ReAuthPreventRoute(props) {
    const { isAuthed } = React.useContext(allContext);
    return isAuthed() ? <Navigate to="/" /> : props.children;
}