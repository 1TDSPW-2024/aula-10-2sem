import { useEffect, useState} from "react";
import { TipoUsuario } from "../../types";
import { useParams } from "react-router-dom";

export default function Usuario() {
  //MUDANDO O TÍTULO DA PÁGINA!!!
  document.title = "Usuarios";

  const{login} = useParams();

  const [usuario, setUsuario] = useState<TipoUsuario>({
    id: 0,
    login: "",
    avatar_url:""
  });

  useEffect(() => {
    //Criando uma requisição asincrona para a api do githuh com async e await com função anonima.
    async function carregarUsuarios() {
      try {
        const response = await fetch("https://api.github.com/users/"+login);
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
      <h1>Bem Vindo!</h1>
       <div key={usuario.login}>
          <h2>{usuario.login}</h2>
          <img src={usuario.avatar_url} alt={usuario.login} />
        </div>
     
    </div>
  );
}
