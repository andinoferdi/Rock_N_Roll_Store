<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@admin',
            'password' => Hash::make('admin@admin'),
            'foto' => 'fotos/Cover1.jpg',

            'role_id' => 1,
        ]);

        User::create([
            'name' => 'pelatih',
            'email' => 'pelatih@pelatih',
            'password' => Hash::make('pelatih@pelatih'),
            'foto' => 'fotos/Cover2.jpg',
            
            'role_id' => 2,
        ]);

        User::create([
            'name' => 'User',
            'email' => 'user@user',
            'password' => Hash::make('user@user'),
            'foto' => 'fotos/Cover3.jpg',

            'role_id' => 3,
        ]);
    }
}