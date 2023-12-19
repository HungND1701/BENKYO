<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $auth = auth()->user();

        $notifications = DB::table('notifications')
        ->select(
            DB::raw('notification_id'),
            DB::raw('content'),
            DB::raw('created_at'),
            DB::raw('is_read')
        )
        ->where('user_id', $auth->id)
        ->orderBy('created_at', 'desc')
        ->get();

        return response()->json($notifications);
    }

public function read(Request $request)
{
    // Validate the request data
    $request->validate([
        'notification_id' => 'required|integer',
    ]);

    // Find the notification by its ID
    $notification = Notification::where('notification_id', $request->notification_id)->first();
    if ($notification) {
        // Mark the notification as read
        DB::table('notifications')
        ->where('notification_id', $notification->notification_id)
        ->update(['is_read'=> 1]);

        // Return a successful response
        return response()->json(['message' => 'Notification marked as read.'], 200);
    } else {
        // Return an error response if the notification was not found
        return response()->json(['message' => 'Notification not found.'], 404);
    }
}
}
