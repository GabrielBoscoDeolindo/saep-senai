import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/register/", {
        username,
        password,
      });
      const proceed = window.confirm("Cadastro realizado com sucesso! Deseja ir para a tela de login?");
      if (proceed) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Erro ao registrar:", err);
    }
  };

  return (
    <div className="flex">
      <aside className="bg-charcoal w-[1024px] h-[1024px]"></aside>

      <main className="w-full bg-background">


        <section className="flex flex-col items-center gap-5 mt-10">
          <h1 className="text-charcoal text-[36px] font-semibold">
            Cadastre-se na SmartCity
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-charcoal font-semibold text-[20px]">
              Nome de usuário:
            </label>
            <input
              type="text"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border border-black rounded-[5px] px-4 py-3 bg-white w-[491px]"
            />

            <label className="text-charcoal font-semibold text-[20px]">
              Matrícula:
            </label>
            <input
              type="password"
              placeholder="Matrícula"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-black rounded-[5px] px-4 py-3 bg-white w-[491px]"
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-charcoal text-white font-semibold rounded-[50px] w-[300px] py-3 cursor-pointer hover:bg-[#272d36]"
              >
                CADASTRAR
              </button>
            </div>
          </form>

          <footer>
            <Link to="/" className="text-charcoal underline text-[20px]">
              Já possui uma conta? Entre aqui
            </Link>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default Register;