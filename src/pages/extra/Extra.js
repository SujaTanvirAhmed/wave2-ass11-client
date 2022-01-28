import { useState } from 'react';
import './Extra.css';

export default function Extra() {
    const [val, setVal] = useState('');
    function setValue() {
        setVal("Hello");
    }
    function printValue() {
        console.log(val);
    }
    return (
        <div className="Extra">
            <h3 className="page-title">Extra</h3>
            <button onClick={setValue}>Set val</button>
            <br />
            <button onClick={printValue}>Print val</button>
        </div>
    );
}