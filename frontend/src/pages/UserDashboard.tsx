
import TicketForm from "../components/tickets/TicketForm";
import TicketList from "../components/tickets/TicketList";
import TicketDetail from "../components/tickets/TicketDetail";

import type { Ticket } from "../types/ticket";

type UserDashboardProps = {
    userName: string;
    onLogout: () => void;

    title: string;
    setTitle: (value: string) => void;
    priority: Ticket['priority'];
    setPriority: (value: Ticket['priority']) => void;
    description: string;
    setDescription: (value: string) => void;
    editingId: number | null;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;

    tickets: Ticket[];
    filteredTickets: Ticket[];
    paginatedTickets: Ticket[];
    loading: boolean;
    listError: string;

    searchTerm: string;
    setSearchTerm: (value: string) => void;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
    priorityFilter: string;
    setPriorityFilter: (value: string) => void;

    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;

    onViewDetail: (ticket: Ticket) => void;
    onEdit: (ticket: Ticket) => void;
    onDelete: (ticket: Ticket) => void;

    selectedTickets: Ticket | null;
    showDetail: boolean;
    onCloseDetail: () => void;
};

function UserDashboard({
    userName,
    onLogout,
    title,
    setTitle,
    priority,
    setPriority,
    description,
    setDescription,
    editingId,
    onSubmit,
    tickets,
    filteredTickets,
    paginatedTickets,
    loading,
    listError,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    onViewDetail,
    onEdit,
    onDelete,
    selectedTickets,
    showDetail,
    onCloseDetail,
}: UserDashboardProps) {
    const openTickets = tickets.filter(
        (ticket) => ticket.status === 'open'
    ).length;

    const inProgressTickets = tickets.filter(
        (ticket) => ticket.status === 'in_progress'
    ).length;

    const resolvedTickets = tickets.filter(
        (ticket) => ticket.status === 'resolved'
    ).length;

    return (
        <div className="admin-layout user-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <div className="brand-icon">H</div>
                    <div>
                        <h2>Helpdesk</h2>
                        <span>Ticketing System</span>
                    </div>
                </div>

                <div className="sidebar-section">
                    <p className="sidebar-label">MENU UTAMA</p>

                    <a href="#user-dashboard" className="sidebar-link active">
                        <span className="sidebar-icon">▦</span>
                        Dashboard
                    </a>

                    <a href="#my-tickets" className="sidebar-link">
                        <span className="sidebar-icon">▤</span>
                        Tiket Saya
                    </a>

                    <a href="#create-ticket" className="sidebar-link">
                        <span className="sidebar-icon">＋</span>
                        Buat Tiket
                    </a>
                </div>

                <div className="sidebar-bottom">
                    <div className="admin-profile">
                        <div className="profile-avatar">
                            {userName.charAt(0).toUpperCase()}
                        </div>

                        <div className="profile-info">
                            <strong>{userName}</strong>
                            <span>Pengguna</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="sidebar-logout"
                        onClick={onLogout}
                    >
                        <span>↪</span>
                        Logout
                    </button>
                </div>
            </aside>

            <main className="admin-main" id="user-dashboard">
                <header className="admin-header">
                    <div>
                        <p className="header-breadcrumb">
                            Workspace / Dashboard
                        </p>

                        <h1>Dashboard</h1>

                        <p className="header-description">
                            Selamat datang, {userName}. Pantau dan kelola tiket bantuanmu.
                        </p>
                    </div>

                    <div className="header-admin">
                        <div className="header-avatar">
                            {userName.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <strong>{userName}</strong>
                            <span>Pengguna</span>
                        </div>
                    </div>
                </header>

                <section className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-card-top">
                            <span className="stat-label">Total Tiket</span>
                            <span className="stat-icon blue">▤</span>
                        </div>
                        <strong className="stat-value">{tickets.length}</strong>
                        <span className="stat-description">Tiket yang kamu buat</span>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card-top">
                            <span className="stat-label">Open</span>
                            <span className="stat-icon sky">◷</span>
                        </div>
                        <strong className="stat-value">{openTickets}</strong>
                        <span className="stat-description">Menunggu penanganan</span>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card-top">
                            <span className="stat-label">In Progress</span>
                            <span className="stat-icon orange">↻</span>
                        </div>
                        <strong className="stat-value">{inProgressTickets}</strong>
                        <span className="stat-description">Sedang ditangani</span>
                    </div>

                    <div className="stat-card">
                        <div className="stat-card-top">
                            <span className="stat-label">Resolved</span>
                            <span className="stat-icon green">✓</span>
                        </div>
                        <strong className="stat-value">{resolvedTickets}</strong>
                        <span className="stat-description">Tiket telah diselesaikan</span>
                    </div>
                </section>

                <section className="user-form-section" id="create-ticket">
                    <div className="user-form-heading">
                        <div>
                            <h2>{editingId !== null ? 'Edit Tiket' : 'Buat Tiket Baru'}</h2>
                            <p>
                                {editingId !== null
                                    ? 'Perbarui informasi tiket yang sudah dibuat.'
                                    : 'Jelaskan masalah yang kamu alami agar dapat segera ditangani.'
                                }
                            </p>
                        </div>

                        <span className="form-heading-icon">＋</span>
                    </div>

                    <TicketForm
                        title={title}
                        setTitle={setTitle}
                        priority={priority}
                        setPriority={setPriority}
                        description={description}
                        setDescription={setDescription}
                        editingId={editingId}
                        onSubmit={onSubmit}
                    />
                </section>

                <div id="my-tickets">
                    <TicketList
                        role="user"
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
                        onViewDetail={onViewDetail}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onStatusChange={() => {}}
                    />
                </div>

                {showDetail && selectedTickets && (
                    <TicketDetail
                        ticket={selectedTickets}
                        onClose={onCloseDetail}
                    />
                )}
            </main>
        </div>
    );
}

export default UserDashboard;
