<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, $id)
    {
        $product = Product::query()->findOrFail($id);

        $data = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'title' => 'required|string|max:1000',
            'comment' => 'required|string|max:1000',
        ]);

        $review = Review::create([
            'user_id' => $request->user()->id,
            'product_id' => $product->id,
            'title' => $data['title'],
            'rating' => $data['rating'],
            'comment' => $data['comment'],
        ]);

        return response()->json([
            'message' => 'Review added successfully',
            'review' => $review
        ]);
    }

    public function destroy(Request $request, $product_id, $review_id)
    {
        $review = Review::where('id', $review_id)
            ->where('product_id', $product_id)
            ->firstOrFail();

        if ($review->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $review->delete();

        return response()->json(['message' => 'Review deleted successfully']);
    }
}
