<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserWallet extends Model
{
    use HasFactory;

    protected $fillable = ['drug_id', 'outdated_date', 'nb_in_box'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function drug()
    {
        return $this->belongsTo(Drug::class);
    }

    public function takingMedications()
    {
        return $this->hasMany(TakingMedication::class, 'user_id');
    }
}
