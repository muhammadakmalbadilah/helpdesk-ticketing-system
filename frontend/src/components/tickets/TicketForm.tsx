
import type { Ticket } from '../../types/ticket';

type TicketFormProps = {
    title: string;
    setTitle: (value: string) => void;
    priority: Ticket['priority'];
    setPriority: (value: Ticket['priority']) => void;
    description: string;
    setDescription: (value: string) => void;
    editingId: number | null;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function TicketForm({
    title,
    setTitle,
    priority,
    setPriority,
    description,
    setDescription,
    editingId,
    onSubmit,
}: TicketFormProps) {
    return (
        <form className="ticket-form" onSubmit={onSubmit}>
            <div className="ticket-form-grid">
                <div className="form-group">
                    <label htmlFor="title">Judul Tiket</label>

                    <input
                        id="title"
                        type="text"
                        placeholder="Contoh: Tidak bisa login ke sistem"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Prioritas</label>

                    <select
                        id="priority"
                        value={priority}
                        onChange={(event) =>
                            setPriority(event.target.value as Ticket['priority'])
                        }
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="description">Deskripsi Masalah</label>

                <textarea
                    id="description"
                    placeholder="Jelaskan masalah yang kamu alami secara detail..."
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    rows={4}
                    required
                />
            </div>

            <div className="ticket-form-footer">
                <span className="form-hint">
                    Pastikan informasi tiket sudah benar.
                </span>

                <button type="submit" className="btn-submit-ticket">
                    {editingId !== null ? 'Simpan Perubahan' : 'Kirim Tiket'}
                </button>
            </div>
        </form>
    );
}

export default TicketForm;
