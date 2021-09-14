import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../../assets/icons/trash/trash.png';

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

interface TasksItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number, taskTitle: string) => void;
    editTask: ({ id, taskNewTitle }: EditTaskArgs) => void;
}

export function TaskItem({
    task,
    editTask,
    toggleTaskDone,
    removeTask
}: TasksItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setTaskNewTitleValue(task.title);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask({ id: task.id, taskNewTitle: taskNewTitleValue });
        setIsEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing]);

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity
                    // testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => {
                        toggleTaskDone(task.id);
                    }}
                >
                    <View
                        // testID={`marker-${index}`}
                        style={
                            task.done
                                ? styles.taskMarkerDone
                                : styles.taskMarker
                        }
                    >
                        {task.done && (
                            <Icon name="check" size={12} color="#FFF" />
                        )}
                    </View>

                    <Text
                        style={
                            task.done ? styles.taskTextDone : styles.taskText
                        }
                    >
                        {task.title}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                // testID={`trash-${index}`}
                style={{ paddingHorizontal: 24 }}
                onPress={() => {
                    removeTask(task.id, task.title);
                }}
            >
                <Image source={trashIcon} />
            </TouchableOpacity>
        </View>
    );
}
