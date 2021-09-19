import React from 'react';
import { FlatList, SectionList, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ItemWrapper } from '../ItemWrapper';
import { TaskItem } from '../TaskItem';

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

export function TasksList({
    tasks,
    toggleTaskDone,
    removeTask,
    editTask
}: TasksListProps) {
    return (
        // <FlatList
        //     data={tasks}
        //     keyExtractor={(item) => String(item.id)}
        //     contentContainerStyle={{ paddingBottom: 24 }}
        //     showsVerticalScrollIndicator={false}
        //     renderItem={({ item, index }) => {
        //         return (
        //             <ItemWrapper index={index}>
        //                 <TaskItem
        //                     task={item}
        //                     editTask={editTask}
        //                     toggleTaskDone={toggleTaskDone}
        //                     removeTask={removeTask}
        //                 />
        //             </ItemWrapper>
        //         );
        //     }}
        //     style={{
        //         marginTop: 32
        //     }}
        // />

        <KeyboardAwareScrollView
            style={{ flex: 1, marginBottom: 32, paddingTop: 25 }}
            overScrollMode="always"
        >
            {tasks.map((item, index) => {
                return (
                    <ItemWrapper index={index} key={index}>
                        <TaskItem
                            task={item}
                            editTask={editTask}
                            toggleTaskDone={toggleTaskDone}
                            removeTask={removeTask}
                        />
                    </ItemWrapper>
                );
            })}
        </KeyboardAwareScrollView>
    );
}
