import React, { useEffect, useState } from "react";
import styles from "./TodoListPage.module.scss";
import TodoListSidebar from "./TodoListSidebar/TodoListSidebar";

export default function TodoListPage() {
    const { todoListState, addTodoListItem, removeTodoList } = useTodoListState();

    useEffect(() => {
        // fetch todo lists from backend here
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
            if (todoLists) {
                setTodoLists(() => [...todoLists, listItem]);
            } else {
                setTodoLists(() => [listItem]);
            }
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
