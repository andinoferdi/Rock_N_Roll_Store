    <header class="header shop">
        <div class="middle-inner">
            <div class="container">
                <div class="row">
                    <div class="col-lg-2 col-md-2 col-12">
                        <div class="logo">
                            <a href="{{ route('userpage') }}"><img src="{{ asset('assets1/images/logo.png') }}"
                                    alt="logo"></a>
                        </div>
                        <div class="search-top">
                            <div class="top-search"><a href="#0"><i class="ti-search"></i></a></div>
                            <div class="search-top">
                                <form class="search-form">
                                    <input type="text" placeholder="Search here..." name="search">
                                    <button value="search" type="submit"><i class="ti-search"></i></button>
                                </form>
                            </div>
                        </div>
                        <div class="mobile-nav"></div>
                    </div>
                    <div class="col-lg-8 col-md-7 col-12">
                        <div class="search-bar-top">
                            <div class="search-bar">
                                <select>
                                    <option selected="selected">All Category</option>
                                    <option>watch</option>
                                    <option>mobile</option>
                                    <option>kid’s item</option>
                                </select>
                                <form>
                                    <input name="search" placeholder="Search Products Here....." type="search">
                                    <button class="btnn"><i class="ti-search"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-3 col-12">
                        <div class="right-bar">
                            @guest
                                <div class="sinlge-bar">
                                    <a href="#" class="single-icon dropdown-trigger">
                                        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                    </a>
                                    <div class="dropdown-menu"
                                        style="display: none; position: absolute; background-color: white; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); padding: 10px; z-index: 1000;">
                                        <a href="{{ route('login') }}" class="dropdown-item"
                                            style="padding: 10px 15px; color: #333; text-decoration: none; display: block;">Login</a>
                                    </div>
                                </div>
                            @else
                                <div class="sinlge-bar">
                                    <a href="#" class="single-icon"><i class="fa fa-heart-o"
                                            aria-hidden="true"></i></a>
                                </div>
                                <div class="sinlge-bar">
                                    <a href="#" class="single-icon dropdown-trigger">
                                        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                    </a>
                                    <div class="dropdown-menu"
                                        style="display: none; position: absolute; background-color: white; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); padding: 10px; z-index: 1000;">
                                        <a href="" class="dropdown-item"
                                            style="padding: 10px 15px; color: #333; text-decoration: none; display: block;">Profile</a>
                                        @if (auth()->user()->role->nama_role === 'Admin')
                                            <a href="{{ route('dashboard') }}" class="dropdown-item"
                                                style="padding: 10px 15px; color: #333; text-decoration: none; display: block;">Dashboard</a>
                                        @endif
                                        <a href="{{ route('logout') }}" class="dropdown-item"
                                            style="padding: 10px 15px; color: #333; text-decoration: none; display: block;"
                                            onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Logout</a>
                                        <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                            style="display: none;">
                                            @csrf
                                        </form>
                                    </div>
                                </div>
                                <div class="sinlge-bar shopping">
                                    <a href="#" class="single-icon"><i class="ti-bag"></i> <span
                                            class="total-count">2</span></a>
                                </div>
                            @endguest
                        </div>



                    </div>
                </div>
            </div>
        </div>
        <div class="header-inner">
            <div class="container">
                <div class="cat-nav-head">
                    <div class="row">
                        <div class="col-lg-3">
                            <div class="all-category">
                                <h3 class="cat-heading"><i class="fa fa-bars" aria-hidden="true"></i>CATEGORIES</h3>
                                <ul class="main-category">
                                    <li><a href="#">New Arrivals <i class="fa fa-angle-right"
                                                aria-hidden="true"></i></a>
                                        <ul class="sub-category">
                                            <li><a href="#">accessories</a></li>
                                            <li><a href="#">best selling</a></li>
                                            <li><a href="#">top 100 offer</a></li>
                                            <li><a href="#">sunglass</a></li>
                                            <li><a href="#">watch</a></li>
                                            <li><a href="#">man’s product</a></li>
                                            <li><a href="#">ladies</a></li>
                                            <li><a href="#">westrn dress</a></li>
                                            <li><a href="#">denim </a></li>
                                        </ul>
                                    </li>
                                    <li class="main-mega"><a href="#">best selling <i class="fa fa-angle-right"
                                                aria-hidden="true"></i></a>
                                        <ul class="mega-menu">
                                            <li class="single-menu">
                                                <a href="#" class="title-link">Shop Kid's</a>
                                                <div class="image">
                                                    <img src="https://via.placeholder.com/225x155" alt="#">
                                                </div>
                                                <div class="inner-link">
                                                    <a href="#">Kids Toys</a>
                                                    <a href="#">Kids Travel Car</a>
                                                    <a href="#">Kids Color Shape</a>
                                                    <a href="#">Kids Tent</a>
                                                </div>
                                            </li>
                                            <li class="single-menu">
                                                <a href="#" class="title-link">Shop Men's</a>
                                                <div class="image">
                                                    <img src="https://via.placeholder.com/225x155" alt="#">
                                                </div>
                                                <div class="inner-link">
                                                    <a href="#">Watch</a>
                                                    <a href="#">T-shirt</a>
                                                    <a href="#">Hoodies</a>
                                                    <a href="#">Formal Pant</a>
                                                </div>
                                            </li>
                                            <li class="single-menu">
                                                <a href="#" class="title-link">Shop Women's</a>
                                                <div class="image">
                                                    <img src="https://via.placeholder.com/225x155" alt="#">
                                                </div>
                                                <div class="inner-link">
                                                    <a href="#">Ladies Shirt</a>
                                                    <a href="#">Ladies Frog</a>
                                                    <a href="#">Ladies Sun Glass</a>
                                                    <a href="#">Ladies Watch</a>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><a href="#">accessories</a></li>
                                    <li><a href="#">top 100 offer</a></li>
                                    <li><a href="#">sunglass</a></li>
                                    <li><a href="#">watch</a></li>
                                    <li><a href="#">man’s product</a></li>
                                    <li><a href="#">ladies</a></li>
                                    <li><a href="#">westrn dress</a></li>
                                    <li><a href="#">denim </a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-9 col-12">
                            <div class="menu-area">
                                <nav class="navbar navbar-expand-lg">
                                    <div class="navbar-collapse">
                                        <div class="nav-inner">
                                            <ul class="nav main-menu menu navbar-nav">
                                                <li class="active"><a href="#">Home</a></li>
                                                <li><a href="#">Product</a></li>
                                                <li><a href="#">Service</a></li>
                                                <li><a href="#">Shop<i class="ti-angle-down"></i><span
                                                            class="new">New</span></a>
                                                    <ul class="dropdown">
                                                        <li><a href="cart.html">Cart</a></li>
                                                        <li><a href="checkout.html">Checkout</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Pages</a></li>
                                                <li><a href="#">Blog<i class="ti-angle-down"></i></a>
                                                    <ul class="dropdown">
                                                        <li><a href="blog-single-sidebar.html">Blog Single Sidebar</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li><a href="contact.html">Contact Us</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');

            dropdownTriggers.forEach(trigger => {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    const dropdownMenu = this.nextElementSibling;
                    const isVisible = dropdownMenu.style.display === 'block';

                    // Tutup dropdown lain jika ada
                    document.querySelectorAll('.dropdown-menu').forEach(menu => menu.style.display =
                        'none');

                    // Tampilkan atau sembunyikan dropdown terkait
                    dropdownMenu.style.display = isVisible ? 'none' : 'block';
                });
            });

            // Tutup dropdown jika klik di luar
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.sinlge-bar')) {
                    document.querySelectorAll('.dropdown-menu').forEach(menu => menu.style.display =
                        'none');
                }
            });
        });
    </script>
