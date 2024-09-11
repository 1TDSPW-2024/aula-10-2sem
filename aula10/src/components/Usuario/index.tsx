import { useEffect, useState } from "react";
import { TipoUsuario } from "../../types";

export default function Usuario() {
  //MUDANDO O TÍTULO DA PÁGINA!!!
  document.title = "Usuarios";

  const [usuario, setUsuario] = useState<TipoUsuario & { login: string }>({
    id: 0,
    nome: "",
    avatar_url: "",
    login: "",
  });

  useEffect(() => {
    //Criando uma requisição asincrona para a api do githuh com async e await com função anonima.
    async function carregarUsuarios() {
      try {
        const response = await fetch("https://api.github.com/users");
        if (!response.ok) {
          throw new Error("Ocorreu um erro ao receber os dados");
        }
        const dados = await response.json();
        setUsuario(dados);
      } catch (err) {
        console.log(err);
      }
    }

    carregarUsuarios();
  }, []);

  return (
    <div>
      <h1>Bem Vindo!</h1> (
      <div>
        <h2>{usuario.login}</h2>
        <img src={usuario.avatar_url} alt={usuario.login} />
      </div>
      )
    </div>
  );
}
