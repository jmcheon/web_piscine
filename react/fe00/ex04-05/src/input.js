import './input.css'

function Input(props) {

    const onChange = (e) => {
        props.setInput(e.target.value);
    };
    const submit = (e) => {
        e.preventDefault();
        const newList = props.list.concat({
           id: props.nextId,
           text: props.input,
        });
        props.setNextId(props.nextId + 1);
        props.setlist(newList);
        props.setInput('');
    };

    return (
    <div className='input-container'>
        <form
            className='input-box'
            onSubmit={submit}
        >
                <input
                    className='input' 
                    name="list"
                    type="text"
                    value={props.input}
                    onChange={onChange}
                />
                <button
                    type="submit"
                >
                ADD
                </button>
        </form>
    </div>
    );
  }

  export default Input;