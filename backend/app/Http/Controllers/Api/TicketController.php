<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index(Request $request) {
        $tickets = $request->user()->tickets()->latest()->get();
    
        return response()->json([
            'data' => $tickets,
        ]);
    }

    public function show(Request $request, Ticket $ticket)
    {
        $ticket = $request->user()
            ->tickets()
            ->findOrFail($ticket->id);

        $ticket->load('user:id,name,email');

        return response()->json([
            'data' => $ticket,
        ]);
    }

    public function update(Request $request, Ticket $ticket) {
         $ticket = $request->user()->tickets()->findOrFail($ticket->id);

        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:100'],
            'description' => ['sometimes', 'required', 'string'],
            'priority' => ['sometimes', 'required', 'in:low,medium,high'],
        ]);

        $ticket->update($validated);

        return response()->json([
            'message'=>'Tiket berhasil diperbaharui',
            'data'=>$ticket,
        ]);
    }

    public function destroy(Request $request, Ticket $ticket) {
        $ticket = $request->user()->tickets()->findOrFail($ticket->id);
        
        $ticket->delete();

        return response()->json([
            'message' => 'Tiket berhasil dihapus',
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string'],
            'priority' => ['required', 'in:low,medium,high'],
        ]);

        $ticket = $request->user()->tickets()->create($validated);
        
        return response()->json([
            'message' => 'Tiket berhasil dibuat',
            'data' => $ticket,
        ], 201);
    }

    public function adminShow(Ticket $ticket) {
        $ticket->load('user:id,name,email');

        return response()->json([
            'data' => $ticket,
        ]);
    }

    public function adminIndex() {
        $tickets = Ticket::with('user:id,name,email')->latest()->get();

        return response()->json([
            'data' => $tickets,
        ]);
    }

    public function updateStatus(Request $request, Ticket $ticket) {
        $validated = $request->validate([
            'status' => ['required', 'in:open,in_progress,resolved'],
        ]);

        $ticket->update([
            'status' => $validated['status'],
        ]);

        return response()->json([
            'message' => 'Status tiket berhasil diperbarui.',
            'data' => $ticket,
        ]);
    }

    public function adminDestroy(Ticket $ticket) {
        $ticket->delete();

        return response()->json([
            'message' => 'Tiket berhasil dihapus oleh admin.',
        ]);
    }
}
