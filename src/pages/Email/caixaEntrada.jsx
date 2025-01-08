import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { RiInboxUnarchiveFill, RiInboxArchiveFill } from "react-icons/ri";
import SideBarPage from "../../components/Sidebar/SideBarPage";
// Componentes
import EmailPopup from "./popupemail";
import { converterDataHora } from "../../utils/dateUtils";
import LogoVenturo from "../../images/LogoVenturoBlackV.png";
import "./caixaEntradaSaida.css";

const Caixa_Entrada = () => {
  const navigate = useNavigate();
  const [emails] = useState([
    {
      id: 1,
      Remetente: "remetente1@example.com",
      Assunto: "Assunto do email 1",
      Mensagem: "Conteúdo do e-mail 1",
      Arquivo: "documento1.pdf",
      TimeStamp: "2025-01-08T12:00:00Z",
      View: 0,
    },
    {
      id: 2,
      Remetente: "remetente2@example.com",
      Assunto: "Assunto do email 2",
      Mensagem: "Conteúdo do e-mail 2",
      Arquivo: null,
      TimeStamp: "2025-01-07T10:00:00Z",
      View: 1,
    },
    // Adicione mais e-mails conforme necessário
  ]);
  const [openedEmailId, setOpenedEmailId] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("entrada");

  const toggleEmail = (id) => {
    setOpenedEmailId(openedEmailId === id ? null : id);
  };

  const renderEmails = () => (
    <div className="email-list">
      {emails.length > 0 ? (
        emails
          .sort((a, b) => new Date(b.TimeStamp) - new Date(a.TimeStamp))
          .map((email) => (
            <div
              key={email.id}
              className={`email-item ${email.View === 0 ? "unread" : ""}`}
            >
              <div
                className="email-header"
                onClick={() => toggleEmail(email.id)}
              >
                <div className="coluna">
                  {email.View === 0 && (
                    <span className="unread-icon">
                      <div className="dot"></div>
                    </span>
                  )}
                  {!email.Assunto ? (
                    <h3>Sem assunto, enviado por {email.Remetente}</h3>
                  ) : (
                    <h3>
                      {email.Assunto}, enviado por {email.Remetente}
                    </h3>
                  )}
                </div>

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
                  <button className="btn-voltar">Excluir</button>{" "}
                </div>
              )}
            </div>
          ))
      ) : (
        <div className="mensagem-sem-envio">Não há mensagens para você</div>
      )}
    </div>
  );

  return (
    <SideBarPage>
      <div className="scroll-despesas">
        <div className="app">
          <div className="titleEmail">
            <div className="TextAssunt">
              <h1 className="Assunto">
                E-mail: Caixa de Entrada{" "}
                <RiInboxArchiveFill
                  style={{
                    height: 35,
                    width: 35,
                    position: "relative",
                    top: 10,
                  }}
                />
              </h1>
            </div>
            <div>
              <img src={LogoVenturo} className="LogoEmail" />
            </div>
          </div>

          <div className="alinhar-divs">
            <div className="buttonsEntrada">
              <button
                className="btn-mensagem"
                onClick={() => setPopupOpen(true)}
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
                className={`btn-caixas ${activeButton === "s" ? "active" : ""}`}
                onClick={() => {
                  setActiveButton("entrada");
                  navigate("/email_saida");
                }}
              >
                <RiInboxUnarchiveFill style={{ height: 18, width: 18 }} /> Caixa
                de saída
              </button>

              {isPopupOpen && (
                <EmailPopup onClose={() => setPopupOpen(false)} />
              )}
            </div>

            <div className="Conteudo">{renderEmails()}</div>
          </div>
        </div>
      </div>
    </SideBarPage>
  );
};

export default Caixa_Entrada;
