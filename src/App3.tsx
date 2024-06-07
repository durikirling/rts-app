import "./App.css";
import React, { useState, ReactElement, useEffect } from "react";

const TaskStatuses: ITaskStatus[] = [
  {
    id: 0,
    name: "Active",
  },
  {
    id: 1,
    name: "Completed",
  },
  //   {
  //     id: 2,
  //     name: "Returned",
  //   },
];

interface ITask {
  id: number;
  text: string;
  // statusId: Extract<ITodoStatus, "id">
  // statusId: Pick<ITodoStatus, "id">
  statusId: ITaskStatus["id"];
}

interface ITaskStatus {
  id: number;
  name: string;
}

// type TodoStatusNames = (typeof TaskStatuses)[number]["name"];
type TodoStatusNames = (typeof FilterValues)[number];

const FilterValues = [...TaskStatuses.map((status) => status.name)];
const AllFilterValue = "All";
FilterValues.unshift(AllFilterValue);

// type FilterValues = "All" | TodoStatusNames;

interface ITaskProps {
  taskData: ITask;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const addDataIntoCache = <T,>(cacheName: string, url: string, response: T) => {
  const data = new Response(JSON.stringify(response));
  if ("caches" in window) {
    window.caches.open(cacheName).then((cache) => {
      cache.put(url, data);
    });
  }
};

const getDataFromCache = <T,>(
  cacheName: string,
  url: string
): Promise<T> | null => {
  if ("caches" in window) {
    return caches
      .open(cacheName)
      .then((cache) => cache.match(url).then((res) => res?.json()));
  }
  return null;
};

const Task: React.FC<ITaskProps> = ({ taskData, onChange }): ReactElement => {
  return (
    <li key={taskData.id} className="task">
      <label className="custom-checkbox">
        <input
          checked={taskData.statusId === 1 ? true : false}
          type="checkbox"
          onChange={onChange}
        />
        <span className={taskData.statusId === 1 ? "completed-task" : ""}>
          {taskData.text}
        </span>
      </label>
    </li>
  );
};

function App(): JSX.Element {
  const [todos, setTodos] = useState<ITask[]>([]);
  const setTodosCustom = (data: ITask[]) => {
    addDataIntoCache("todos", "todos_url", data);
    setTodos(data);
  };

  const [activeFilter, setActiveFilter] =
    useState<TodoStatusNames>(AllFilterValue);
  const setActiveFilterCustom = (status: TodoStatusNames) => {
    setActiveFilter(status);
    addDataIntoCache("filter", "filter_url", status);
  };

  const [newTaskText, setNewTaskText] = useState<string>("");
  const [isSummaryOpen, setIsSummaryOpen] = useState<boolean>(true);

  useEffect(() => {
    getDataFromCache<ITask[]>("todos", "todos_url")?.then((res) => {
      if (res) setTodos(res);
    });
    getDataFromCache<TodoStatusNames>("filter", "filter_url")?.then((res) => {
      if (res) setActiveFilter(res);
    });
  }, []);

  const countLeft: number = todos.reduce(
    (accum, task) => (task.statusId === 0 ? accum + 1 : accum),
    0
  );

  const onToggleOfDetails = (e: React.ChangeEvent<HTMLDetailsElement>) => {
    setIsSummaryOpen(e.currentTarget.open);
  };

  const onKeyUpOfSummary = (e: React.KeyboardEvent<HTMLDetailsElement>) => {
    if (e.code === "Space" || e.keyCode === 32)
      e.preventDefault(); // don't expand\collapse details
    else if (e.key === "Enter") createTask();
  };

  const onInputNewTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setNewTaskText(e.target.value);
  };

  const onClickSaveButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    createTask();
  };

  const createTask = () => {
    if (newTaskText.replace(/ +(?= )/g, "").replace(/\s/g, "") === "") return;
    const id = todos[todos.length - 1]?.id ?? 0;
    todos.push({
      id: id + 1,
      text: newTaskText,
      statusId: 0,
    });
    setTodosCustom(todos);
    setNewTaskText("");
    setIsSummaryOpen(true);
  };

  const completeTask = (
    e: React.ChangeEvent<HTMLInputElement>,
    task: ITask
  ) => {
    const newTodos: ITask[] = [
      ...todos.map((item) => {
        if (task.id === item.id)
          return {
            ...item,
            statusId: task.statusId === 0 ? 1 : 0,
          };
        else return item;
      }),
    ];
    setTodosCustom(newTodos);
  };

  const deleteCompletedTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTodosCustom(todos.filter((task) => task.statusId !== 1));
  };

  return (
    <div className="todos-app">
      <header>todos</header>
      <details
        className="todos-container"
        open={isSummaryOpen}
        onToggle={onToggleOfDetails}
      >
        <summary onKeyUp={onKeyUpOfSummary}>
          <div className={"summary-arrow" + (isSummaryOpen ? " open" : "")}>
            {">"}
          </div>
          <input
            value={newTaskText}
            placeholder="What needs to be done?"
            onChange={onInputNewTask}
            title={"Press 'Enter' to confirm"}
          />
          {newTaskText && (
            <button className="submit-task-btn" onClick={onClickSaveButton}>
              OK
            </button>
          )}
        </summary>
        {/* <div className="todos"> */}
        {todos.length < 1 ? (
          //   <div className="no-tasks">No tasks</div>
          <></>
        ) : (
          <ul className="todos">
            {todos.map((task) => {
              const statusName: string | undefined = TaskStatuses.find(
                (item) => item.id === task.statusId
              )?.name;
              if (
                activeFilter === AllFilterValue ||
                activeFilter === statusName
              ) {
                return (
                  <Task
                    key={task.id}
                    taskData={task}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      completeTask(e, task)
                    }
                  />
                );
              } else return null;
            })}
          </ul>
        )}
        {/* </div> */}
        <div className="todos-footer">
          <span>{countLeft} item left</span>
          <div className="filter">
            {FilterValues.map((status) => (
              <div
                key={status}
                className={activeFilter === status ? "selected-filter" : ""}
                onClick={() => setActiveFilterCustom(status)}
              >
                {status}
              </div>
            ))}
          </div>
          <button onClick={deleteCompletedTask}>Clear completed</button>
        </div>
      </details>
    </div>
  );
}

export default App;
