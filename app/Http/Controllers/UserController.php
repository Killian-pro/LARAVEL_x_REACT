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

        $userWallets = $user->userWallets()->where('isDisabled', false)->with('drug')->orderBy('id', 'asc')->paginate(10);

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

        if ($userWallet->nb_in_box > 0) {

            $data = $request->validated();

            $data['user_id'] = $userWallet->id;

            $data['drug_id'] = $userWallet->drug_id;

            $user->takingMedication()->create($data);

            $nbBox = $request->input('nb_box', 1);

            $userWallet->decrement('nb_in_box', $nbBox);

            return response('', 201);
        } else {
            return response('Box empty', 405);
        }
    }

    public function disabledProduct(TakingMedicationRequest $request)
    {
        $user = Auth::user();

        $userWallet = $user->userWallets()->findOrFail($request->route('id'));

        $userWallet->update(['isDisabled' => true]);
    }
}
