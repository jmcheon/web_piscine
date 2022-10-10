import './itemList'
import Item from './item';

function ItemList(props) {

    const removeItem = (id) => {
        const newList = props.list.filter((currentItem) => currentItem.id !== id);
        props.setlist(newList);
    };

    const input_list = props.list.map((currentItem) => (
        <Item
            key={currentItem.id}
            id={currentItem.id}
            item={currentItem.text}
            removeItem={removeItem}
        >
        </Item>
    ));

    return (
        <div>
            {input_list}
        </div>
    );
}

export default ItemList;