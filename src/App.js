import "./App.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todoAdd, setTodoAdd] = useState("");
  const [taskes, setTaskes] = useState([
    { id: 1, des: "make coffe", isCompleted: false },
    { id: 2, des: "make tea", isCompleted: true },
  ]);
  const handleAdd = () => {
    const newTaskes = [...taskes];
    const nTaske = {
      id: taskes.length + 1,
      des: todoAdd,
      isCompleted: false,
    };
    newTaskes.push(nTaske);
    setTaskes(newTaskes);
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

  return (
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
      <table class="table table-borderless">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Descrption</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {taskes.map((task) => {
            return (
              <>
                <tr>
                  <th scope="row">{task.id}</th>
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

      <ToastContainer />
    </div>
  );
}

export default App;
