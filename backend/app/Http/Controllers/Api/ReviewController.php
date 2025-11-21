<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(StoreReviewRequest $request)
    {
        $data = $request->validated();

        $user = $request->user();

        if (Review::where('user_id', $user->id)->where('product_id', $data['product_id'])->exists()) {
            return response()->json([
                'message' => 'You already reviewed this product'
            ], 422);
        }

        $review = Review::create([
            'user_id' => $user->id,
            'product_id' => $data['product_id'],
            'title' => $data['title'],
            'comment' => $data['comment'],
            'rating' => $data['rating'],
        ]);

        return response()->json(new ReviewResource($review), 201);
    }

    public function userReviews(Request $request)
    {
        $user = $request->user();

        $reviews = $user->reviews()->with('product')->latest()->get();

        return response()->json(ReviewResource::collection($reviews));
    }
}
