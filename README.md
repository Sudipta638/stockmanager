# Stock Manager CRUD Application

This is a Next.js CRUD application for managing stock watchlists with Clerk authentication. The application includes full CRUD functionality for watchlists, proper error handling, and a mobile-friendly UI design.

## Features
- Authentication with Clerk
- Create, Read, Update, Delete (CRUD) functionality on watchlists
- Proper error handling
- Mobile-friendly design
- Well-commented backend and frontend code for better understanding

## Environment Variables

To run the application locally, you need to set the following environment variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
MONGODB_URI=
WEBHOOK_SECRET=
API_KEY=
```

### Note
Due to the limitation of the API key, the deployed website may not work consistently. The backend code is thoroughly commented for better understanding, and the frontend code is optimized for both desktop and mobile UIs.

## API Endpoints

### Watchlist
- **Create Watchlist**
  - Endpoint: `/api/watchlist/create`
  - Method: POST

- **Delete Watchlist**
  - Endpoint: `/api/watchlist/delete/${clerkId}/${watchListName}`
  - Method: DELETE

- **Get All Watchlists of User**
  - Endpoint: `/api/watchlist/get/${clerkId}`
  - Method: GET

- **Get Watchlist by ID**
  - Endpoint: `/api/watchlist/get/${clerkId}/${watchListName}`
  - Method: GET

- **Update Watchlist**
  - Endpoint: `/api/watchlist/update/${clerkId}/${watchListName}`
  - Method: PUT

## Running the Project Locally

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd your-project-name
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables in a `.env` file with the keys provided above.

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and go to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Screenshots


![Screenshot 2024-05-18 063638](https://github.com/Sudipta638/stockmanager/assets/124155704/9f06c6b1-4858-4df6-a462-64c5744282ca)

![Screenshot 2024-05-18 063703](https://github.com/Sudipta638/stockmanager/assets/124155704/fbe22849-d2ce-4e94-80e4-8931d44a8985)

![Screenshot 2024-05-18 063715](https://github.com/Sudipta638/stockmanager/assets/124155704/1289248d-1cfc-41e0-b7e3-1124ac805189)
![Screenshot 2024-05-18 063827](https://github.com/Sudipta638/stockmanager/assets/124155704/e71adf9e-7506-4451-a78f-0ab6c9256259)
![Screenshot 2024-05-18 063847](https://github.com/Sudipta638/stockmanager/assets/124155704/b8d90906-499e-405a-9805-b60b2cafc8a7)
![Screenshot 2024-05-18 063923](https://github.com/Sudipta638/stockmanager/assets/124155704/00b88858-9845-41ab-86ce-882c0feb5cf9)

![Screenshot 2024-05-18 063958](https://github.com/Sudipta638/stockmanager/assets/124155704/1923b63b-df75-4d65-a708-cff1441cde5d)
![Screenshot 2024-05-18 074221](https://github.com/Sudipta638/stockmanager/assets/124155704/4a9c56ff-f8b0-427c-bf12-49fa0652ca68)
![Screenshot 2024-05-18 080318](https://github.com/Sudipta638/stockmanager/assets/124155704/0a8b0754-7a5e-4af7-89c9-bab76d48d8b7)
![Screenshot 2024-05-18 080333](https://github.com/Sudipta638/stockmanager/assets/124155704/616ced64-89a7-4a4b-9ca5-c6d839f93eeb)
![Screenshot 2024-05-18 080341](https://github.com/Sudipta638/stockmanager/assets/124155704/0dc4c1fe-07b1-4ba1-8bf1-717766442f0d)
![Screenshot 2024-05-18 080413](https://github.com/Sudipta638/stockmanager/assets/124155704/54f9baee-e5b0-49fe-b4c6-6231f9d42c98)
![Screenshot 2024-05-18 080429](https://github.com/Sudipta638/stockmanager/assets/124155704/3b76d925-cd76-4362-b70f-31b106dace3b)
![Screenshot 2024-05-18 080516](https://github.com/Sudipta638/stockmanager/assets/124155704/c9800e00-578e-4ea5-8fc8-46adbc6ab5ac)
![Screenshot 2024-05-18 080700](https://github.com/Sudipta638/stockmanager/assets/124155704/0f47a835-6972-4f43-9dd5-92eb43103b4a)


## API Key

The API key used in this project is obtained from [Alpha Vantage](https://www.alphavantage.co/documentation/). You encounter any issues due to the API key limit so use demo key

## Getting Webhook Secret

The `WEBHOOK_SECRET` can be obtained after deployment by entering the endpoint and retrieving the secret from Clerk's dashboard.

## Contributions

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

For more information, feel free to contact the project maintainer or visit the [Clerk documentation](https://clerk.dev/docs).
