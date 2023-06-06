export class User {
    _id: String = '';
    name: String = '';
    email?: String = '';
    password?: String = '';
    salt?: String = '';
    following?: Array<String>;
    createdAt?: Date = new Date();
    updatedAt?: Date = new Date();
    photos?: Array<Photo>;
}

export class Photo {
    name: String = '';
    data?: any;
}

export class UserCredentials {
    email: String = '';
    password: String = '';
}

export class UserProfileResponse {
    status: Boolean = false;
    user: User = new User();
}

export class SharedPhotoResponse {
    status: Boolean = false;
    users?: Array<User>;
}
