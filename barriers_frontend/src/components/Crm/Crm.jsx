import { useEffect, useState } from 'react';
import API from '../../api.jsx';
import './Crm.scss';
import CrmDashboard from '../CrmDashboard/CrmDashboard.jsx';

function Crm() {
  const [clients, setClients] = useState([]);
  const [deals, setDeals] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('clients');

  // Для обычных форм
  const [clientForm, setClientForm] = useState({ name: '', phone: '', email: '', company: '' });
  const [editClientId, setEditClientId] = useState(null);

  const [dealForm, setDealForm] = useState({ client_id: '', title: '', address: '', amount: '', status: 'new' });
  const [editDealId, setEditDealId] = useState(null);

  const [taskForm, setTaskForm] = useState({ client_id: '', title: '', description: '', due_date: '', status: 'pending' });
  const [editTaskId, setEditTaskId] = useState(null);

  // Для модальных окон (отдельное состояние)
  const [modalClient, setModalClient] = useState(null);
  const [modalDeal, setModalDeal] = useState(null);
  const [modalTask, setModalTask] = useState(null);
  // const [modalReport, setModalReport] = useState(null); // Удалить

  const fetchClients = async () => {
    try {
      const res = await API.get('/clients');
      setClients(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError('Ошибка загрузки клиентов');
    } finally {
      setLoading(false);
    }
  };

  const fetchDeals = async () => {
    try {
      const res = await API.get('/deals');
      setDeals(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError('Ошибка загрузки сделок');
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError('Ошибка загрузки задач');
    }
  };

  // --- Для форм ---
  const handleClientChange = (e) => setClientForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleDealChange = (e) => {
    const { name, value } = e.target;
    setDealForm(prev => ({ ...prev, [name]: name === 'client_id' || name === 'amount' ? Number(value) : value }));
  };
  const handleTaskChange = (e) => setTaskForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // --- Для модалок ---
  const handleModalChange = (e, setter) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  // --- SUBMIT для форм (старый обычный способ, без модалки) ---
  const handleClientSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editClientId) await API.put(`/clients/${editClientId}`, clientForm);
      else await API.post('/clients', clientForm);
      await fetchClients();
      setClientForm({ name: '', phone: '', email: '', company: '' });
      setEditClientId(null);
    } catch {
      setError('Ошибка при сохранении клиента');
    }
  };
  const handleDealSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editDealId) await API.put(`/deals/${editDealId}`, dealForm);
      else await API.post('/deals', dealForm);
      await fetchDeals();
      setDealForm({ client_id: '', title: '', address: '', amount: '', status: 'new' });
      setEditDealId(null);
    } catch {
      setError('Ошибка при сохранении сделки');
    }
  };
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTaskId) await API.put(`/tasks/${editTaskId}`, taskForm);
      else await API.post('/tasks', taskForm);
      await fetchTasks();
      setTaskForm({ client_id: '', title: '', description: '', due_date: '', status: 'pending' });
      setEditTaskId(null);
    } catch {
      setError('Ошибка при сохранении задачи');
    }
  };

  // --- Обычные (старые) edit/delete ---
  const handleClientEdit = (c) => { setModalClient({ ...c }); };
  const handleDealEdit = (d) => { setModalDeal({ ...d }); };
  const handleTaskEdit = (t) => { setModalTask({ ...t }); };
  // const handleReportEdit = (r) => { setModalReport({ ...r }); }; // Удалить

  const handleClientDelete = async (id) => { try { await API.delete(`/clients/${id}`); await fetchClients(); } catch { setError('Ошибка при удалении клиента'); } };
  const handleDealDelete = async (id) => { try { await API.delete(`/deals/${id}`); await fetchDeals(); } catch { setError('Ошибка при удалении сделки'); } };
  const handleTaskDelete = async (id) => { try { await API.delete(`/tasks/${id}`); await fetchTasks(); } catch { setError('Ошибка при удалении задачи'); } };
  // const handleReportDelete = async (id) => { try { await API.delete(`/reports/${id}`); await fetchReports(); } catch { setError('Ошибка при удалении отчета'); } }; // Удалить

  // --- SUBMIT для модалок ---
  const saveModalClient = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/clients/${modalClient.id}`, modalClient);
      setModalClient(null);
      await fetchClients();
    } catch {
      setError('Ошибка при сохранении клиента');
    }
  };
  const saveModalDeal = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/deals/${modalDeal.id}`, modalDeal);
      setModalDeal(null);
      await fetchDeals();
    } catch {
      setError('Ошибка при сохранении сделки');
    }
  };
  const saveModalTask = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/tasks/${modalTask.id}`, modalTask);
      setModalTask(null);
      await fetchTasks();
    } catch {
      setError('Ошибка при сохранении задачи');
    }
  };
  // const saveModalReport = async (e) => { ... } // Удалить

  useEffect(() => {
    fetchClients(); fetchDeals(); fetchTasks();
  }, []);

  return (
    <div className="crm-container">
      <div className="crm-sidebar">
        <button
          className={activeTab === 'clients' ? 'active' : ''}
          onClick={() => setActiveTab('clients')}
        >Клиенты</button>
        <button
          className={activeTab === 'deals' ? 'active' : ''}
          onClick={() => setActiveTab('deals')}
        >Сделки</button>
        <button
          className={activeTab === 'tasks' ? 'active' : ''}
          onClick={() => setActiveTab('tasks')}
        >Задачи</button>
        <button
          className={activeTab === 'reports' ? 'active' : ''}
          onClick={() => setActiveTab('reports')}
        >Отчеты</button>
      </div>

      <div className="crm-content">
        {activeTab === 'clients' && (
          <div className="crm-block">
            <h2>CRM: Клиенты</h2>
            <form onSubmit={handleClientSubmit} className="crm-form">
              <input name="name" placeholder="Имя" value={clientForm.name} onChange={handleClientChange} required />
              <input name="phone" placeholder="Телефон" value={clientForm.phone} onChange={handleClientChange} />
              <input name="email" placeholder="Email" value={clientForm.email} onChange={handleClientChange} />
              <input name="company" placeholder="Компания" value={clientForm.company} onChange={handleClientChange} />
              <button type="submit">{editClientId ? 'Сохранить клиента' : 'Добавить клиента'}</button>
            </form>
            {!loading && clients.length > 0 && (
              <table className="crm-table">
                <thead>
                  <tr>
                    <th>ID</th><th>Имя</th><th>Телефон</th><th>Email</th><th>Компания</th><th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map(c => (
                    <tr key={c.id}>
                      <td>{c.id}</td><td>{c.name}</td><td>{c.phone}</td><td>{c.email}</td><td>{c.company}</td>
                      <td>
                        <button onClick={() => handleClientEdit(c)}>✏️</button>
                        <button onClick={() => handleClientDelete(c.id)}>🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'deals' && (
          <div className="crm-block">
            <h2>Сделки</h2>
            <form onSubmit={handleDealSubmit} className="crm-form">
              <select name="client_id" value={dealForm.client_id} onChange={handleDealChange} required>
                <option value="">Выберите клиента</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.email})</option>)}
              </select>
              <input name="title" placeholder="Название" value={dealForm.title} onChange={handleDealChange} required />
              <input name="address" placeholder="Адрес" value={dealForm.address} onChange={handleDealChange} required />
              <input name="amount" placeholder="Сумма" value={dealForm.amount} onChange={handleDealChange} required type="number" />
              <select name="status" value={dealForm.status} onChange={handleDealChange} required>
                <option value="new">Новая</option>
                <option value="in_progress">В процессе</option>
                <option value="completed">Завершена</option>
                <option value="cancelled">Отменена</option>
              </select>
              <button type="submit">{editDealId ? 'Сохранить сделку' : 'Добавить сделку'}</button>
            </form>
            {!loading && deals.length > 0 && (
              <table className="crm-table">
                <thead>
                  <tr>
                    <th>ID</th><th>Название</th><th>Адрес</th><th>Сумма</th><th>Статус</th><th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map(d => (
                    <tr key={d.id}>
                      <td>{d.id}</td><td>{d.title}</td><td>{d.address}</td><td>{d.amount}</td>
                      <td>{d.status === 'new' ? 'Новая' : d.status === 'in_progress' ? 'В процессе' : d.status === 'completed' ? 'Завершена' : 'Отменена'}</td>
                      <td>
                        <button onClick={() => handleDealEdit(d)}>✏️</button>
                        <button onClick={() => handleDealDelete(d.id)}>🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="crm-block">
            <h2>Задачи</h2>
            <form onSubmit={handleTaskSubmit} className="crm-form">
              <select name="client_id" value={taskForm.client_id} onChange={handleTaskChange} required>
                <option value="">Выберите клиента</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input name="title" placeholder="Заголовок" value={taskForm.title} onChange={handleTaskChange} required />
              <input name="description" placeholder="Описание" value={taskForm.description} onChange={handleTaskChange} />
              <input name="due_date" type="datetime-local" value={taskForm.due_date} onChange={handleTaskChange} required />
              <select name="status" value={taskForm.status} onChange={handleTaskChange} required>
                <option value="pending">В ожидании</option>
                <option value="completed">Выполнено</option>
                <option value="overdue">Просрочено</option>
              </select>
              <button type="submit">{editTaskId ? 'Сохранить задачу' : 'Добавить задачу'}</button>
            </form>
            {!loading && tasks.length > 0 && (
              <table className="crm-table">
                <thead>
                  <tr>
                    <th>ID</th><th>Клиент</th><th>Заголовок</th><th>Описание</th><th>Дедлайн</th><th>Статус</th><th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(t => (
                    <tr key={t.id}>
                      <td>{t.id}</td><td>{t.client_id}</td><td>{t.title}</td><td>{t.description}</td>
                      <td>{new Date(t.due_date).toLocaleString()}</td>
                      <td>{t.status === 'pending' ? 'В ожидании' : t.status === 'completed' ? 'Выполнено' : 'Просрочено'}</td>
                      <td>
                        <button onClick={() => handleTaskEdit(t)}>✏️</button>
                        <button onClick={() => handleTaskDelete(t.id)}>🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="crm-block">
            <CrmDashboard />
          </div>
        )}

        {loading && <p>Загрузка...</p>}
        {error && <p className="error">{error}</p>}
      </div>

      {/* Модальные окна */}
      {modalClient && (
        <div className="modal-overlay" onClick={() => setModalClient(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Редактировать клиента</h3>
            <form onSubmit={saveModalClient} className="crm-form">
              <input name="name" value={modalClient.name} onChange={e => handleModalChange(e, setModalClient)} required />
              <input name="phone" value={modalClient.phone} onChange={e => handleModalChange(e, setModalClient)} />
              <input name="email" value={modalClient.email} onChange={e => handleModalChange(e, setModalClient)} />
              <input name="company" value={modalClient.company} onChange={e => handleModalChange(e, setModalClient)} />
              <button type="submit">Сохранить</button>
            </form>
          </div>
        </div>
      )}
      {modalDeal && (
        <div className="modal-overlay" onClick={() => setModalDeal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Редактировать сделку</h3>
            <form onSubmit={saveModalDeal} className="crm-form">
              <input name="title" value={modalDeal.title} onChange={e => handleModalChange(e, setModalDeal)} required />
              <input name="address" value={modalDeal.address} onChange={e => handleModalChange(e, setModalDeal)} required />
              <input name="amount" type="number" value={modalDeal.amount} onChange={e => handleModalChange(e, setModalDeal)} required />
              <select name="status" value={modalDeal.status} onChange={e => handleModalChange(e, setModalDeal)} required>
                <option value="new">Новая</option>
                <option value="in_progress">В процессе</option>
                <option value="completed">Завершена</option>
                <option value="cancelled">Отменена</option>
              </select>
              <button type="submit">Сохранить</button>
            </form>
          </div>
        </div>
      )}
      {modalTask && (
        <div className="modal-overlay" onClick={() => setModalTask(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Редактировать задачу</h3>
            <form onSubmit={saveModalTask} className="crm-form">
              <input name="title" value={modalTask.title} onChange={e => handleModalChange(e, setModalTask)} required />
              <input name="description" value={modalTask.description} onChange={e => handleModalChange(e, setModalTask)} />
              <input name="due_date" type="datetime-local" value={modalTask.due_date} onChange={e => handleModalChange(e, setModalTask)} required />
              <select name="status" value={modalTask.status} onChange={e => handleModalChange(e, setModalTask)} required>
                <option value="pending">В ожидании</option>
                <option value="completed">Выполнено</option>
                <option value="overdue">Просрочено</option>
              </select>
              <button type="submit">Сохранить</button>
            </form>
          </div>
        </div>
      )}
      {/* modalReport полностью удалить */}
    </div>
  );
}

export default Crm;
