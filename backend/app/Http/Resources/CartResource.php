<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'total_quantity' => $this->total_quantity,
            'total_price' => $this->total_price,
            'products' => $this->cartItems->map(function ($item) {
                return [
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                    'total' => $item->quantity * $item->product->price,
                    'product' => new ProductResource($item->product),
                ];
            })->values(),
        ];
    }
}
