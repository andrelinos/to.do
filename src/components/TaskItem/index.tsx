import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';

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
            <View style={styles.infoContainer}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => {
                        toggleTaskDone(task.id);
                    }}
                    disabled={isEditing}
                >
                    <View
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
                    <TextInput
                        value={taskNewTitleValue}
                        onChangeText={setTaskNewTitleValue}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        style={
                            task.done ? styles.taskTextDone : styles.taskText
                        }
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                {isEditing ? (
                    <TouchableOpacity
                        onPress={() => {
                            handleCancelEditing();
                        }}
                    >
                        <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => {
                            handleStartEditing();
                        }}
                    >
                        <IconAnt name="edit" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                )}

                <View style={styles.iconsDivider} />

                <TouchableOpacity
                    onPress={() => {
                        removeTask(task.id, task.title);
                    }}
                    disabled={isEditing}
                >
                    <IconAnt
                        name="delete"
                        size={24}
                        color="#b2b2b2"
                        style={{ opacity: isEditing ? 0.2 : 1 }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}
