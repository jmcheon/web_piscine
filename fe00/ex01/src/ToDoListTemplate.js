import './ToDoListTemplate.css'
function Todolist() {
    return (
      <div>
          <section className="firstSection">
            <p>ToDoList</p> 
          </section>
          <section className="secondSection">
            <p>입력할 부분</p> 
          </section>
          <hr/>
          <section className="thirdSection">
            <span>할일 리스트 부분</span>
          </section>
      </div>
    )
  }

  export default Todolist;