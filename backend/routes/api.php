<?php

use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'show']);
    Route::patch('/user', [UserController::class, 'update']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/products/{product_id}/reviews', [ReviewController::class, 'store']);
    Route::get('/user/reviews', [ReviewController::class, 'userReviews']);
    Route::patch('/user/reviews/{id}', [ReviewController::class, 'update']);
    Route::delete('/user/reviews/{id}', [ReviewController::class, 'destroy']);
    Route::post('/reviews/{id}/like', [ReviewController::class, 'like']);
    Route::post('/reviews/{id}/dislike', [ReviewController::class, 'dislike']);
});

/*
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'add']);
    Route::post('/cart/update', [CartController::class, 'update']);
    Route::post('/cart/remove', [CartController::class, 'remove']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders/create', [OrderController::class, 'store']);
    Route::post('/orders/cancel', [OrderController::class, 'cancel']);
});
*/
