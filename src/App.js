import "./App.css";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";

function App() {
  const [todoAdd, setTodoAdd] = useState("");
  const [taskes, setTaskes] = useState([
    { id: 1, des: "make coffe", isCompleted: false },
    { id: 2, des: "do tea", isCompleted: false },
    { id: 3, des: "make neskafe", isCompleted: false },
  ]);

  const [inputFilter, setInputFilter] = useState([]);

  const draggingItem = useRef();
  const dragOverItem = useRef();

  const handleAdd = () => {
    const newTaskes = [...taskes];
    const nTaske = {
      id: taskes.length + 1,
      des: todoAdd,
      isCompleted: false,
    };
    newTaskes.push(nTaske);
    setTaskes(newTaskes);
    setTodoAdd("");
  };

  const handleCheck = (task) => {
    const newTaskes = [...taskes];
    const index = taskes.findIndex((t) => t.id === task.id);
    newTaskes[index].isCompleted = !newTaskes[index].isCompleted;
    setTaskes(newTaskes);
  };

  const handleDelete = (task) => {
    const newTaskes = taskes.filter((t) => task.id !== t.id);
    setTaskes(newTaskes);
    toast.error("Task Is Deleted ", { theme: "colored" });
  };

  const handleEdit = (task, e) => {
    const newTaskes = [...taskes];
    const ntask = {
      id: task.id,
      des: e.target.value,
      isCompleted: task.isCompleted,
    };
    const index = taskes.findIndex((t) => t.id === task.id);
    newTaskes[index] = ntask;
    setTaskes(newTaskes);
  };

  const handleDragStart = (index) => {
    draggingItem.current = index;
  };

  const handleDragEnter = (index) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    const newTaskes = [...inputFilter];
    const draggingItemContent = newTaskes[draggingItem.current];
    newTaskes.splice(draggingItem.current, 1);
    newTaskes.splice(dragOverItem.current, 0, draggingItemContent);

    draggingItem.current = null;
    dragOverItem.current = null;
    setInputFilter(newTaskes);
  };

  useEffect(() => {
    setInputFilter(taskes);
  }, []);

  return (
    <>
      <Navbar
        taskes={taskes}
        inputFilter={inputFilter}
        setInputFilter={setInputFilter}
      />
      <div className="container mt-5">
        <h1 className="text-center">Todo List Tasks</h1>

        <div className="row">
          <div className="col-10">
            <input
              className="form-control me-2"
              type="search"
              value={todoAdd}
              placeholder="creat todo task"
              onChange={(e) => setTodoAdd(e.target.value)}
            />
          </div>
          <div className="col-2">
            <button
              className={
                todoAdd !== ""
                  ? "btn btn-outline-success"
                  : "btn btn-outline-success disabled"
              }
              type="submit"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </div>
        {/* table */}

        {taskes && (
          <table class="table table-borderless mt-3">
            <tbody>
              {inputFilter.map((task, index) => {
                return (
                  <>
                    <tr
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragEnter={() => handleDragEnter(index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      {/* <th scope="row">{task.id}</th> */}
                      <td>
                        <div className="mb-3 form-check ">
                          <input
                            checked={task.isCompleted}
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                            onClick={() => handleCheck(task)}
                          />
                          <input
                            className={
                              task.isCompleted
                                ? " form-check-lable border-0 text-decoration-line-through"
                                : " form-check-lable border-0"
                            }
                            value={task.des}
                            htmlFor="exampleCheck1"
                            onChange={(e) => handleEdit(task, e)}
                          />
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={() => handleDelete(task)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        )}
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
