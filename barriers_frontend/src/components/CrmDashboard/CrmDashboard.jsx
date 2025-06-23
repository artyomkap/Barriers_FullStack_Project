import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import API from '../../api.jsx';

const COLORS = ['#007bff', '#17a2b8', '#28a745', '#ffc107', '#dc3545', '#6f42c1'];

function CrmDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get('/reports/dashboard')
      .then(res => setStats(res.data))
      .catch(() => setStats(null));
  }, []);

  if (!stats) return <div>Загрузка дашборда...</div>;

    const STATUS_LABELS = {
    new: 'Новая',
    in_progress: 'В процессе',
    completed: 'Завершена',
    cancelled: 'Отменена',
    pending: 'В ожидании',
    completed_task: 'Выполнено',
    overdue: 'Просрочено'
    };

    function getStatusLabel(status) {
    return STATUS_LABELS[status] || status;
    }

    // Применяй при построении данных:
    const dealStatusData = Object.entries(stats.deals.by_status).map(([status, value]) => ({
    name: getStatusLabel(status),
    value
    }));

    const taskStatusData = Object.entries(stats.tasks.by_status).map(([status, value]) => ({
    name: getStatusLabel(status),
    value
    }));


  // Для bar по сумме сделок
  const dealSumData = Object.entries(stats.deals.sum_by_status).map(([status, sum]) => ({
    status,
    sum
  }));

  return (
    <div>
      <h2>CRM Дашборд</h2>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 24 }}>
        <div className="stat-card">
          <h3>Клиентов</h3>
          <div className="stat-value">{stats.clients.total}</div>
        </div>
        <div className="stat-card">
          <h3>Всего сделок</h3>
          <div className="stat-value">{stats.deals.total}</div>
        </div>
        <div className="stat-card">
          <h3>Общая сумма сделок</h3>
          <div className="stat-value">{stats.deals.amount_total.toLocaleString('ru-RU')}</div>
        </div>
        <div className="stat-card">
          <h3>Всего задач</h3>
          <div className="stat-value">{stats.tasks.total}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 50, flexWrap: 'wrap' }}>
        <div>
          <h4>Статус сделок</h4>
          <PieChart width={300} height={220}>
            <Pie data={dealStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {dealStatusData.map((entry, idx) => <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div>
          <h4>Сумма сделок по статусу</h4>
          <BarChart width={320} height={220} data={dealSumData}>
            <XAxis dataKey="status" />
            <YAxis />
            <Bar dataKey="sum" fill="#007bff" />
            <Tooltip />
          </BarChart>
        </div>
        <div>
          <h4>Статус задач</h4>
          <PieChart width={300} height={220}>
            <Pie data={taskStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {taskStatusData.map((entry, idx) => <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default CrmDashboard;
