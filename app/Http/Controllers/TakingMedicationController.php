<?php

namespace App\Http\Controllers;

use App\Http\Requests\TakingMedicationRequest;
use App\Http\Resources\TakingMedicationRessource;
use Drug;
use Illuminate\Support\Facades\Auth;

class TakingMedicationController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     */
    public function showUserTakingMedication()
    {
        $user = Auth::user();

        $UserTakingMedication = $user->takingMedication()->with('drug')->orderBy('id', 'asc')->get();

        return TakingMedicationRessource::collection($UserTakingMedication);
    }

    public function ShowOnlyOneUserTakingMedication(TakingMedicationRequest $request)
    {
        $user = Auth::user();

        $drugId = $request->route('id');

        $UserTakingMedicationOne = $user->takingMedication()
            ->with('drug')
            ->whereHas('drug', function ($query) use ($drugId) {
                $query->where('id', $drugId);
            })
            ->get();


        if (!$UserTakingMedicationOne) {
            return response()->json(['message' => 'Empty'], 404);
        }

        return TakingMedicationRessource::collection($UserTakingMedicationOne);
    }
}
