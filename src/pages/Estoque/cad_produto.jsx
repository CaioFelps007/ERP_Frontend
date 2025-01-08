import React, { useState, useEffect } from "react";
import { FaFileExport } from "react-icons/fa";
import "./cad_produto.css";
import { BsSearch } from "react-icons/bs";
import { FaPenToSquare, FaPlus } from "react-icons/fa6";
import { Button, Modal } from "react-bootstrap";
import SideBarPage from "../../components/Sidebar/SideBarPage";
import * as XLSX from "xlsx"; // Adiciona a importação da biblioteca xlsx

function RegistroProduto() {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ProductsEstoque, setSelectedEstoque] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de pesquisa
  const [RegisterProdutos, setRegisterProdutos] = useState({
    Nome: "",
    Quantidade: "",
    ValorUnitario: "",
    Fornecedor: "",
    Tamanho: "",
    Imagem: null,
    Estoque: "0",
    autorizados: [], // Inicializando como array
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleShowInfo = (product) => {
    setSelectedProduct(product);
    setShowModalInfo(true);
  };

  const handleCloseInfo = () => setShowModalInfo(false);

  const handleShowEdit = (product) => {
    setSelectedProduct(product);
    setRegisterProdutos({
      Nome: product.Nome,
      Quantidade: product.Quantidade,
      ValorUnitario: product.ValorUnitario,
      Fornecedor: product.Fornecedor,
      Tamanho: product.Tamanho,
      Imagem: null,
      Estoque: "0",
      autorizados: [], // Adicionar se necessário
    });
    setShowModalEdit(true);
  };

  const handleCloseEdit = () => setShowModalEdit(false);

  useEffect(() => {
    // Removi a lógica de verificação de token
  }, []);

  // Filtro dos produtos
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Atualiza o termo de pesquisa
  };

  const filteredProducts = ProductsEstoque.filter(
    (product) =>
      product.Nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(product.Codigo).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue =
      name === "ValorUnitario" ? parseFloat(value).toFixed(2) : value;
    setRegisterProdutos({ ...RegisterProdutos, [name]: formattedValue });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setRegisterProdutos({ ...RegisterProdutos, [name]: e.target.files[0] });
  };

  // Função para exportar para Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(ProductsEstoque); // Converte os dados do estoque para um worksheet
    const workbook = XLSX.utils.book_new(); // Cria uma nova pasta de trabalho
    XLSX.utils.book_append_sheet(workbook, worksheet, "Produtos"); // Adiciona a planilha
    XLSX.writeFile(workbook, "produtos_estoque.xlsx"); // Gera o arquivo Excel
  };

  return (
    <SideBarPage>
      <main>
        <div className="main-title">
          <h3>Estoque</h3>
        </div>
        <div className="scroll-despesas">
          <div className="Estoque_Cad">
            <div className="Button_Cad">
              <button className="Button-Menu" onClick={handleShow}>
                Adicionar
                <FaPlus />
              </button>
              <button onClick={() => handleShowEdit(selectedProduct)}>
                Editar
                <FaPenToSquare />
              </button>
              <button className="Button-Menu" onClick={exportToExcel}>
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
                placeholder="Pesquisar produtos"
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

            <div className="Estoque_List">
              <table id="table-to-export">
                <caption>Registro de Produtos</caption>
                <thead>
                  <tr>
                    <th>Código do produto</th>
                    <th>Nome</th>
                    <th>Fornecedor</th>
                    <th>Quantidade</th>
                    <th>Valor Unitário</th>
                    <th>Info.</th>
                    <th>Selecionar</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.Codigo}</td>
                      <td>{product.Nome}</td>
                      <td>{product.Fornecedor}</td>
                      {/* Lógica para colorir a quantidade */}
                      <td>{product.Quantidade}</td>
                      <td>R$ {product.ValorUnitario}</td>
                      <td>
                        <button
                          className="Btn-Abrir"
                          onClick={() => handleShowInfo(product)}
                        >
                          Abrir
                        </button>
                      </td>
                      <td>
                        <label className="custom-radio">
                          <input
                            type="radio"
                            name="selectedProduct"
                            value={product.id}
                            onChange={() => setSelectedProduct(product)}
                          />
                          <span className="radio-checkmark"></span>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Modal de Adicionar Produto */}
          <Modal
            style={{
              position: "fixed",
              top: "50%",
              bottom: 0,
              left: "55%",
              right: 0,
              zIndex: 1000,
              padding: 40,
              borderRadius: 20,
              width: 800,
              height: 480,
              transform: "translate(-50%, -50%)",
              background: "linear-gradient(135deg, #fff, #fff)",
              boxShadow: "10px 15px 30px rgba(0, 0, 0, 0.6)",
            }}
            show={showModal}
            onHide={handleClose}
          >
            <div className="DivModalCont">
              <div className="HeaderModal">
                <h1>Registrar Produto</h1>
              </div>
              <form>
                <input
                  type="text"
                  name="Nome"
                  placeholder="Nome do produto"
                  required
                  onChange={handleChange}
                  className="Input-Modal"
                />
                <input
                  type="text"
                  name="Fornecedor"
                  placeholder="Fornecedor"
                  onChange={handleChange}
                  className="Input-Modal"
                />
                <input
                  type="number"
                  name="Quantidade"
                  placeholder="Quantidade"
                  required
                  onChange={handleChange}
                  className="Input-Modal"
                />
                <input
                  type="number"
                  name="ValorUnitario"
                  placeholder="Preço por Unidade"
                  value={RegisterProdutos.ValorUnitario}
                  onChange={handleChange}
                  className="Input-Modal"
                  required
                />
                <input
                  type="text"
                  name="Tamanho"
                  placeholder="Tamanho"
                  className="Input-Modal"
                  required
                  onChange={handleChange}
                />
                <input
                  type="file"
                  name="Imagem"
                  placeholder="Imagem do produto"
                  onChange={handleFileChange}
                />
                <div>
                  <button className="RegisterPr" type="submit">
                    Cadastrar
                  </button>
                  <button className="FecharPr" onClick={handleClose}>
                    Fechar
                  </button>
                </div>
              </form>
            </div>
          </Modal>
          {/* Modal de Edição */}
          <Modal
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              zIndex: 1000,
              width: "50%",
              height: "70%",
              borderRadius: "20px",
              transform: "translate(-50%, -50%)",
              background: "linear-gradient(135deg, #ffffff, #f7f7f7)",
              boxShadow: "10px 15px 30px rgba(0, 0, 0, 0.6)",
            }}
            show={showModalEdit}
          >
            <div className="FormsEdit">
              <div className="TitleEditProdut">
                <h1>Editar Produto</h1>
              </div>
              <div className="FormsEditProdut">
                <form>
                  <input
                    type="text"
                    name="Nome"
                    placeholder="Nome do produto"
                    value={RegisterProdutos.Nome}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="Fornecedor"
                    placeholder="Fornecedor"
                    value={RegisterProdutos.Fornecedor}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="Quantidade"
                    placeholder="Quantidade"
                    value={RegisterProdutos.Quantidade}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="ValorUnitario"
                    placeholder="Preço por Unidade"
                    value={RegisterProdutos.ValorUnitario}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="Tamanho"
                    placeholder="Tamanho"
                    value={RegisterProdutos.Tamanho}
                    onChange={handleChange}
                  />

                  <input
                    type="file"
                    name="Imagem"
                    accept="image/*"
                    onChange={handleFileChange}
                  />

                  <div className="popup-footer">
                    <button variant="primary" type="submit">
                      Salvar
                    </button>
                    <button type="button" onClick={handleCloseEdit}>
                      Fechar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
          {/* Modal de Informações do Produto */}
          <Modal
            style={{
              position: "fixed",
              top: "50%",
              bottom: 0,
              left: "58%",
              right: 0,
              zIndex: 1000,
              width: "60%",
              padding: "40px",
              height: "60%",
              borderRadius: 20,
              transform: "translate(-50%, -50%)",
              background: "linear-gradient(135deg, #fff, #fff)",
              boxShadow: "10px 15px 30px rgba(0, 0, 0, 0.6)",
            }}
            show={showModalInfo}
            onHide={handleCloseInfo}
          >
            {selectedProduct && (
              <div className="DivModalCont">
                <div className="HeaderModal">
                  <h1>Informações do Produto</h1>
                </div>
                <div className="AlinhandoInfos">
                  <div className="CorpoEtoque">
                    <h3>Nome: {selectedProduct.Nome}</h3>
                    <p>Fornecedor: {selectedProduct.Fornecedor}</p>
                    <p>Quantidade: {selectedProduct.Quantidade}</p>
                    <p>Valor Unitário: R$ {selectedProduct.ValorUnitario}</p>
                    <button onClick={handleCloseInfo} className="FecharPr">
                      {" "}
                      FECHAR{" "}
                    </button>
                  </div>

                  <div className="ImgEstoqueProduct">
                    <img
                      src={selectedProduct.Imagem ? selectedProduct.Imagem : ""}
                      className="Img-CadPro"
                    />
                  </div>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </main>
    </SideBarPage>
  );
}

export default RegistroProduto;
