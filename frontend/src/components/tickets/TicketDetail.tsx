
import type { Ticket } from '../../types/ticket';

type TicketDetailProps = {
    ticket: Ticket;
    onClose: () => void;
}

function TicketDetail({ ticket, onClose }: TicketDetailProps) {
    return (
        <div className="ticket-modal-overlay" onClick={onClose}>
            <section
                className="ticket-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="ticket-modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="ticket-modal-header">
                    <div>
                        <span className="ticket-modal-id">
                            Tiket #{ticket.id}
                        </span>
                        <h2 id="ticket-modal-title">Detail Tiket</h2>
                    </div>

                    <button
                        type="button"
                        className="ticket-modal-close"
                        onClick={onClose}
                        aria-label="Tutup modal"
                    >
                        ×
                    </button>
                </div>

                <div className="ticket-modal-body">
                    <div className="ticket-detail-main">
                        <h3>{ticket.title}</h3>
                        <p>{ticket.description}</p>
                    </div>

                    <div className="ticket-detail-meta">
                        <div>
                            <span>Prioritas</span>
                            <strong>{ticket.priority}</strong>
                        </div>

                        <div>
                            <span>Status</span>
                            <strong>{ticket.status}</strong>
                        </div>

                        <div>
                            <span>Dibuat</span>
                            <strong>
                                {new Date(ticket.created_at).toLocaleString('id-ID')}
                            </strong>
                        </div>
                    </div>

                    <div className="ticket-detail-user">
                        <h3>Informasi Pembuat</h3>
                        <p>
                            <span>Nama</span>
                            {ticket.user?.name ?? '-'}
                        </p>
                        <p>
                            <span>Email</span>
                            {ticket.user?.email ?? '-'}
                        </p>
                    </div>
                </div>

                <div className="ticket-modal-footer">
                    <button
                        type="button"
                        className="ticket-modal-button"
                        onClick={onClose}
                    >
                        Tutup
                    </button>
                </div>
            </section>
        </div>
    );
}

export default TicketDetail;
