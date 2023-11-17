import React, { useState } from "react";
import "./index.css";
import auth from "./img/auth.png";

enum FormField {
  Email = "email",
  Password = "password",
  Remember = "remember",
}

enum TypeInput {
  EmailInput = "email",
  TextInput = "text",
  PasswordInput = "password",
  CheckboxInput = "checkbox",
}

interface Form {
  email: string;
  password: string;
  remember: boolean;
}

function App() {
  const [formData, setFormData] = useState<Form>({
    email: "",
    password: "",
    remember: false,
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [typeInput, setTypeInput] = useState<TypeInput>(
    TypeInput.PasswordInput
  );

  const handleSetForm = (value: string | boolean, field: FormField) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleVisible = () => {
    setVisible(!visible);
    if (typeInput === TypeInput.TextInput) {
      setTypeInput(TypeInput.PasswordInput);
    } else setTypeInput(TypeInput.TextInput);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        formData,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        console.log("Server response:", json);
        setFormData((prevState) => ({
          ...prevState,
          email: "",
          password: "",
          remember: false,
        }));
      })
      .catch((error) => {
        console.error("The request failed:", error);
      });
  };

  return (
    <main>
      <div className="wrapper-basic">
        <div className="wrapper-image">
          <img src={auth} className="image-auth" alt="auth_image"></img>
        </div>
        <div className="wrapper-form">
          <form onSubmit={(e) => handleSubmit(e)}>
            <span className="title-form">Авторизуйтесь</span>
            <div className="wrapper-field">
              <input
                className="field-login"
                type={TypeInput.EmailInput}
                placeholder="Почта"
                required
                onChange={(e) => handleSetForm(e.target.value, FormField.Email)}
                value={formData.email}
              ></input>
              <div className="wrapper-password">
                <input
                  className="field-password"
                  type={typeInput}
                  placeholder="Пароль"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    handleSetForm(e.target.value, FormField.Password)
                  }
                ></input>
                <span
                  className={
                    visible ? "password-icon password-visible" : "password-icon"
                  }
                  onClick={handleVisible}
                ></span>
              </div>
            </div>
            <div className="wrapper-remember">
              <label className="label-remember">
                Запомнить меня
                <input
                  type={TypeInput.CheckboxInput}
                  className="field-remember-real"
                  checked={formData.remember}
                  onChange={() => {
                    handleSetForm(!formData.remember, FormField.Remember);
                  }}
                ></input>
                <span className="field-remember-custom"></span>
              </label>
            </div>

            <button className="submit-btn" type="submit">
              Войти
            </button>
          </form>
          <span className="forgot-login">Забыли логин или пароль?</span>
        </div>
      </div>
    </main>
  );
}

export default App;
