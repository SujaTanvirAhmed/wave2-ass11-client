import * as React from 'react';
import {allContext} from '../../context/AllContextProvider';

export default function Test() {

    const hello = React.useContext(allContext);
    console.log(hello);

    return (
        <div>
            <h1>Test</h1>
        </div>
    );

}