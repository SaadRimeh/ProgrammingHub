# Backend API Documentation

## Overview

This backend provides a RESTful API for a social media-like application, supporting users, posts, comments, and notifications. It uses Express.js, MongoDB, and integrates with Clerk for authentication, Cloudinary for image uploads, and Arcjet for security.

---

## Authentication

- **Clerk** is used for user authentication.
- Most write operations (creating posts, comments, etc.) require a valid Clerk token.
- Some endpoints are public (e.g., viewing user profiles, posts).

---

## Endpoints & Example JSON

### User

#### Get User Profile
- **GET** `/api/users/profile/:username`
- **Response:**
```json
{
  "user": {
    "_id": "userId",
    "clerkId": "clerkId",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "profilePicture": "https://...",
    "bannerImage": "",
    "bio": "",
    "location": "",
    "followers": [],
    "following": [],
    "createdAt": "2024-05-01T12:00:00.000Z",
    "updatedAt": "2024-05-01T12:00:00.000Z"
  }
}
```

#### Sync User (Create if new)
- **POST** `/api/users/sync`
- **Headers:** `Authorization: Bearer <ClerkToken>`
- **Response (user already exists):**
```json
{
  "user": { /* user object as above */ },
  "message": "User already exists"
}
```
- **Response (new user):**
```json
{
  "user": { /* user object as above */ },
  "message": "User created Successfully"
}
```

#### Get Current User
- **GET** `/api/users/me`
- **Headers:** `Authorization: Bearer <ClerkToken>`
- **Response:**
```json
{
  "user": { /* user object as above */ }
}
```

#### Follow/Unfollow User
- **POST** `/api/users/follow/:targetUserId`
- **Headers:** `Authorization: Bearer <ClerkToken>`
- **Response (followed):**
```json
{
  "message": "User followed successfully"
}
```
- **Response (unfollowed):**
```json
{
  "message": "User unfollowed Successfully "
}
```

#### Update Profile
- **PATCH** `/api/users/update`
- **Headers:** `Authorization: Bearer <ClerkToken>`
- **Request:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "bio": "New bio",
  "location": "New York"
}
```
- **Response:**
```json
{
  "user": { /* updated user object */ }
}
```

---

### Post

#### Get All Posts
- **GET** `/api/posts`
- **Response:**
```json
{
  "posts": [
    {
      "_id": "postId",
      "user": {
        "_id": "userId",
        "username": "johndoe",
        "firstName": "John",
        "lastName": "Doe",
        "profilePicture": "https://..."
      },
      "content": "Hello world!",
      "image": "",
      "likes": [],
      "comments": [
        {
          "_id": "commentId",
          "user": {
            "_id": "userId",
            "username": "janedoe",
            "firstName": "Jane",
            "lastName": "Doe",
            "profilePicture": "https://..."
          },
          "content": "Nice post!",
          "createdAt": "2024-05-01T12:00:00.000Z"
        }
      ],
      "createdAt": "2024-05-01T12:00:00.000Z",
      "updatedAt": "2024-05-01T12:00:00.000Z"
    }
  ]
}
```

#### Get Single Post
- **GET** `/api/posts/:postId`
- **Response:**
```json
{
  "post": { /* post object as above */ }
}
```

#### Get User Posts
- **GET** `/api/posts/user/:username`
- **Response:**
```json
{
  "posts": [ /* array of post objects as above */ ]
}
```

#### Create Post
- **POST** `/api/posts`
- **Headers:** `Authorization: Bearer <ClerkToken>`
- **Request:** `multipart/form-data`
  - `content`: (optional) text
  - `image`: (optional) image file
- **Response:**
```json
{
  "post": { /* post object as above */ }
}
```

#### Like/Unlike Post
- **POST** `/api/posts/like/:postId`
- **Headers:** `Authorization: Bearer <ClerkToken>`
- **Response (liked):**
```json
{
  "message": "Post liked successfully"
}
```
- **Response (unliked):**
```json
{
  "message": "Post unliked successfully"
}
```

#### Delete Post
- **DELETE** `/api/posts/:postId`
- **Headers:** `Authorization: Bearer <ClerkToken>`
- **Response:**
```json
{
  "message": "Post deleted successfully"
}
```

---

### Comment

#### Get Comments for a Post
- **GET** `/api/comments/post/:postId`
- **Response:**
```json
{
  "comments": [
    {
      "_id": "commentId",
      "user": {
        "_id": "userId",
        "username": "janedoe",
        "firstName": "Jane",
        "lastName": "Doe",
        "profilePicture": "https://..."
      },
      "content": "Nice post!",
      "createdAt": "2024-05-01T12:00:00.000Z"
    }
  ]
}
```

#### Add Comment to Post
- **POST** `/api/comments/post/:postId`
- **Headers:** `Authorization: Bearer <ClerkToken>`
- **Request:**
```json
{
  "content": "Great post!"
}
```
- **Response:**
```json
{
  "comment": { /* comment object as above */ }
}
```

#### Delete Comment
- **DELETE** `/api/comments/:commentId`
- **Headers:** `Authorization: Bearer <ClerkToken>`
- **Response:**
```json
{
  "message": "Comment deleted successfully"
}
```

---

### Notification

#### Get Notifications
- **GET** `/api/notifications`
- **Headers:** `Authorization: Bearer <ClerkToken>`
- **Response:**
```json
{
  "notifications": [
    {
      "_id": "notificationId",
      "from": {
        "_id": "userId",
        "username": "janedoe",
        "firstName": "Jane",
        "lastName": "Doe",
        "profilePicture": "https://..."
      },
      "to": "userId",
      "type": "like",
      "post": {
        "_id": "postId",
        "content": "Hello world!",
        "image": ""
      },
      "comment": null,
      "createdAt": "2024-05-01T12:00:00.000Z"
    }
  ]
}
```

#### Delete Notification
- **DELETE** `/api/notifications/:notificationId`
- **Headers:** `Authorization: Bearer <ClerkToken>`
- **Response:**
```json
{
  "message": "Notification deleted successfully"
}
```

---

## Data Models

### User
```js
{
  clerkId: String,
  email: String,
  firstName: String,
  lastName: String,
  username: String,
  profilePicture: String,
  bannerImage: String,
  bio: String,
  location: String,
  followers: [UserId],
  following: [UserId],
  createdAt: Date,
  updatedAt: Date
}
```

### Post
```js
{
  user: UserId,
  content: String,
  image: String,
  likes: [UserId],
  comments: [CommentId],
  createdAt: Date,
  updatedAt: Date
}
```

### Comment
```js
{
  user: UserId,
  post: PostId,
  content: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Notification
```js
{
  user: UserId,
  type: String, // e.g., "like", "comment", "follow"
  message: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Security & Rate Limiting

- **Arcjet** middleware protects against bots, rate limits requests, and blocks common attacks.
- If rate limits are exceeded, a `429 Too Many Requests` error is returned.

---

## Environment Variables

You must set these in your `.env` file:

- `PORT`
- `NODE_ENV`
- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `MONGO_URI`
- `ARCJET_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

---

