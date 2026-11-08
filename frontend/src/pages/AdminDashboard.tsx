
import TicketList from "../components/tickets/TicketList";
import TicketDetail from "../components/tickets/TicketDetail";

import type { Ticket } from "../types/ticket";

type AdminDashboardProps = {
    totalTickets: number;
    openTickets: number;
    inProgressTickets: number;
    resolvedTickets: number;

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
    onDelete: (ticket: Ticket) => void;
    onStatusChange: (ticketId: number, status: Ticket['status']) => void;

    selectedTickets: Ticket | null;
    showDetail: boolean;
    onCloseDetail: () => void;

    onLogout: () => void;
};

function AdminDashboard({
    totalTickets,
    openTickets,
    inProgressTickets,
    resolvedTickets,
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
    onDelete,
    onStatusChange,
    selectedTickets,
    showDetail,
    onCloseDetail,
    onLogout,
}: AdminDashboardProps) {
    return (
        <div className="admin-layout">
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

                    <a href="#dashboard" className="sidebar-link active">
                        <span className="sidebar-icon">▦</span>
                        Dashboard
                    </a>

                    <a href="#ticket-list" className="sidebar-link">
                        <span className="sidebar-icon">▤</span>
                        Manajemen Tiket
                    </a>
                </div>

                <div className="sidebar-bottom">
                <div className="admin-profile">
                    <div className="profile-avatar">A</div>
                    <div className="profile-info">
                        <strong>Administrator</strong>
                        <span>Admin</span>
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

            <main className="admin-main" id="dashboard">
                <header className="admin-header">
                    <div>
                        <p className="header-breadcrumb">
                            Workspace / Dashboard
                        </p>
                        <h1>Dashboard</h1>
                        <p className="header-description">
                            Pantau dan kelola seluruh tiket bantuan dalam satu tempat.
                        </p>
                    </div>

                    <div className="header-admin">
                        <div className="header-avatar">A</div>
                        <div>
                            <strong>Administrator</strong>
                            <span>Admin</span>
                        </div>
                    </div>
                </header>

                <section className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-card-top">
                            <span className="stat-label">Total Tiket</span>
                            <span className="stat-icon blue">▤</span>
                        </div>
                        <strong className="stat-value">{totalTickets}</strong>
                        <span className="stat-description">Seluruh tiket terdaftar</span>
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

                <TicketList
                    role="admin"
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
                    onEdit={() => {}}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                />

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

export default AdminDashboard;
