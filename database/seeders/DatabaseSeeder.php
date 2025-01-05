<?php

namespace Database\Seeders;

use App\Models\SettingSubmenu;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
   
   public function run()
{
    $this->call([
        RoleSeeder::class,
        UserSeeder::class,
    ]);
}

}