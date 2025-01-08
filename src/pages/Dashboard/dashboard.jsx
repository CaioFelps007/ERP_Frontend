import React, { useState } from "react";
import "./dashboard.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import {
  BsFillArchiveFill,
  BsPeopleFill,
  BsFillBellFill,
  BsListCheck,
} from "react-icons/bs";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Sector,
  Cell,
} from "recharts";
import SideBarPage from "../../components/Sidebar/SideBarPage";

// Dados de exemplo aleatórios para os gráficos
const fluxoCaixaExemplo = [
  { name: "Jan", fluxoCaixa: 4000, receitas: 2400, despesas: 2400 },
  { name: "Feb", fluxoCaixa: 3000, receitas: 1398, despesas: 2210 },
  { name: "Mar", fluxoCaixa: 2000, receitas: 9800, despesas: 2290 },
  { name: "Apr", fluxoCaixa: 2780, receitas: 3908, despesas: 2000 },
  { name: "May", fluxoCaixa: 1890, receitas: 4800, despesas: 2181 },
  { name: "Jun", fluxoCaixa: 2390, receitas: 3800, despesas: 2500 },
  { name: "Jul", fluxoCaixa: 3490, receitas: 4300, despesas: 2100 },
];

const typeUserDataExemplo = [
  { name: "Ativos", value: 50 },
  { name: "Inativos", value: 30 },
  { name: "Em licença", value: 20 },
];

const RADIAN = Math.PI / 180;

// Função de renderização personalizada para o gráfico de pizza
const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {payload.value}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        Funcionários
      </text>
    </g>
  );
};

function Home() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({ Nome_user: "Usuário Exemplo" }); // Exemplo de nome de usuário
  const [SelectedTotalEstoque, setSelectedTotalEstoque] = useState(120); // Exemplo de total de itens no estoque
  const [SelectedTotalFuncionario, setSelectedTotalFuncionario] = useState(50); // Exemplo de total de funcionários
  const [SelectedTotalVenda, setSelectedTotalVenda] = useState(200); // Exemplo de total de vendas
  const [SelectedTotalLogs, setSelectedTotalLogs] = useState(5); // Exemplo de total de logs
  const [activeIndex, setActiveIndex] = useState(0);

  // Array de cores
  const COLORS_GRAFICO = [
    "#FF8042",
    "#00C49F",
    "#FFBB28",
    "#0088FE",
    "#FF00FF",
    "#40E0D0",
  ];

  return (
    <SideBarPage>
      <main>
        <div>
          <div className="main-title">
            <h3>DASHBOARD - BEM VINDO {userInfo.Nome_user}</h3>
          </div>

          <div className="scroll-despesas">
            <div className="main-cards">
              <div className="card">
                <div className="card-inner">
                  <h3>ITENS DE ESTOQUE</h3>
                  <BsFillArchiveFill className="card_icon" />
                </div>
                <h1>{SelectedTotalEstoque}</h1>
              </div>
              <div className="card">
                <div className="card-inner">
                  <h3>VENDAS</h3>
                  <BsListCheck className="card_icon" />
                </div>
                <h1>{SelectedTotalVenda}</h1>
              </div>
              <div className="card">
                <div className="card-inner">
                  <h3>FUNCIONÁRIOS</h3>
                  <BsPeopleFill className="card_icon" />
                </div>
                <h1>{SelectedTotalFuncionario}</h1>
              </div>
              <div className="card">
                <div className="card-inner">
                  <h3>ALTERAÇÕES</h3>
                  <BsFillBellFill className="card_icon" />
                </div>
                <h1>{SelectedTotalLogs}</h1>
              </div>
            </div>

            <div className="graficosDashboard">
              <div className="charts">
                <ResponsiveContainer width="100%" height={300}>
                  <h3 style={{ textAlign: "center" }}>Panorama Financeiro</h3>
                  <LineChart data={fluxoCaixaExemplo}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="fluxoCaixa"
                      stroke="#ffd700"
                      name="Lucro"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="receitas"
                      stroke="#82ca9d"
                      name="Receitas"
                    />
                    <Line
                      type="monotone"
                      dataKey="despesas"
                      stroke="#FF0000"
                      name="Despesas"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="charts">
                <ResponsiveContainer width="100%" height={300}>
                  <h3 style={{ textAlign: "center" }}>Funcionários</h3>
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={typeUserDataExemplo} // Passa os dados formatados para o gráfico
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={(_, index) => setActiveIndex(index)} // Atualiza o estado ao passar o mouse
                    >
                      {typeUserDataExemplo.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS_GRAFICO[index % COLORS_GRAFICO.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </main>
    </SideBarPage>
  );
}

export default Home;
