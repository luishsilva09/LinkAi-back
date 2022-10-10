<p align="center"> 
    <img src="https://images.emojiterra.com/openmoji/v13.1/512px/269b.png" height="300px">
</p>

<h1 align="center">LinkAí</h1>

<div align="center">
  <h3>Built With</h3>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
 <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" heigth="30px">
  <img src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white">
  <!--  Badges  source:  https://dev.to/envoy_/150-badges-for-github-pnk  -->
</div>

# Description

This is a solution to organize and group links easily and efficiently.

# Fatures

- Signup and signin
- Create and delete links
- Get links from user
- Get links to view mode

# API references

### Signup:

```http
    POST /users/signup
```

Request:

| Body             | Type     | Description                       |
| ---------------- | -------- | --------------------------------- |
| `name`           | `string` | **Reuqired**. user name           |
| `email`          | `string` | **Reuqired**. email from user     |
| `password`       | `string` | **Reuqired**. password            |
| `repeatPassword` | `string` | **Reuqired**. repeat password     |
| `imageUrl`       | `string` | **Reuqired**. url from user photo |

`Pasword length > 8 `

</br>

### Signin:

```http
    POST /users/signin
```

Request:

| Body       | Type     | Description                   |
| ---------- | -------- | ----------------------------- |
| `email`    | `string` | **Reuqired**. email from user |
| `password` | `string` | **Reuqired**. password        |

Response:

```json
    token:
```

`Save this token you need for other aplications on API`

<br>

### Create link:

```http
    POST /links/create
```

Request:

| Headers         | Type     | Description                          |
| --------------- | -------- | ------------------------------------ |
| `Authorization` | `string` | **Reuqired**. Bearer token from user |

</br>

| Body           | Type     | Description                     |
| -------------- | -------- | ------------------------------- |
| `tag`          | `string` | **Reuqired**. name for link     |
| `originalLink` | `string` | **Reuqired**. url original link |

Response:

```json
    {
        userId: 1,
        acessCount: 0,
        tag: "name tag"
        originalLink: "https://www.colorhexa.com/093464"
        previewImage: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1130.jpg"
    }
```

### Delete link:

```http
    POST /links/delete/${linkId}
```

Request:

| Headers         | Type     | Description                          |
| --------------- | -------- | ------------------------------------ |
| `Authorization` | `string` | **Reuqired**. Bearer token from user |

</br>

| Params   | Type     | Description                |
| -------- | -------- | -------------------------- |
| `linkId` | `string` | **Reuqired**. id from link |

</br>

### Get links from user:

```http
    GET /links
```

Request:

| Headers         | Type     | Description                          |
| --------------- | -------- | ------------------------------------ |
| `Authorization` | `string` | **Reuqired**. Bearer token from user |

Response:

```json
{
  "id": 32,
  "originalLink": "https://www.colorhexa.com/093464",
  "tag": "instagram",
  "acessCount": 0,
  "previewImage": "https://www.colorhexa.com/093464.png",
  "userId": 43
}
```

### Get links to view mode:

```http
    GET /links/view/${urlId}
```

Request:
| Params | Type | Description |
| ------- | -------- | ------------------------- |
| `urlId` | `string` | **Reuqired**. user url id |

Response:

```json
{
  "name": "luis",
  "imageUrl": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1130.jpg",
  "links": [
    {
      "id": 32,
      "originalLink": "https://www.colorhexa.com/093464",
      "tag": "instagram",
      "previewImage": "https://www.colorhexa.com/093464.png"
    }
  ]
}
```

# Tests

To run this test, you will need to add the following environment variables to your .env.test file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:4000`

To run all test:

```bash
    npm run test
```

To run unit test:

```bash
    npm run test:unit
```

To run integration test:

```bash
    npm run test:integration
```

# Run Locally

Clone the project:

```bash

  git clone https://github.com/luishsilva09/LinkAi-back.git

```

Install dependencies:

```bash

  npm install

```

Configuration and create database:

```bash

  npx prisma migrate dev

```

To run dev mode:

```bash
    npm run dev
```

To run:

```bash
    npm build
    npm start
```

# Environment Variables

To run this project in local, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:4000`

`NODE_ENV = test` just use this for run test with your frontend

# Authors

​

- Luís Henrique da Silva

​

https://github.com/luishsilva09
