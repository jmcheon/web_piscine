import './item.css'
import {useState} from 'react';

function Item(props) {

    const [checked, setChecked] = useState(false);

    const toggleChecked = () => {
        setChecked((prev) => !prev);
    }
    return (
        <div className="item-container">
            <span className={"mark" + (checked ? "-checked" : "")}>
                ✔️
            </span>
            <p
                className={"item-text" + (checked ? "-checked" : "")}
                onClick={toggleChecked}
            >
                {props.item}
            </p>
            <span 
                className="delete-botton"
                onClick={() => props.removeItem(props.id)}
            >
                ❌
            </span>
        </div>
    )
}

export default Item;