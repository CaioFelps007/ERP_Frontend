import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Landpage from "../pages/LandPage/landpage";
import Login from "../pages/Login/Login";
import Balancete from "../pages/Balancete/balancete";
import Home from "../pages/Dashboard/dashboard";
import HomeAdmin from "../pages/Dashboard Admin/dashboardAdmin";
import RegistroProduto from "../pages/Estoque/cad_produto";
import Error from "../pages/Error/Erros";
import Caixa_Entrada from "../pages/Email/caixaEntrada";
import Caixa_Saida from "../pages/Email/caixaSaida";
import Perfil from "../pages/Perfil/perfilUser";
import Fornecedores from "../pages/Fornecedores/fornecedores";
import Pagamentos from "../pages/Pagamentos/pagamentos";
import Cad_Empresa from "../pages/CadastrarEmpresa/cad_empresa";
import CadastroFuncionario from "../pages/Registrar Funcionário/registrarFuncionario";
import Despesas from "../pages/Despesas/despesas";
import FluxoCaixa from "../pages/Fluxo de Caixa/fluxodecaixa";
import Receitas from "../pages/Receitas/receitas";
import Dre from "../pages/Dre/dre";
import NotaFiscal from "../pages/Nota Fiscal/notafiscal";
import LanContabil from "../pages/Lançamento Contábil/lanc_contabil";
import Razao from "../pages/Razão/razao";
import Clientes from "../pages/Clientes/clientes";
import GestaoVendas from "../pages/AbasGestãoPedidos/gestaoVendas";
import Abas from "../pages/AbasGestãoPedidos/Abas";
import PedidosCancelados from "../pages/Pedidos Cancelados/pedidosCancelados";
import Caixa_Modal from "../pages/Caixa/caixa_Modal";
import Caixa_Pagamentos from "../pages/Caixa/caixa_Pagamentos";
import LogsEmpresa from "../pages/LogsSystem/LogsEmpresa";
import LogsAdmin from "../pages/LogsSystem/logsAdmin";
import AbasForUpdate from "../pages/AbasGestãoPedidos/AbasUpdate";
import Hist_vendas from "../pages/Vendas/vendas";
import Caixa from "../pages/Caixa/Caixa";
import Logout from "../components/Logout";
import VerMais from "../pages/Ver Mais/verMais";
import AtualizarSenha from "../pages/Registrar Funcionário/AtualizarSenha";

function AppRoutes() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <RouteRenderer
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
    </Router>
  );
}

function RouteRenderer() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Landpage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/error" element={<Error />} />
      <Route path="/email_entrada" element={<Caixa_Entrada />} />
      <Route path="/email_saida" element={<Caixa_Saida />} />
      <Route path="/perfil_user" element={<Perfil />} />
      <Route path="/logout" element={<Logout />} />

      <Route path="/verMais" element={<VerMais />} />
      <Route path="/balancete" element={<Balancete />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/dashboardAdmin" element={<HomeAdmin />} />
      <Route path="/cad_produtos" element={<RegistroProduto />} />
      <Route path="/fornecedores" element={<Fornecedores />} />
      <Route path="/pagamentos" element={<Pagamentos />} />
      <Route path="/cad_empresa" element={<Cad_Empresa />} />
      <Route path="/funcionarios" element={<CadastroFuncionario />} />
      <Route path="/AtualizarSenha" element={<AtualizarSenha />} />
      <Route path="/despesas" element={<Despesas />} />
      <Route path="/fluxocaixa" element={<FluxoCaixa />} />
      <Route path="/receitas" element={<Receitas />} />
      <Route path="/dre" element={<Dre />} />
      <Route path="/notafiscal" element={<NotaFiscal />} />
      <Route path="/lancontabil" element={<LanContabil />} />
      <Route path="/razao" element={<Razao />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/gestaoVendas" element={<GestaoVendas />} />
      <Route path="/histVendas" element={<Hist_vendas />} />
      <Route path="/abas" element={<Abas />} />
      <Route path="/abasUpdate" element={<AbasForUpdate />} />
      <Route path="/pedidoscancelados" element={<PedidosCancelados />} />
      <Route path="/caixa" element={<Caixa />} />
      <Route path="/caixa_modal" element={<Caixa_Modal />} />
      <Route path="/caixa_pagamentos" element={<Caixa_Pagamentos />} />
      <Route path="/logsEmpresa" element={<LogsEmpresa />} />
      <Route path="/logsAdmin" element={<LogsAdmin />} />
    </Routes>
  );
}

export default AppRoutes;
