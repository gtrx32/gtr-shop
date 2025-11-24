<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CartResource;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function show(Request $request)
    {
        $cart = $request->user()
            ->cart()
            ->with(['cartItems.product'])
            ->first();

        if (!$cart) {
            return new CartResource($request->user()->cart()->create());
        }

        return response()->json(new CartResource($cart), 200);
    }
}
