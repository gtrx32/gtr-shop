<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $products = Product::all();

        $pairs = [];
        foreach ($users as $user) {
            foreach ($products as $product) {
                $pairs[] = [$user->id, $product->id];
            }
        }

        $pairs = collect($pairs)->shuffle()->take(50);

        foreach ($pairs as [$userId, $productId]) {
            Review::factory()->create([
                'user_id' => $userId,
                'product_id' => $productId,
            ]);
        }
    }
}
