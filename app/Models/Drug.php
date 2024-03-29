<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Drug extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'posology', 'picture'];

    public function userWallets()
    {
        return $this->hasMany(UserWallet::class);
    }
}
