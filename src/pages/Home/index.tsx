import React, { useState } from 'react';
import { Alert, View } from 'react-native';

import { Header } from '../../components/Header';
import { Task, TasksList } from '../../components/TasksList';
import { TodoInput } from '../../components/TodoInput';

import { styles } from './styles';

export function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);

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
        }

        setTasks((oldTasks) => [...oldTasks, data]);
    }

    function handleToggleTaskDone(id: number) {
        const updatedTasks = tasks.map((task) => ({ ...task }));
        const newTasks = updatedTasks.find((task) => task.id === id);

        if (!newTasks) {
            return;
        }

        newTasks.done = !newTasks.done;
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

    return (
        <View style={styles.container}>
            <Header tasksCounter={tasks.length} />

            <TodoInput addTask={handleAddTask} />

            <TasksList
                tasks={tasks}
                toggleTaskDone={handleToggleTaskDone}
                removeTask={handleRemoveTask}
            />
        </View>
    );
}
