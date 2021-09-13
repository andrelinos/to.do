import React from 'react';
import {
    FlatList,
    Image,
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from '../ItemWrapper';

import trashIcon from '../../assets/icons/trash/trash.png';

import { styles }from './styles'

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

interface TasksListProps {
    tasks: Task[];
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number, taskTitle: string) => void;
}

export function TasksList({
    tasks,
    toggleTaskDone,
    removeTask
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
                        <View>
                            <TouchableOpacity
                                testID={`button-${index}`}
                                activeOpacity={0.7}
                                style={styles.taskButton}
                                onPress={() => {
                                    toggleTaskDone(item.id);
                                }}
                            >
                                <View
                                    testID={`marker-${index}`}
                                    style={
                                        item.done
                                            ? styles.taskMarkerDone
                                            : styles.taskMarker
                                    }
                                >
                                    {item.done && (
                                        <Icon
                                            name="check"
                                            size={12}
                                            color="#FFF"
                                        />
                                    )}
                                </View>

                                <Text
                                    style={
                                        item.done
                                            ? styles.taskTextDone
                                            : styles.taskText
                                    }
                                >
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            testID={`trash-${index}`}
                            style={{ paddingHorizontal: 24 }}
                            onPress={() => {
                                removeTask(item.id, item.title);
                            }}
                        >
                            <Image source={trashIcon} />
                        </TouchableOpacity>
                    </ItemWrapper>
                );
            }}
            style={{
                marginTop: 32
            }}
        />
    );
}


