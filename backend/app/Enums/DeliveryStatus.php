<?php

namespace App\Enums;

enum DeliveryStatus: string
{
    case Pending   = 'pending';
    case Shipped   = 'shipped';
    case Delivered = 'delivered';
    case Cancelled = 'cancelled';
}
