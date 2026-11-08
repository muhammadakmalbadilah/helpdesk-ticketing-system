import { useEffect, useState } from "react";
import axios from "axios";
import api from "./api/api";
import type { Ticket } from './types/ticket';
import type { User } from './types/user';
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

type LoginResponse = {
  message: string;
  token: string;
  user: User;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const [selectedTickets, setSelectedTickets] = useState<Ticket | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');

    if (!savedUser || savedUser === 'undefined') {
      return null;
    }

    try {
      return JSON.parse(savedUser) as User;
    } catch {
      localStorage.removeItem('user');
      return null;
    }
});
  
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState('');
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Ticket['priority']>('medium');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const [editingId, setEditingId] = useState<number | null>(null);

  // Register
  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Sedang mendaftarkan akun...');

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/register',
        {
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        }
      );

      setMessage(response.data.message);

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setIsRegister(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          const errors = error.response.data.errors;

          setMessage(
            Object.values(errors).flat().join(' ') || 'Data registrasi tidak valid.'
          );
          return;
        }
      }
      setMessage('Gagal terhubung ke Laravel API.');
    }
  }

  // Login
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Sedang login...');

    try {
      const response = await axios.post<LoginResponse>(
        'http://127.0.0.1:8000/api/login',
      {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setPassword('');
      setMessage(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setMessage('Email atau password salah');
          return;
        }
      }
      setMessage('Gagal terhubung ke Laravel API.');
    }
  }

  // Logout
  async function handleLogout() {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Gagal mencabut token di Laravel:', error);
    } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);
    setTickets([]);
    setMessage('Kamu berhasil logout.');
    setListError('');
    }
  }

  async function handleViewDetail(ticket: Ticket) {
    try {
      const endpoint = user?.role === 'admin' ? `/admin/tickets/${ticket.id}` : `/tickets/${ticket.id}`;

      const response = await api.get<{data: Ticket}>(endpoint);
      setSelectedTickets(response.data.data);
      setShowDetail(true);
    } catch (error) {
      console.error('Gagal mengambil detail tiket');
      setMessage('Gagal mengambil detail tiket');
    }
  }

  async function fetchTickets() {
    setLoading(true);
    setListError('');

    try {
      const endpoint = user.role === 'admin' ? '/admin/tickets' : '/tickets';

      const response = await api.get<{ data: Ticket[] }>(endpoint);

      setTickets(response.data.data);
    } catch (error) {
      console.error('Gagal mengambil tiket:', error);
      setListError('Daftar tiket gagal dimuat.');
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

  useEffect(() => {
    if (!message || message.startsWith('Sedang ')) return;

    const timer = window.setTimeout(() => {
        setMessage('');
    }, 3000);

    return () => window.clearTimeout(timer);
}, [message]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage('Mengirim data....');

    try {
      let response;

      if (editingId !== null) {
        response = await api.put(`tickets/${editingId}`, {title, description, priority,});
      } else {
        response = await api.post('tickets', {title, description, priority,});
      }

      setMessage(response.data.message);
      setEditingId(null);
      setTitle('');
      setDescription('');
      setPriority('medium');

      await fetchTickets();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;

        setMessage(
          errors.title?.[0] ??
          errors.priority?.[0] ?? 'Data yang dikirim tidak valid.'
        );
        return;
      }
    }
      console.error('Gagal mendapatkan data', error);
      setMessage("Gagal terhubung ke Laravel API.");
    }
  }

  function handleEdit(ticket: Ticket) {
    setEditingId(ticket.id);
    setTitle(ticket.title);
    setDescription(ticket.description);
    setPriority(ticket.priority);
    setMessage('');
  }

  async function handleDelete(ticket: Ticket) {
    const confirmed = window.confirm(`Yakin ingin menghapus tiket "${ticket.title}"?`);

    if (!confirmed) {
      return;
    }

    try {
      const endpoint = user.role === 'admin' ? `/admin/tickets/${ticket.id}` : `/tickets/${ticket.id}`;
      const response = await api.delete(endpoint);

      setMessage(response.data.message);

      if ( editingId === ticket.id ) {
        setEditingId(null);
        setTitle('');
        setDescription('');
        setPriority('medium');
      }

      await fetchTickets();
    } catch (error) {
      console.error('Gagal menghapus tiket:', error);
      setMessage('Gagal menghapus tiket.');
    }
  }

  async function handleStatusChange(ticketId: number, status: Ticket['status']) {
    try {
      const response = await api.patch(
        `/admin/tickets/${ticketId}/status`,
        {status}
      );

      setMessage(response.data.message);
      await fetchTickets();
    } catch (error) {
      console.error('Gagal mengubah status tiket:', error);
      setMessage('Gagal mengubah status tiket');
    }
  }

  const totalTickets = tickets.length;

  const openTickets = tickets.filter((ticket) => ticket.status === 'open').length;
  
  const inProgressTicket = tickets.filter((ticket) => ticket.status === 'in_progress').length;

  const resolvedTicket = tickets.filter((ticket) => ticket.status === 'resolved').length;

  const filteredTickets = tickets.filter((ticket) => {
    const search = searchTerm.toLowerCase();
    
    const matchesSearch = ticket.title.toLowerCase().includes(search) || (ticket.user?.name.toLowerCase().includes(search) ?? false) || (ticket.user?.email.toLowerCase().includes(search) ?? false);
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });
  
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, priorityFilter]);

  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * ticketsPerPage, currentPage * ticketsPerPage
    
  );
  return (
    <main>
      {!user ? (
        <AuthPage 
          isRegister={isRegister}
          setIsRegister={setIsRegister}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          message={message}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
        />
      ) : (
      <>
      {user.role === 'admin' && (
        <AdminDashboard 
          totalTickets={totalTickets}
          openTickets={openTickets}
          inProgressTickets={inProgressTicket}
          resolvedTickets={resolvedTicket}
          tickets={tickets}
          filteredTickets={filteredTickets}
          paginatedTickets={paginatedTickets}
          loading={loading}
          listError={listError}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          onViewDetail={handleViewDetail}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          selectedTickets={selectedTickets}
          showDetail={showDetail}
          onCloseDetail={() => {
            setShowDetail(false);
            setSelectedTickets(null);
          }}
          onLogout={handleLogout}
        />
      )}

      
      {user.role === 'user' && (
      <>
        <UserDashboard 
          userName={user.name}
          title={title}
          setTitle={setTitle}
          priority={priority}
          setPriority={setPriority}
          description={description}
          setDescription={setDescription}
          editingId={editingId}
          onSubmit={handleSubmit}
          tickets={tickets}
          filteredTickets={filteredTickets}
          paginatedTickets={paginatedTickets}
          loading={loading}
          listError={listError}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          onViewDetail={handleViewDetail}
          onEdit={handleEdit}
          onDelete={handleDelete}
          selectedTickets={selectedTickets}
          showDetail={showDetail}
          onCloseDetail={() => {
            setShowDetail(false);
            setSelectedTickets(null);
          }}
          onLogout={handleLogout}
        />
    </>
  )}

      {user && message && (
        <div className="toast-notification" role="status">
            <span className="toast-icon">✓</span>
            <span>{message}</span>
            <button
                type="button"
                onClick={() => setMessage('')}
                aria-label="Tutup notifikasi"
            >
                ×
            </button>
        </div>
    )}
    </>
  )}
</main>
);
}

export default App;