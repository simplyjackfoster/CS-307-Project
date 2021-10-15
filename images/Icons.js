/* 
 * This file is where the icons used throughout the app are referenced.
 */
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export function renderIcon(name, size, color) {
    return(<Icon name={name} size={size} color={color}/>)
}