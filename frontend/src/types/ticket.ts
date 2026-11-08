export type Ticket = {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved';
  created_at: string;
  user?: {
    id: number;
    name: string;
    email: string;
  }
}