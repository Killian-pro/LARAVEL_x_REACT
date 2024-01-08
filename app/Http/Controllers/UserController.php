<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddToUserWalletRequest;
use App\Http\Requests\TakingMedicationRequest;
use App\Http\Resources\UserWalletRessource;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function index()
    // {
    //     return UserRessource::collection(User::query()->orderBy('id', 'desc')->paginate(10));
    // }

    // showUserWallet
    public function showUserWallet()
    {
        $user = Auth::user();

        $userWallets = $user->userWallets()->with('drug')->orderBy('id', 'asc')->paginate(10);

        return UserWalletRessource::collection($userWallets);
    }

    // addToUserWallet
    public function addToUserWallet(AddToUserWalletRequest $request)
    {
        $user = Auth::user();

        $data = $request->validated();

        $userWallet = $user->userWallets()->create($data);

        return new UserWalletRessource($userWallet);
    }

    public function takingMedication(TakingMedicationRequest $request)
    {
        $user = Auth::user();

        $userWallet = $user->userWallets()->findOrFail($request->route('id'));

        $data = $request->validated();

        $data['user_id'] = $userWallet->id;

        $data['drug_id'] = $userWallet->drug_id;

        $user->takingMedication()->create($data);

        return response('', 201);
    }
}
