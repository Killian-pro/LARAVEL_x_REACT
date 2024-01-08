<?php

namespace App\Http\Controllers;

use App\Http\Resources\TakingMedicationRessource;
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

        $UserTakingMedication = $user->takingMedication()->with('drug')->orderBy('id', 'asc')->paginate(10);

        return TakingMedicationRessource::collection($UserTakingMedication);
    }
}
