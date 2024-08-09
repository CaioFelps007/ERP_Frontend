import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Venturo from "../../images/Venturo.png";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { CgCloseR } from "react-icons/cg";


function DashboardAdmin() {
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(null);
  const [itemStatus, setItemStatus] = useState({});
  const [userInfo, setUserInfo] = useState('');
  const [data, setData] = useState([]);

  // Função para alterar o status localmente
  const status = (id) => {
    setItemStatus((prevStatus) => ({
      ...prevStatus,
      [id]: prevStatus[id] === "Autorizado" ? "Desautorizado" : "Autorizado",
    }));
  };

  // Função para desautorizar empresa
  const Desautorizado = async (id) => {
    try {
      const response = await axios.get(`http://10.144.170.15:3001/desautorizar/${id}`, {
        withCredentials: true,
      });
      if (response) {
        alert("Empresa desautorizada. A página será recarregada.");
        window.location.reload(); // Recarrega a página
      }
    } catch (err) {
      console.error("Erro: ", err);
    }
  };

  // Função para autorizar empresa
  const Autorizado = async (id) => {
    try {
      const response = await axios.get(`http://10.144.170.15:3001/autorizar/${id}`, {
        withCredentials: true,
      });
      if (response) {
        alert("Empresa autorizada. A página será recarregada.");
        window.location.reload(); // Recarrega a página
      }
    } catch (err) {
      console.error("Erro: ", err);
    }
  };

  // Função para verificar o token
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get("http://10.144.170.15:3001/verifyToken", {
          withCredentials: true,
        });
        const decodedToken = jwtDecode(response.data.token);
        setUserInfo(decodedToken);
      } catch (error) {
        console.error("Token inválido", error);
        navigate("/");
      }
    };

    verifyToken();
  }, [navigate]);

  // Função para buscar dados das empresas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Info = await axios.get("http://10.144.170.15:3001/tableEmpresas", {
          withCredentials: true,
        });
        if (Info.status === 200) {
          const fetchedData = Info.data.InfoTabela.map((item) => ({
            id: item.id,
            subtitle: "Gestão de Empresas",
            title: item.Empresa,
            color: "#0A5483",
            status: item.Autorizado === "YES" ? "Autorizado" : "Desautorizado",
            gestor: item.Gestor,
            cnpj: item.CNPJ,
            email: item.Email,
            logo: item.Logo,
          }));
          setData(fetchedData);

          const statusMap = {};
          fetchedData.forEach((item) => {
            statusMap[item.id] = item.status;
          });
          setItemStatus(statusMap);
        }
      } catch (err) {
        console.error("Erro: ", err);
      }
    };
    fetchData();
  }, []);

  const selectedItem = data.find((item) => item.id === selectedId);

  return (
    <div className="main-container">
      <div className="intro">
        <div className="main-title">
          <h1 className="main-titulo">Bem-Vindo ao Venturo!</h1>
        </div>
        <h4 className="texto-secundario1">
          O Venturos é a solução definitiva para a gestão de recursos empresariais,
        </h4>
        <h4 className="texto-secundario2">
          projetado especialmente para atender às necessidades de super administradores
        </h4>
        <h4 className="texto-secundario3">
          como você. Explore as funcionalidades e traga mais eficiência e clareza para suas operações.
        </h4>
      </div>

      <div className="items-container">
        {data.map((item) => (
          <motion.div
            key={item.id}
            className="item-box"
            style={{ backgroundColor: item.color }}
            layoutId={item.id}
            onClick={() => setSelectedId(item.id)}
          >
            <motion.div className="div-titulos-card">
              <motion.h5>{item.subtitle}</motion.h5>
              <motion.h2>{item.title}</motion.h2>
              <motion.h6>Status: {itemStatus[item.id]}</motion.h6>
            </motion.div>
            <motion.div>
              <motion.img src={Venturo} className="logo-cards" alt="Logo do Venturo" />
            </motion.div>
          </motion.div>
        ))}

        <AnimatePresence>
          {selectedId && selectedItem && (
            <motion.div
              className="item-detail"
              layoutId={selectedId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className="div-fecharbtn">
                <motion.button
                  className="close_btn"
                  onClick={() => setSelectedId(null)}
                >
                 <CgCloseR className="icone"/>
                </motion.button>
              </motion.div>

              <motion.div className="div-statusbtn">
                <motion.h2 className="letras">{selectedItem.title}</motion.h2>
                <motion.div>
                {selectedItem.logo ? (
                  <img
                    src={`http://10.144.170.15:3001/uploads/Logo/${selectedItem.logo}`}
                    style={{ width: 100, height: 100 }}
                    alt="Logo"
                  />
                ) : (
                  <div style={{ width: 100, height: 100 }}></div>
                )}
              </motion.div>
              </motion.div>

              <details>
                <summary className="letras">Dados da empresa</summary>
                <motion.div className="div-informacoes-adicionais">
                  <motion.p className="letras"><strong>ID:</strong> {selectedItem.id}</motion.p>
                  <motion.p className="letras"><strong>Gestor:</strong> {selectedItem.gestor}</motion.p>
                  <motion.p className="letras"><strong>CNPJ:</strong> {selectedItem.cnpj}</motion.p>
                  <motion.p className="letras"><strong>Email:</strong> {selectedItem.email}</motion.p>
                </motion.div>
              </details>

              

              <motion.div className="div-dashboard-desa">
                <motion.h6 className="letras">Status: {itemStatus[selectedId]}</motion.h6>
                {itemStatus[selectedId] === "Autorizado" ? (
                  <motion.button
                  
  
  className="status-button-desautorizar"
                    onClick={() => Desautorizado(selectedId)}
                    type="button"
                  >
                    Desativar
                  </motion.button>
                ) : (
                  <motion.button
                  
  className="status-button-autorizar"
                    onClick={() => Autorizado(selectedId)}
                    type="button"
                  >
                    Autorizar
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DashboardAdmin;