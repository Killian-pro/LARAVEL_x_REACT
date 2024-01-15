<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserWalletRessource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->drug->name,
            'outdated_date' => $this->outdated_date,
            'nb_in_box' => $this->nb_in_box,
            'last_use' => $this->lastUseTimestamp(),
        ];
    }

    /**
     * get last use
     *
     * @return string|null
     */
    protected function lastUseTimestamp()
    {
        $lastTaking = $this->takingMedications->sortByDesc('created_at')->first();

        return $lastTaking ? $lastTaking->created_at->format('Y-m-d H:i:s') : null;
    }
}
