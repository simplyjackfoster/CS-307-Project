/* 
 * This file is where the icons used throughout the app are referenced.
 *
 * Use the website below to refer to the available icons:
 * https://oblador.github.io/react-native-vector-icons/
 */
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export function renderIcon(name, size, color) {
    return(<Icon name={name} size={size} color={color}/>)
}