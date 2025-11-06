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
        $users = User::all()->shuffle();
        $products = Product::all()->shuffle();

        $maxReviews = 50;
        $count = 0;

        foreach ($users as $user) {
            foreach ($products as $product) {
                Review::factory()->create([
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                ]);

                $count++;
                if ($count >= $maxReviews) {
                    break 2;
                }
            }
        }
    }
}
