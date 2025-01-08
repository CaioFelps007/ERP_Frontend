import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { RiInboxUnarchiveFill, RiInboxArchiveFill } from "react-icons/ri";
import LogoVenturo from "../../images/LogoVenturoBlackV.png";
import SideBarPage from "../../components/Sidebar/SideBarPage";
// Componentes
import EmailPopup from "./popupemail";
import { converterDataHora } from "../../utils/dateUtils";
import "./caixaEntradaSaida.css";

const Caixa_Saida = () => {
  const navigate = useNavigate();
  const [emails] = useState([
    {
      id: 1,
      Destinatario: "destinatario1@example.com",
      Assunto: "Assunto do email 1",
      Mensagem: "Conteúdo do e-mail 1",
      Arquivo: "documento1.pdf",
      TimeStamp: "2025-01-08T12:00:00Z",
    },
    {
      id: 2,
      Destinatario: "destinatario2@example.com",
      Assunto: "Assunto do email 2",
      Mensagem: "Conteúdo do e-mail 2",
      Arquivo: null,
      TimeStamp: "2025-01-07T10:00:00Z",
    },
    // Adicione mais e-mails conforme necessário
  ]);
  const [openedEmailId, setOpenedEmailId] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("saida");

  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  const toggleEmail = (id) => {
    setOpenedEmailId(openedEmailId === id ? null : id);
  };

  const excluirEmail = (id) => {
    // Simulando a exclusão do e-mail
    setEmails(emails.filter((email) => email.id !== id));
  };

  const Cards = () => (
    <div className="email-list">
      {emails.length > 0 ? (
        emails
          .sort((a, b) => new Date(b.TimeStamp) - new Date(a.TimeStamp))
          .map((email) => (
            <div key={email.id} className="email-item">
              <div
                className="email-header"
                onClick={() => toggleEmail(email.id)}
              >
                {!email.Assunto ? (
                  <h3>Sem assunto para {email.Destinatario}</h3>
                ) : (
                  <h3>
                    {email.Assunto} para {email.Destinatario}
                  </h3>
                )}
                <p className="email-timestamp">
                  {converterDataHora(email.TimeStamp)}
                </p>
              </div>
              {openedEmailId === email.id && (
                <div className="email-body">
                  <p>{email.Mensagem}</p>
                  {email.Arquivo && (
                    <a
                      href={`/uploads/Docs/${email.Arquivo}`}
                      className="email-attachment"
                    >
                      {email.Arquivo}
                    </a>
                  )}
                  <button
                    className="btn-voltar"
                    onClick={() => excluirEmail(email.id)}
                  >
                    Excluir
                  </button>{" "}
                </div>
              )}
            </div>
          ))
      ) : (
        <div className="mensagem-sem-envio">
          Você não enviou nenhuma mensagem.
        </div>
      )}
    </div>
  );

  return (
    <SideBarPage>
      <div className="scroll-despesas">
        <div className="app">
          <div className="titleEmail">
            <h1 className="Assunto">
              E-mail: Suas mensagens enviadas{" "}
              <RiInboxUnarchiveFill
                style={{ height: 35, width: 35, position: "relative", top: 10 }}
              />
            </h1>
            <img src={LogoVenturo} className="LogoEmail" />
          </div>

          <div className="alinhar-divs">
            <div className="buttonsEntrada">
              <button
                className={`btn-mensagem ${isPopupOpen ? "active" : ""}`}
                onClick={openPopup}
              >
                <FaPen style={{ height: 18, width: 18 }} /> Escrever
              </button>

              <button
                className={`btn-caixas ${
                  activeButton === "entrada" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveButton("entrada");
                  navigate("/email_entrada");
                }}
              >
                <RiInboxArchiveFill style={{ height: 18, width: 18 }} /> Caixa
                de Entrada
              </button>

              <button
                className={`btn-caixas ${
                  activeButton === "saida" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveButton("saida");
                  navigate("/email_saida");
                }}
              >
                <RiInboxUnarchiveFill style={{ height: 18, width: 18 }} /> Caixa
                de Saída
              </button>

              {isPopupOpen && <EmailPopup onClose={closePopup} />}
            </div>

            <div className="Conteudo">
              <Cards />
            </div>
          </div>
        </div>
      </div>
    </SideBarPage>
  );
};

export default Caixa_Saida;
