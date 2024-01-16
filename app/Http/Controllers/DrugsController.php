<?php

namespace App\Http\Controllers;

use App\Http\Requests\DrugsRequest;
use App\Http\Resources\DrugRessource;
use App\Models\Drug;
use Illuminate\Http\Request;

class DrugsController extends Controller
{
    public function createDrug(DrugsRequest $request)
    {
        $data = $request->validated();

        $drug = Drug::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'posology' => $data['posology'],
        ]);


        return response([
            'drug' => $drug,
        ]);
    }

    public function showAllDrugs()
    {
        return DrugRessource::collection(Drug::query()->orderBy('id', 'desc')->paginate(10));
    }

    public function searchDrug(Request $request)
    {
        $term = $request->query('term');

        $results = Drug::where('name', 'like', '%' . $term . '%')->get();

        return response()->json($results);
    }
}
