<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $query = Product::query()
            ->withCount('reviews')
            ->withAvg(['reviews as rating'], 'rating');

        if ($name = request('name')) {
            $query->where('name', 'like', "%{$name}%");
        }

        if (($priceMin = request('price_min')) !== null) {
            $query->where('price', '>=', $priceMin);
        }

        if (($priceMax = request('price_max')) !== null) {
            $query->where('price', '<=', $priceMax);
        }

        if (request()->boolean('in_stock')) {
            $query->where('stock', '>', 0);
        }

        if (($ratingMin = request('rating_min')) !== null) {
            $query->having('rating', '>=', $ratingMin);
        }

        if (($ratingMax = request('rating_max')) !== null) {
            $query->having('rating', '<=', $ratingMax);
        }

        $sort = request('sort', 'id');
        $order = request('order', 'desc');
        $perPage = request('per_page', 10);

        $products = $query
            ->orderBy($sort, $order)
            ->paginate($perPage);

        return [
            'data' => ProductResource::collection($products),
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
                'next_page_url' => $products->nextPageUrl(),
                'prev_page_url' => $products->previousPageUrl(),
            ]
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        $product = Product::with(['reviews.user'])
            ->withCount('reviews')
            ->withAvg(['reviews as rating'], 'rating')
            ->findOrFail($id);

        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
