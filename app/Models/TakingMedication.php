<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TakingMedication extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'drug_id', 'date'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function drug()
    {
        return $this->belongsTo(Drug::class);
    }
}
