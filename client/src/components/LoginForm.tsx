import { useContext, useState } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { store } = useContext(Context);

  return (
    <div>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <button type="button" onClick={() => store.login(email, password)}>
          Login
        </button>
        <button type="button" onClick={() => store.registration(email, password)}>
          Register
        </button>
      </form>
    </div>
  );
};

export default observer(LoginForm);
