import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBarPage from "../../components/Sidebar/SideBarPage";
import { formatarData, converterDataHora } from "../../utils/dateUtils"; // Mantenha a importação dos utilitários de data

function LogsEmpresa() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(""); // Dados do usuário (estáticos)
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [logs, setLogs] = useState([]); // Logs simulados
  const [years, setYears] = useState([2022, 2023, 2024]); // Anos estáticos
  const [months, setMonths] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); // Meses estáticos
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3); // Exemplo de 3 páginas

  useEffect(() => {
    // Dados do usuário estáticos (remover a chamada de back-end)
    setUserInfo({
      id_user: "12345",
      Nome_user: "João Silva",
      Email: "joao.silva@example.com",
    });
  }, []);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      // Logs simulados (substituindo chamada axios por dados estáticos)
      setLogs([
        {
          id: 1,
          user_id: "123",
          user_name: "João Silva",
          action: "Login",
          timestamp: "2023-12-01T10:00:00Z",
        },
        {
          id: 2,
          user_id: "124",
          user_name: "Maria Oliveira",
          action: "Logout",
          timestamp: "2023-12-01T11:00:00Z",
        },
      ]);
    }
  }, [selectedYear, selectedMonth, currentPage]);

  // Função para converter número do mês para nome
  const getMonthName = (monthNumber) => {
    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return monthNames[monthNumber - 1] || "Mês Desconhecido";
  };

  return (
    <SideBarPage>
      <div className="logs-admin">
        <div className="titleLogsAdm">
          <h3>Logs</h3>
        </div>

        <div className="direction-align">
          <div className="logAdm-table">
            <div className="buttonsSelector">
              {/* Botões de Ano à Lateral */}
              <div className="year-selector">
                <h5 className="titleYear-Month">Anos</h5>
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={year === selectedYear ? "selected" : ""}
                  >
                    {year}
                  </button>
                ))}
              </div>

              {/* Botões de Mês - Posicionados Acima da Tabela */}
              {selectedYear && (
                <div className={`month-selector ${months ? "show" : "hide"}`}>
                  <h5 className="titleYear-Month">Meses</h5>
                  {months.map((month) => (
                    <button
                      key={month}
                      onClick={() => setSelectedMonth(month)}
                      className={month === selectedMonth ? "selected" : ""}
                    >
                      {getMonthName(month)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tabela de Logs */}
            <table>
              <thead>
                <tr>
                  <th>ID do usuário</th>
                  <th>Nome do usuário</th>
                  <th>Ação</th>
                  <th>Data e horário</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.user_id}</td>
                    <td>{log.user_name}</td>
                    <td>{log.action}</td>
                    <td>{converterDataHora(log.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Paginação */}
            <div className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SideBarPage>
  );
}

export default LogsEmpresa;
