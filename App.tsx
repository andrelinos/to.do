import React from 'react';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Home } from './src/pages/Home';

export default function App() {
    return (
        
            <>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />
                <Home />
            </>
    
    );
}
