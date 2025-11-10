<?php

namespace App\Models;


use App\Enums\OrderStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'total_price',
        'total_quantity',
        'status',
        'comment',
    ];

    protected $casts = [
        'status' => OrderStatus::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function orderProducts(): HasMany
    {
        return $this->hasMany(OrderProduct::class);
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }

    public function delivery(): HasOne
    {
        return $this->hasOne(Delivery::class);
    }

    public function markPending(): self {
        $this->status = OrderStatus::Pending;
        $this->save();
        return $this;
    }

    public function markPaid(): self {
        $this->status = OrderStatus::Paid;
        $this->save();
        return $this;
    }

    public function markProcessing(): self {
        $this->status = OrderStatus::Processing;
        $this->save();
        return $this;
    }

    public function markShipped(): self {
        $this->status = OrderStatus::Shipped;
        $this->save();
        return $this;
    }

    public function markCompleted(): self {
        $this->status = OrderStatus::Completed;
        $this->save();
        return $this;
    }

    public function markCancelled(): self {
        $this->status = OrderStatus::Cancelled;
        $this->save();
        return $this;
    }
}
