import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);

    function handleAddTask(newTaskTitle: string) {
        const data = {
            id: new Date().getTime(),
            title: newTaskTitle,
            done: false
        };

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

    function handleRemoveTask(id: number) {
        setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id));

        // Alert.alert(
        //     'Hey There!',
        //     `Want to remove this item from your list?`,
        //     [
        //         {
        //             text: 'Yes',
        //             onPress: () => {
        //                 setTasks((oldTasks) =>
        //                 oldTasks.filter((trask) => trask.id !== id),
        //                 );
        //             },
        //         },
        //         {
        //             text: 'No',
        //             style: 'cancel',
        //         },
        //     ],
        //     {
        //         cancelable: true,
        //     },
        // );
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEBEB'
    }
});
