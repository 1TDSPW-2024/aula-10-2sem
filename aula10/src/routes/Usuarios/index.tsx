import { useEffect, useState } from "react";
import { TipoUsuario } from "../../types";
import { Link } from "react-router-dom";

export default function Usuarios() {
  //MUDANDO O TÍTULO DA PÁGINA!!!
  document.title = "Usuarios";
  // const [usuario, setUsuario] = useState({
  //   login: "",
  //   avatar_url:""
  // });

  const [usuarios, setUsuarios] = useState<TipoUsuario[]>([
    {id:0,
      login: "",
      avatar_url: "",
    },
  ]);

  useEffect(() => {
    //Criando uma requisição asincrona para a api do githuh com async e await com função anonima.
    async function carregarUsuarios() {
      try {
        const response = await fetch("https://api.github.com/users");
        if (!response.ok) {
          throw new Error("Ocorreu um erro ao receber os dados");
        }
        const dados = await response.json();
        setUsuarios(dados);
      } catch (err) {
        console.log(err);
      }
    }

    carregarUsuarios();
    }, []);


  return (
    <div>
      <h1>Bem Vindo!</h1>
      <ul>
      {usuarios.map((u) => (
        <li key={u.id}><Link to={`/user/${u.login}`}>{u.login} - <img style={{width:"2%"}} src={u.avatar_url} alt={u.login}/></Link></li>
      ))}
      </ul>
    </div>
  );
}
