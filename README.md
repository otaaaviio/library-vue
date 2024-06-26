# Library with Vue

## Overview

This is a front-end project of a library that was developed with Vue.js. The project was developed with the intention of showcasing my skills with Vue.js and web application development.

## Key Features

### User Registration and Authentication

Our system allows users to register and log in, ensuring that only authenticated users can perform certain operations within the site.

![image](https://github.com/otaaaviio/library-vue/assets/129676776/09012c07-81fc-4d82-bc3d-b430e79d416f)


![image](https://github.com/otaaaviio/library-vue/assets/129676776/89168a2f-bd85-4c77-80f0-3c99664590d9)


### Book Management

The system allows users to view, add, edit, and delete books. Books can be searched by title, author, publisher, or category.

![image](https://github.com/otaaaviio/library-vue/assets/129676776/8ad5157e-fed0-4134-bea9-017b2a32aa81)

![image](https://github.com/otaaaviio/library-vue/assets/129676776/e0277515-68c2-4049-9662-0f126c8d34b8)

### Reviews

The system contains a review system that allows users to rate books and view their reviews made.

![image](https://github.com/otaaaviio/library-vue/assets/129676776/27bd3d4f-de2c-43b4-984b-24e4c313cfb5)

### Reading Book List

Users can add books to a reading list, allowing them to keep track of the books they want to read and mark which books they have read or not.

![image](https://github.com/otaaaviio/library-vue/assets/129676776/be9a8142-cdae-4967-a486-3ae4cc916ab3)


### Multi-Language Support

The system supports several languages, allowing users to choose the language of their preference. Among them, we have:
- Portuguese
- English
- Spanish

### Theme Switcher

The system allows users to choose between a light theme and a dark theme, allowing them to customize the appearance of the site according to their preferences.

### Docker

The system is containerized using Docker, making it easy to deploy and scale.

### Aditional information

I attach some site pics for better visualization, but the site have more implementations, so fork the project and explore

## Getting Started

### Prerequisites

This project requires the following dependencies:

- [Docker compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repo

```sh
git clone https://github.com/otaaaviio/library.git
```

2. Run the following command to build the project in first time

```sh
docker compose build --no-cache
```

3. Run the following command to start the project

```sh
docker compose up -d
```
Now you can access the project.
Available on: <br>
library-vue  |   http://127.0.0.1:8080 <br>
library-vue  |   http://172.21.0.2:8080

## Development

### Project Structure

```
api/
├── assets/
├── components/
├── enums/
├── interfaces/
├── layouts/
├── locales/
├── pages/
├── plugins/
├── router/
├── stores/
|── styles/
app.vue
main.ts
```

This structure suggests a web application project that uses a modular architecture, with a clear separation between different parts of the code, such as components, pages, styles, and business logic (API). If you need more details or help with something specific from this project, feel free to make a ask issue!

## Built With

- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
- [Vuetify](https://vuetifyjs.com/en/) - Material Design Component Framework
- [Axios](https://axios-http.com/) - Promise based HTTP client for the browser and node.js
- [Vue i18n](https://kazupon.github.io/vue-i18n/) - Internationalization plugin for Vue.js

## Contributing

Fork the project and create a pull request.

## Conclusion

I hope you enjoyed the project, if you have any questions or suggestions, feel free to contact me. This project serves as a sample of my work with Vue.js and web application development, you can see the back-end repository [here](https://github.com/otaaaviio/library)

## Author

* **Otávio Gonçalves** - [linkedin](https://www.linkedin.com/in/otaaaviio/)
