import "./App.css";
import React, { useState, ReactElement } from "react";

const Todos: ITask[] = [
  {
    id: 1,
    text: "Just do it",
    statusId: 0,
  },
  {
    id: 2,
    text: "Just do it 2",
    statusId: 1,
  },
  {
    id: 3,
    text: "Just do it 3",
    statusId: 0,
  },
];

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
  data: ITask;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Task: React.FC<ITaskProps> = ({ data, onChange }): ReactElement => {
  return (
    <>
      <div key={data.id} className="task">
        <label className="custom-checkbox">
          <input
            checked={data.statusId === 1 ? true : false}
            type="checkbox"
            onChange={onChange}
          />
          <span className={data.statusId === 1 ? "completed-task" : ""}>
            {data.text}
          </span>
        </label>
      </div>
    </>
  );
};

function App(): JSX.Element {
  const [todos, setTodos] = useState<ITask[]>(Todos);
  const [activeFilter, setActiveFilter] =
    useState<TodoStatusNames>(AllFilterValue);
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [isSummaryOpen, setIsSummaryOpen] = useState<boolean>(true);

  const countLeft: number = todos.reduce(
    (accum, task) => (task.statusId === 0 ? accum + 1 : accum),
    0
  );

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
    setTodos(newTodos);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key == "Enter") {
      createTask();
    }
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createTask();
  };

  const onToggle = (e: React.ChangeEvent<HTMLDetailsElement>) => {
    setIsSummaryOpen(e.currentTarget.open);
  };

  const createTask = () => {
    if (newTaskText === "") return;
    const id = todos[todos.length - 1]?.id ?? 0;
    todos.push({
      id: id + 1,
      text: newTaskText,
      statusId: 0,
    });
    setTodos(todos);
    setNewTaskText("");
    setIsSummaryOpen(true);
  };

  const deleteCompletedTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTodos(todos.filter((task) => task.statusId !== 1));
  };

  return (
    <div className="todos-app">
      <header>todos</header>
      <details
        className="todos-container"
        open={isSummaryOpen}
        onToggle={onToggle}
      >
        <summary>
          <div className={"summary-arrow" + (isSummaryOpen ? " open" : "")}>{">"}</div>
          <input
            value={newTaskText}
            placeholder="What needs to be done?"
            onChange={onChange}
            onKeyDown={onKeyDown}
            title={"Press 'Enter' to confirm"}
          />
          {newTaskText && (
            <button className="submit-task-btn" onClick={onClick}>
              OK
            </button>
          )}
        </summary>
        <div className="todos">
          {todos.length < 1 ? (
            //   <div className="no-tasks">No tasks</div>
            <></>
          ) : (
            todos.map((task) => {
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
                    data={task}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      completeTask(e, task)
                    }
                  />
                );
              }
            })
          )}
        </div>
        <div className="todos-footer">
          <span>{countLeft} item left</span>
          <div className="filter">
            {FilterValues.map((status) => (
              <div
                key={status}
                className={activeFilter === status ? "selected-filter" : ""}
                onClick={() => setActiveFilter(status)}
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
