import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/login/", {
        username,
        password,
      });

      const { access, refresh } = response.data;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refresh_token", refresh);
      navigate("/home");

    } catch (err) {
      console.error("Erro no login:", err);
      setError("Nome de usuário ou senha incorretos.");
    }
  };

  return (
    <div className="flex">

      <main className="w-full bg-background">
        <header className="flex justify-end">
        </header>

        <section className="flex flex-col items-center gap-5 mt-10">
          <h1 className="text-charcoal text-[2.25rem] font-semibold">
            Entre na sua conta
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-charcoal font-semibold text-[1.25rem]">
              Nome de usuário:
            </label>
            <input
              type="text"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border border-black rounded-[0.3125rem] px-4 py-3 bg-white w-[30.6875rem]"
            />

            <label className="text-charcoal font-semibold text-[1.25rem]">
              Senha:
            </label>
            <input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-black rounded-[0.3125rem] px-4 py-3 bg-white w-[30.6875rem]"
            />
            
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-charcoal text-white font-semibold rounded-[3.125rem] w-[18.75rem] py-3 cursor-pointer hover:bg-[#272d36]"
              >
                ENTRAR
              </button>
            </div>
          </form>

          <footer>
            <Link to="/cadastro" className="text-charcoal underline text-[1.25rem]">
              Não possui uma conta? Se cadastre aqui!
            </Link>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default Login;