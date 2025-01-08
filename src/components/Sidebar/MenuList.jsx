import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { StockOutlined, AreaChartOutlined } from "@ant-design/icons";
import { MdLogout, MdOutlineMailOutline, MdLocalAtm } from "react-icons/md";
import { IoPieChartSharp } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { RiContactsBook3Fill } from "react-icons/ri";
import { BsPeopleFill } from "react-icons/bs";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const MenuList = ({ darkTheme }) => {
  const navigate = useNavigate();

  // Simulação de um usuário (Remover qualquer parte de back-end ou autenticação)
  const [userInfo, setUserInfo] = useState({
    TypeUser: "Gestor", // Tipo de usuário (Simulado)
    Status: "OK", // Status do usuário (Simulado)
  });

  const items = [
    {
      key: "dashboard",
      icon: <IoPieChartSharp />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "dashboardAdmin",
      icon: <IoPieChartSharp />,
      label: <Link to="/dashboardAdmin">Dashboard</Link>,
    },
    {
      key: "email",
      icon: <MdOutlineMailOutline />,
      label: <Link to="/email_entrada">E-mail</Link>,
    },
    {
      key: "perfil",
      icon: <RxAvatar />,
      label: <Link to="/perfil_user">Perfil</Link>,
    },
    {
      key: "logs",
      icon: <RiContactsBook3Fill />,
      label: <Link to="/logsEmpresa">Logs</Link>,
    },
    {
      key: "funcionario",
      icon: <BsPeopleFill />,
      label: "Funcionários",
      children: [
        {
          key: "cad_funcionario",
          label: <Link to="/funcionarios"> Cadastrar Funcionários </Link>,
        },
        {
          key: "AtualizarSenha",
          label: <Link to="/AtualizarSenha"> Atualizar Senha </Link>,
        },
      ],
    },
    {
      key: "estoque",
      icon: <StockOutlined />,
      label: "Estoque",
      children: [
        {
          key: "reg_produto",
          label: <Link to="/cad_produtos"> Registrar Produto</Link>,
        },
      ],
    },
    {
      key: "financeiro",
      icon: <FaMoneyBillTrendUp />,
      label: "Financeiro",
      children: [
        {
          key: "contas_a_pagar",
          label: "Contas à pagar",
          children: [
            { key: "despesas", label: <Link to="/despesas"> Despesas </Link> },
            {
              key: "fornecedores",
              label: <Link to="/fornecedores"> Fornecedores </Link>,
            },
            {
              key: "pagamentos",
              label: <Link to="/pagamentos"> Pagamentos</Link>,
            },
          ],
        },
        {
          key: "contas_a_receber",
          label: "Contas à receber",
          children: [
            {
              key: "fluxo_de_caixa",
              label: <Link to="/fluxoCaixa"> Fluxo de Caixa</Link>,
            },
            { key: "receitas", label: <Link to="/receitas"> Receitas </Link> },
          ],
        },
        {
          key: "plano_conta",
          label: "Plano conta",
          children: [
            { key: "razao", label: <Link to="/razao">Livro Razão</Link> },
          ],
        },
      ],
    },
    {
      key: "vendas",
      icon: <AreaChartOutlined />,
      label: "Vendas",
      children: [
        {
          key: "notas_fiscais",
          label: <Link to="/notafiscal">Notas Fiscais</Link>,
        },
        { key: "clientes", label: <Link to="/clientes"> Clientes </Link> },
        {
          key: "gestao_de_pedidos",
          label: <Link to="/gestaoVendas"> Gestão de Pedidos </Link>,
        },
        {
          key: "pedidos_cancelados",
          label: <Link to="/pedidoscancelados"> Pedidos Cancelados </Link>,
        },
        {
          key: "historico_de_vendas",
          label: <Link to="/histVendas">Histórico de Vendas</Link>,
        },
        { key: "caixa", label: <Link to="/caixa"> Caixa </Link> },
      ],
    },
    {
      key: "Logout",
      icon: <MdLogout />,
      label: "Logout",
      onClick: () => navigate("/logout"),
    },
  ];

  const menuAccess = {
    SuperAdmin: ["dashboardAdmin", "email", "perfil", "logs", "Logout"],
    Gestor: [
      "dashboard",
      "email",
      "perfil",
      "logs",
      "financeiro",
      "estoque",
      "funcionario",
      "vendas",
      "Logout",
    ],
    Gerente: ["logs", "funcionario", "vendas", "email", "perfil", "Logout"],
    // Outros tipos de usuário podem ser adicionados aqui
  };

  const filteredItems = items.filter((item) => {
    const userRole = userInfo?.TypeUser; // Papel do usuário

    return (
      menuAccess[userRole]?.includes(item.key) ||
      (item.children &&
        item.children.some((child) =>
          menuAccess[userRole]?.includes(child.key)
        ))
    );
  });

  return (
    <Menu theme={darkTheme ? "dark" : "light"} className="SideBar-Menu-Bar">
      {filteredItems.map((item) =>
        item.children ? (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {item.children.map((child) => (
              <Menu.Item key={child.key}>{child.label}</Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
            {item.label}
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

export default MenuList;
