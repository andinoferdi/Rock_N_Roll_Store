<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Nft;
use App\Models\Kategori;
use App\Models\Komentar;
use App\Models\PenawaranLelang;
use App\Models\ApplicationSetting;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;



class UserpageController extends Controller
{
    public function index(Request $request)
    {

        return view('userpage.index');
    }
}
