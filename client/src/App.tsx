import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";

function App() {
  const { store } = useContext(Context);

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  const getUser = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (store.isLoading) {
    return <h2>Loading...</h2>;
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <div className="App">
      <h1>
        {store.isAuth ? `Пользователь авторизован ${store.user.email}` : "АВТОРИЗУЙТЕСЬ"}
      </h1>
      <h2>{store.user.isActivated ? "Аккаунт подтвержден" : "Подтвердите аккаунт!"}</h2>
      <button onClick={() => store.logout()}>Logout</button>
      <button onClick={() => getUser()}>Get users</button>
      <ul>
        {users.map((user) => (
          <li key={user.email}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default observer(App);
