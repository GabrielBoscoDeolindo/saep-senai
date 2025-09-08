import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

import BlockPuzzleGame from "./Tetris"; 

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:8000/register/", {
        username,
        email,
        password,
      });
      const proceed = window.confirm(
        "Cadastro realizado com sucesso! Deseja ir para a tela de login?"
      );
      if (proceed) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Erro ao registrar:", err.response?.data);
      setError("Falha no cadastro. Verifique se o usuário ou e-mail já existem.");
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-black">
      
      {/* Container do Formulário */}
      <main className="w-1/2 flex justify-center items-center">
        <section className="flex flex-col items-center gap-5">
          <h1 className="text-charcoal text-[2.25rem] font-semibold">
            Cadastre-se 
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
              E-mail:
            </label>
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-black rounded-[0.3125rem] px-4 py-3 bg-white w-[30.6875rem]"
            />

            <label className="text-charcoal font-semibold text-[1.25rem]">
              Senha:
            </label>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-black rounded-[0.3125rem] px-4 py-3 bg-white w-[30.6875rem]"
            />
            
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-charcoal text-white font-semibold rounded-[3.125rem] w-[18.75rem] py-3 cursor-pointer hover:bg-[#272d36]"
              >
                CADASTRAR
              </button>
            </div>
          </form>

          <footer>
            <Link to="/login" className="text-charcoal underline text-[1.25rem] mt-4 inline-block">
              Já possui uma conta? Entre aqui
            </Link>
          </footer>
        </section>
      </main>

      <aside className="w-1/2 flex justify-center items-center">
        <BlockPuzzleGame />
      </aside>

    </div>
  );
}

export default Register;