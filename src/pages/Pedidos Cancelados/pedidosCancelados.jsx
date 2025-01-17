import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  FaPenToSquare,
  FaPlus,
  FaTrashCan,
  FaFileExport,
  FaTrash,
} from "react-icons/fa6";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import * as XLSX from "xlsx";
import SideBarPage from "../../components/Sidebar/SideBarPage";

const PedidosCancelados = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [vendas, setVendas] = useState([]);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalGestao, setShowModalGestao] = useState(false);
  const [Clientes, setClientes] = useState([]);
  const [selectedVenda, setSelectedVenda] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de pesquisa

  const handleShowGestao = () => setShowModalGestao(true);
  const handleCloseGestao = () => setShowModalGestao(false);
  const handleShowInfo = (venda) => {
    setSelectedVenda(venda);
    setShowModalInfo(true);
  };
  const handleCloseInfo = () => setShowModalInfo(false);

  // Função para verificar o token
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get("/api/ServerTwo/verifyToken", {
          withCredentials: true,
        });
        if (typeof response.data.token === "string") {
          const decodedToken = jwtDecode(response.data.token);
          setUserInfo(decodedToken);
        } else {
          console.error("Token não é uma string:", response.data.token);
          navigate("/");
        }
      } catch (error) {
        console.error("Token inválido", error);
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);

  // Função para carregar vendas do banco de dados
  useEffect(() => {
    if (userInfo && userInfo.id_EmpresaDb) {
      fetchVendas(userInfo.id_EmpresaDb);
    }
  }, [userInfo]);

  const fetchVendas = async (id) => {
    try {
      const response = await axios.get(`/api/ServerOne/PedidosCancelados/${id}`, {
        withCredentials: true,
      });
      setVendas(response.data.InfoTabela);
    } catch (error) {
      console.error("Erro ao carregar vendas", error);
    }
  };

  // Filtro dos produtos
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Atualiza o termo de pesquisa
  };

  const filteredvenda = vendas.filter(
    (venda) =>
      venda.nome_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(venda.id_pedido).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para exportar dados para Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(vendas); // Converte os dados de vendas em uma planilha
    const wb = XLSX.utils.book_new(); // Cria um novo livro de trabalho
    XLSX.utils.book_append_sheet(wb, ws, "venda"); // Adiciona a planilha ao livro
    XLSX.writeFile(wb, `venda_${new Date().toLocaleDateString()}.xlsx`);
  };

  return (
    <SideBarPage>
      <main>
        <div className="main-title">
          <h3>Gestão de Pedidos</h3>
        </div>

        <div className="scroll-despesas">
          <div className="Button_Cad">
            <button onClick={exportToExcel}>
              Exportar
              <FaFileExport />
            </button>
          </div>
          {/* Input de pesquisa */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "350px",
            }}
          >
            <BsSearch
              style={{ marginLeft: "10px", color: "#888", fontSize: "18px" }}
            />
            <input
              type="text"
              placeholder="Pesquisar clientes"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid #fff",
                padding: "12px",
                fontSize: "16px",
                width: "300px",
                outline: "none",
                transition: "border-color 0.3s",
                paddingLeft: "10px",
              }}
            />
          </div>
          <div className="Gestao-List">
            <table>
              <caption>Pedidos Cancelados</caption>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Cliente</th>

                  <th>Preço Final</th>
                  <th>Status</th>
                  <th>Info.</th>
                </tr>
              </thead>
              <tbody>
                {filteredvenda.map((venda) => (
                  <tr key={venda.id_pedido}>
                    <td>{venda.id_pedido}</td>
                    <td>{venda.nome_cliente}</td>
                    <td>{venda.total}</td>
                    <td>{venda.Status}</td>
                    <td>
                      <button
                        className="btn-ver-mais"
                        onClick={() => handleShowInfo(venda)}
                      >
                        Ver Mais
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal para informações da venda */}
          <Modal
            style={{
              position: "fixed",
              top: "50%",
              left: "55%",
              transform: "translate(-50%, -50%)",
              width: "48%",
              padding: "40px",
              height: 370,
              borderRadius: 10,
              background: "#fff",
              boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.6)",
              border: "#000000d1",
            }}
            show={showModalInfo}
            onHide={handleCloseInfo}
          >
            <Modal.Header closeButton>
              <Modal.Title className="title-modal">
                Informações da Venda
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedVenda ? (
                <div>
                  <h4 className="h4-modal">
                    Pedido para: {selectedVenda.nome_cliente}
                  </h4>
                  <div className="textos-modal">
                    <p>Código do pedido: {selectedVenda.id_pedido}</p>
                    <p>Cliente: {selectedVenda.nome_cliente}</p>
                    <p>Vendedor: {selectedVenda.vendedor}</p>
                    <p>Desconto: {selectedVenda.desconto}</p>
                    <p>Preço Final: {selectedVenda.total}</p>
                  </div>
                </div>
              ) : (
                <p>Não há informações disponíveis.</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseInfo}
                className="btn-fechar-modal"
              >
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </main>
    </SideBarPage>
  );
};

export default PedidosCancelados;