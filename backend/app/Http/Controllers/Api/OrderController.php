<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = $request->user()
            ->orders()
            ->with(['orderItems.product', 'payment', 'delivery'])
            ->get();

        return response()->json(OrderResource::collection($orders));
    }

    public function show(Request $request, $id)
    {
        $order = $request->user()
            ->orders()
            ->with(['orderItems.product', 'payment', 'delivery'])
            ->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json(new OrderResource($order));
    }

}
