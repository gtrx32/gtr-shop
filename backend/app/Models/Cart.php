<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cart extends Model
{
    use CrudTrait;
    /** @use HasFactory<\Database\Factories\CartFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total_price',
        'total_quantity'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function cartProducts(): HasMany
    {
        return $this->hasMany(CartProduct::class);
    }

    public function addProduct(Product $product, int $quantity = 1): self
    {
        $cartProduct = $this->cartProducts()->firstWhere('product_id', $product->id);

        if ($cartProduct) {
            $cartProduct->quantity += $quantity;
            $cartProduct->save();
        } else {
            $this->cartProducts()->create([
                'product_id' => $product->id,
                'quantity' => $quantity
            ]);
        }

        $this->recalculate();

        return $this;
    }

    public function removeProduct(Product $product, int $quantity = null): self
    {
        $cartProduct = $this->cartProducts()->firstWhere('product_id', $product->id);

        if (!$cartProduct) {
            return $this;
        }

        if ($quantity === null || $quantity >= $cartProduct->quantity) {
            $cartProduct->delete();
        } else {
            $cartProduct->quantity -= $quantity;
            $cartProduct->save();
        }

        $this->recalculate();

        return $this;
    }

    public function clear(): self
    {
        $this->cartProducts()->delete();
        $this->total_quantity = 0;
        $this->total_price = 0;
        $this->save();
        return $this;
    }

    public function recalculate(): self
    {
        $this->load('cartProducts.product');

        $totalQuantity = 0;
        $totalPrice = 0;

        foreach ($this->cartProducts as $item) {
            $totalQuantity += $item->quantity;
            $totalPrice += $item->quantity * $item->product->price;
        }

        $this->total_quantity = $totalQuantity;
        $this->total_price = $totalPrice;
        $this->save();

        return $this;
    }
}
