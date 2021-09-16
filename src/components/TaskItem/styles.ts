import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoContainer: {
        flex: 1
    },
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        maxWidth: 268,
        color: '#718093',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        maxWidth: 268,
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
       flexDirection: 'row',
       alignItems: 'center',
       paddingLeft: 12,
       paddingRight: 24,
    },
    iconsDivider: {
       width: 1,
       height: 24,
       backgroundColor: 'rgba(196, 196, 196, 0.24)',
       marginHorizontal: 8
    }
});
