import './item.css'

function Item(props) {

    return (
        <div className="item-container">
            <p className="item-text">{props.item}</p>
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