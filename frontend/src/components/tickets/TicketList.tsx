
import type { Ticket } from '../../types/ticket';

type TicketListProps = {
    role: 'admin' | 'user';
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
    onStatusChange: (ticketId: number, status: Ticket['status']) => void;
};

function TicketList({
    role,
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
    onStatusChange,
}: TicketListProps) {
    const displayedTickets = role === 'admin' ? paginatedTickets : tickets;

    const getStatusLabel = (status: Ticket['status']) => {
        switch (status) {
            case 'open':
                return 'Open';
            case 'in_progress':
                return 'In Progress';
            case 'resolved':
                return 'Resolved';
        }
    };

    const getPriorityLabel = (priority: Ticket['priority']) => {
        return priority.charAt(0).toUpperCase() + priority.slice(1);
    };

    return (
        <section className="ticket-section" id="ticket-list">
            <div className="ticket-section-header">
                <div>
                    <h2>Daftar Tiket</h2>
                    <p>Kelola dan pantau tiket bantuan yang masuk.</p>
                </div>

                <span className="ticket-count">
                    {role === 'admin'
                        ? `${filteredTickets.length} tiket ditemukan`
                        : `${tickets.length} tiket`
                    }
                </span>
            </div>

            {role === 'admin' && (
                <div className="ticket-toolbar">
                    <div className="search-wrapper">
                        <span className="search-icon">⌕</span>
                        <input
                            type="text"
                            placeholder="Cari judul, nama, atau email..."
                            value={searchTerm}
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(event) => {
                            setStatusFilter(event.target.value);
                            setCurrentPage(1);
                        }}
                        aria-label="Filter status"
                    >
                        <option value="all">Semua Status</option>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>

                    <select
                        value={priorityFilter}
                        onChange={(event) => {
                            setPriorityFilter(event.target.value);
                            setCurrentPage(1);
                        }}
                        aria-label="Filter prioritas"
                    >
                        <option value="all">Semua Prioritas</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    <button
                        type="button"
                        className="btn-reset"
                        onClick={() => {
                            setSearchTerm('');
                            setStatusFilter('all');
                            setPriorityFilter('all');
                            setCurrentPage(1);
                        }}
                    >
                        Reset
                    </button>
                </div>
            )}

            {loading && (
                <div className="ticket-message">
                    Memuat tiket...
                </div>
            )}

            {!loading && listError && (
                <div className="ticket-message error">
                    {listError}
                </div>
            )}

            {!loading && !listError && displayedTickets.length === 0 && (
                <div className="ticket-empty">
                    <div className="empty-icon">▤</div>
                    <strong>Belum ada tiket</strong>
                    <p>
                        {role === 'admin'
                            ? 'Tidak ada tiket yang sesuai dengan pencarian atau filter.'
                            : 'Tiket yang kamu buat akan muncul di sini.'
                        }
                    </p>
                </div>
            )}

            {!loading && !listError && displayedTickets.length > 0 && (
                <div className="ticket-table-wrapper">
                    <table className="ticket-table">
                        <thead>
                            <tr>
                                <th>TIKET</th>
                                {role === 'admin' && <th>PEMBUAT</th>}
                                <th>PRIORITAS</th>
                                <th>STATUS</th>
                                <th>TANGGAL</th>
                                <th>AKSI</th>
                            </tr>
                        </thead>

                        <tbody>
                            {displayedTickets.map((ticket) => (
                                <tr key={ticket.id}>
                                    <td className="ticket-info-cell">
                                        <strong>{ticket.title}</strong>
                                        <span>
                                            #{ticket.id} · {ticket.description}
                                        </span>
                                    </td>

                                    {role === 'admin' && (
                                        <td>
                                            <div className="creator-info">
                                                <strong>
                                                    {ticket.user?.name || 'Tidak diketahui'}
                                                </strong>
                                                <span>
                                                    {ticket.user?.email || '-'}
                                                </span>
                                            </div>
                                        </td>
                                    )}

                                    <td>
                                        <span className={`priority-badge ${ticket.priority}`}>
                                            <span className="badge-dot"></span>
                                            {getPriorityLabel(ticket.priority)}
                                        </span>
                                    </td>

                                    <td>
                                        {role === 'admin' ? (
                                            <select
                                                className={`status-select ${ticket.status}`}
                                                value={ticket.status}
                                                aria-label={`Ubah status tiket ${ticket.id}`}
                                                onChange={(event) =>
                                                    onStatusChange(
                                                        ticket.id,
                                                        event.target.value as Ticket['status']
                                                    )
                                                }
                                            >
                                                <option value="open">Open</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="resolved">Resolved</option>
                                            </select>
                                        ) : (
                                            <span className={`status-badge ${ticket.status}`}>
                                                {getStatusLabel(ticket.status)}
                                            </span>
                                        )}
                                    </td>

                                    <td className="ticket-date">
                                        {new Date(ticket.created_at).toLocaleDateString(
                                            'id-ID',
                                            {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            }
                                        )}
                                    </td>

                                    <td>
                                        <div className="ticket-actions">
                                            <button
                                                type="button"
                                                className="action-button view"
                                                onClick={() => onViewDetail(ticket)}
                                            >
                                                Detail
                                            </button>

                                            {role === 'user' && (
                                                <button
                                                    type="button"
                                                    className="action-button edit"
                                                    onClick={() => onEdit(ticket)}
                                                >
                                                    Edit
                                                </button>
                                            )}

                                            <button
                                                type="button"
                                                className="action-button delete"
                                                onClick={() => onDelete(ticket)}
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {role === 'admin' && totalPages > 1 && (
                <div className="ticket-pagination">
                    <span>
                        Menampilkan {paginatedTickets.length} dari {filteredTickets.length} tiket
                    </span>

                    <div className="pagination-controls">
                        <button
                            type="button"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((page) => page - 1)}
                        >
                            Sebelumnya
                        </button>

                        <span className="current-page">
                            {currentPage} / {totalPages}
                        </span>

                        <button
                            type="button"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((page) => page + 1)}
                        >
                            Selanjutnya
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default TicketList;
