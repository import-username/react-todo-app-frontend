import React, { useEffect, useState } from "react";
import { isResponseSuccessful } from "../../helper/HttpHelper";
import styles from "./TodoListPage.module.scss";
import TodoListSidebar from "./TodoListSidebar/TodoListSidebar";

export default function TodoListPage() {
    const { todoListState, addTodoListItem, removeTodoList } = useTodoListState();

    useEffect(() => {
        (async function() {
            const api: string = process.env.REACT_APP_API_URL + "/todo-list/get-todo-lists";

            const request = await fetch(api, { method: "GET", credentials: "include" });

            if (!isResponseSuccessful(request.status)) {
                return console.log("Failed to populate todo list sidebar.") ;
            } else {
                const response = await request.json();
                
                response.rows.forEach((todoList: TodoList) => {
                    addTodoListItem({
                        id: todoList.id,
                        title: todoList.title,
                        fields: todoList.fields,
                        createdAt: new Date(todoList.createdAt).toDateString()
                    });
                });
            }
        })();
    }, []);

    return (
        <div className={styles["todo-list-container"]}>
            <TodoListSidebar todoListState={todoListState} addTodoListItem={addTodoListItem} removeTodoList={removeTodoList}/>
        </div>
    );
}

function useTodoListState(): TodoListStateHook {
    const [todoLists, setTodoLists]: [TodoList[] | null, React.SetStateAction<any>] = useState(null);

    function addTodoListItem(listItem: TodoList) {
        if (listItem) {
            setTodoLists((state: TodoList[] | null) => {
                if (state) {
                    return [...state, listItem];
                } else {
                    return [listItem];
                }
            });
        }
    }

    function removeTodoList(listItem: TodoList) {
        if (todoLists && listItem) {
            setTodoLists(() => [...todoLists].filter((item: TodoList) => {
                return item.id !== listItem.id;
            }));
        }
    }

    return {
        todoListState: todoLists,
        addTodoListItem,
        removeTodoList
    }
}

export interface TodoListStateHook {
    todoListState: TodoList[] | null,
    addTodoListItem: (listItem: TodoList) => void,
    removeTodoList: (listItem: TodoList) => void
}

export interface TodoList {
    id: number,
    title: string,
    fields: TodoListField[],
    createdAt: string
}

export interface TodoListField {
    title: string,
    complete: boolean
}
