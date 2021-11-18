import React from 'react';
import type { ImageSourcePropType } from 'react-native/Libraries/Image/ImageSourcePropType';

export type Profile = {
	id: string,
	name: string,
	age: number,
	profilePicture: ImageSourcePropType,
}
