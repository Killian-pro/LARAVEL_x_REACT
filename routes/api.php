<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DrugsController;
use App\Http\Controllers\TakingMedicationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserWalletController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->group(function () {
    //RAJOUTEr FCT NEED AUtH
    Route::get('/showUserWallet', [UserController::class, 'showUserWallet']);
    Route::get('/showUserTakingMedication', [TakingMedicationController::class, 'showUserTakingMedication']);
    Route::post('/addToUserWallet', [UserController::class, 'addToUserWallet']);
    Route::post('/takingMedication/{id}', [UserController::class, 'takingMedication']);
});
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/createDrug', [DrugsController::class, 'createDrug']);
Route::get('/showAllDrugs', [DrugsController::class, 'showAllDrugs']);
