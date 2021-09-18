import React from 'react';
import { FlatList, SectionList, Text } from 'react-native';

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
        <FlatList
            data={tasks}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
                return (
                    <ItemWrapper index={index}>
                        <TaskItem
                            task={item}
                            editTask={editTask}
                            toggleTaskDone={toggleTaskDone}
                            removeTask={removeTask}
                        />
                    </ItemWrapper>
                );
            }}
            style={{
                marginTop: 32
            }}
        />
    );
}
