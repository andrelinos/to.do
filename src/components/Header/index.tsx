import React from 'react';
import { View, Text, Image } from 'react-native';

import logoImg from '../../assets/images/logo/logo.png';

import { styles } from './styles';

interface HeaderProps {
    tasksCounter: number;
}

export function Header({ tasksCounter }: HeaderProps) {
    const tasksCounterText = ' tarefa';

    return (
        <View style={styles.container}>
            <Image source={logoImg} />

            <View style={styles.tasks}>
                <Text style={styles.tasksCounter}>Você tem </Text>
                <Text style={styles.tasksCounterBold}>{tasksCounter}</Text>
                <Text style={styles.tasksCounter}>
                    {tasksCounter === 1 ? tasksCounterText : ' tarefas'}
                </Text>
            </View>
        </View>
    );
}
