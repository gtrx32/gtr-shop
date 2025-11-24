<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'total_price' => $this->total_price,
            'total_quantity' => $this->total_quantity,
            'status' => $this->status,
            'comment' => $this->comment,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'payment' => new PaymentResource($this->whenLoaded('payment')),
            'delivery' => new DeliveryResource($this->whenLoaded('delivery')),
            'products' => $this->whenLoaded('orderItems', function () {
                return $this->orderItems->map(fn($item) => [
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'total' => $item->quantity * $item->price,
                    'product' => new ProductResource($item->product),
                ])->values();
            }),
        ];
    }
}
