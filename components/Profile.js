import React from 'react';
import type { ImageSourcePropType } from 'react-native/Libraries/Image/ImageSourcePropType';

export type Profile = {
	id: String,
	profile_picture: ImageSourcePropType,
	name: String,
	age: Number,
	bio: String,
	interest1: String,
	interest2: String,
	interest3: String,
	interest4: String,
	interest5: String,
	graduation_year: Number,
	major: String,
	location: String,
	preferred_num_roommates: Number,
	preferred_living_location: String,
	vaccinated: String,
	instagram: String,
}
