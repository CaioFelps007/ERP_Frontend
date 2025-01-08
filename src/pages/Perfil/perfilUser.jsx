import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./perfilUser.css";
import SideBarPage from "../../components/Sidebar/SideBarPage";

const Perfil = () => {
  const navigate = useNavigate();
  const [userInfo] = useState({
    id_user: "12345",
    Nome_user: "João Silva",
    Email: "joao.silva@example.com",
    TypeUser: "Financeiro",
    id_EmpresaDb: "1",
  });

  const Body = () => {
    if (userInfo) {
      if (userInfo.TypeUser === "SuperAdmin") {
        return (
          <div className="perfil-body">
            <div className="perfil-info">
              <p className="perfil-id">ID: {userInfo.id_user}</p>
              <p className="perfil-nome">Nome: {userInfo.Nome_user}</p>
              <p className="perfil-email">E-mail: {userInfo.Email}</p>
            </div>
          </div>
        );
      } else if (
        userInfo.TypeUser === "Financeiro" ||
        "Estoque" ||
        "Venda" ||
        "Socio" ||
        "Gerente" ||
        "Gestor"
      ) {
        return (
          <div className="perfil-body">
            <footer>
              <div className="perfil-details">
                <div className="perfil-summary">
                  {!userInfo.id_EmpresaDb ? (
                    <div>Vazio</div>
                  ) : (
                    <img
                      src={`/api/ServerOne/uploads/Logo/${userInfo.id_EmpresaDb}.jpeg`}
                      className="LogoEmpresa-Img-DBAdmin"
                      alt="Logo da Empresa"
                    />
                  )}
                </div>
                <div className="Perfil-Dados">
                  <h2 className="Perfil-Empresa">Dados do Perfil</h2>
                  <p className="perfil-id">ID: {userInfo.id_user}</p>
                  <p className="perfil-nome">Nome: {userInfo.Nome_user}</p>
                  <p className="perfil-email">E-mail: {userInfo.Email}</p>
                  <p> Função: {userInfo.TypeUser}</p>
                </div>
              </div>
            </footer>
          </div>
        );
      }
    } else {
      return <p>Carregando...</p>;
    }
  };

  return (
    <SideBarPage>
      <div className="perfil-container">
        <h1 className="perfil-header">Perfil</h1>
        <Body />
      </div>
    </SideBarPage>
  );
};

export default Perfil;
