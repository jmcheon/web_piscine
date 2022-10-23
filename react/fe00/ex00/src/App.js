import './App.css';

function App() {
  return (
    <div className="App" style={{flex:'colume'}}>
      {/* <header> */}
        <section style={ {fontSize : 100, border: '1px solid'} }>
          <p>ToDoList</p> 
        </section>
        <section style={{fontSize: 30, textAlign : 'left', padding:'100px'}}>
          <p>입력할 부분</p> 
        </section>
        <hr/>
        <section style={{fontSize: 30, textAlign: 'left'}}>
          <span>할일 리스트 부분</span>
        </section>
      {/* </header> */}
    </div>
  );
}

export default App;
