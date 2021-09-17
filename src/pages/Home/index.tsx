import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, View } from 'react-native';

import { Header } from '../../components/Header';
import { TasksList } from '../../components/TasksList';
import { TodoInput } from '../../components/TodoInput';

import { styles } from './styles';

type Task = {
    id: number;
    title: string;
    done: boolean;
};

type EditTaskArgs = {
    id: number;
    taskNewTitle: string;
};

interface TasksListProps {
    tasks: Task[];
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number, taskTitle: string) => void;
    editTask: ({ id, taskNewTitle }: EditTaskArgs) => void;
}

export function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        (async () => {
            const response = await AsyncStorage.getItem('@todoStorageTasks');
            const tasksResults = JSON.parse(response);
            setTasks(tasksResults);
            console.log(tasksResults);
        })();
    }, []);

    const storeData = async () => {
        try {
            await AsyncStorage.setItem(
                '@todoStorageTasks',
                JSON.stringify(tasks)
            );
        } catch (e) {
            return;
        }
    };

    useEffect(() => {
        storeData();
    }, [tasks]);

    function handleAddTask(newTaskTitle: string) {
        const existsTasks = tasks.map((task) => ({ ...task }));

        const data = {
            id: new Date().getTime(),
            title: newTaskTitle,
            done: false
        };

        const newTask = existsTasks.find((task) => data.title === task.title);

        if (newTask?.title === data.title) {
            Alert.alert(
                'Tarefa já existe',
                `A tarefa "${newTask.title}" já existe em sua lista?`,
                [
                    {
                        text: 'Ok',
                        onPress: () => {
                            return;
                        }
                    }
                ],
                {
                    cancelable: false
                }
            );
        } else {
            setTasks((oldTasks) => [...oldTasks, data]);
        }
    }

    function handleToggleTaskDone(id: number) {
        const updatedTasks = tasks.map((task) => ({ ...task }));
        const taskToBeMarkedAsDone = updatedTasks.find(
            (task) => task.id === id
        );

        if (!taskToBeMarkedAsDone) {
            return;
        }

        taskToBeMarkedAsDone.done = !taskToBeMarkedAsDone.done;
        setTasks(updatedTasks);
    }

    function handleRemoveTask(id: number, taskTitle: string) {
        // setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id));

        Alert.alert(
            'Remover item',
            `Tem certeza que deseja remover "${taskTitle}" da sua lista?`,
            [
                {
                    text: 'Não',
                    style: 'cancel'
                },
                {
                    text: 'Sim',
                    onPress: () => {
                        setTasks((oldTasks) =>
                            oldTasks.filter((trask) => trask.id !== id)
                        );
                    }
                }
            ],
            {
                cancelable: true
            }
        );
    }

    function handleEditTask({ id, taskNewTitle }: EditTaskArgs) {
        const updatedTasks = tasks.map((task) => ({ ...task }));
        const taskToBeUpdated = updatedTasks.find((task) => task.id === id);

        if (!taskToBeUpdated) {
            return;
        }

        taskToBeUpdated.title = taskNewTitle;
        setTasks(updatedTasks);
    }

    return (
        <View style={styles.container}>
            <Header tasksCounter={tasks.length} />

            <TodoInput addTask={handleAddTask} />

            <TasksList
                tasks={tasks}
                editTask={handleEditTask}
                toggleTaskDone={handleToggleTaskDone}
                removeTask={handleRemoveTask}
            />
        </View>
    );
}
