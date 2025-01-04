<!DOCTYPE html>
<html lang="zxx">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name='copyright' content=''>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Userpage | Rock N' Roll Store</title>
    <link rel="icon" type="image/png" href="{{ asset('assets1/images/favicon.png') }}">
    <link
        href="https://fonts.googleapis.com/css?family=Poppins:200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap"
        rel="stylesheet">

    <link rel="stylesheet" href="{{ asset('assets1/css/bootstrap.css') }}">
    <link rel="stylesheet" href="{{ asset('assets1/css/magnific-popup.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets1/css/font-awesome.css') }}">
    <link rel="stylesheet" href="{{ asset('assets1/css/jquery.fancybox.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets1/css/themify-icons.css') }}">
    <link rel="stylesheet" href="{{ asset('assets1/css/niceselect.css') }}">
    <link rel="stylesheet" href="{{ asset('assets1/css/animate.css') }}">
    <link rel="stylesheet" href="{{ asset('assets1/css/flex-slider.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets1/css/owl-carousel.css') }}">
    <link rel="stylesheet" href="{{ asset('assets1/css/slicknav.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets1/css/reset.css') }}">
    <link rel="stylesheet" href="{{ asset('assets1/style.css') }}">
    <link rel="stylesheet" href="{{ asset('assets1/css/responsive.css') }}">
</head>

<body class="js">
    <div class="preloader">
        <div class="preloader-inner">
            <div class="preloader-icon">
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
    @include('userpage.layouts.header')
    @yield('content')
    @include('userpage.layouts.footer')
    @yield('scripts')
    <script src="{{ asset('assets1/js/jquery.min.js') }}"></script>
    <script src="{{ asset('assets1/js/jquery-migrate-3.0.0.js') }}"></script>
    <script src="{{ asset('assets1/js/jquery-ui.min.js') }}"></script>
    <script src="{{ asset('assets1/js/popper.min.js') }}"></script>
    <script src="{{ asset('assets1/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('assets1/js/colors.js') }}"></script>
    <script src="{{ asset('assets1/js/slicknav.min.js') }}"></script>
    <script src="{{ asset('assets1/js/owl-carousel.js') }}"></script>
    <script src="{{ asset('assets1/js/magnific-popup.js') }}"></script>
    <script src="{{ asset('assets1/js/waypoints.min.js') }}"></script>
    <script src="{{ asset('assets1/js/finalcountdown.min.js') }}"></script>
    <script src="{{ asset('assets1/js/nicesellect.js') }}"></script>
    <script src="{{ asset('assets1/js/flex-slider.js') }}"></script>
    <script src="{{ asset('assets1/js/scrollup.js') }}"></script>
    <script src="{{ asset('assets1/js/onepage-nav.min.js') }}"></script>
    <script src="{{ asset('assets1/js/easing.js') }}"></script>
    <script src="{{ asset('assets1/js/active.js') }}"></script>
    <script>
        window.addEventListener('load', function() {
            const preloader = document.querySelector('.preloader');
            preloader.style.transition = 'opacity 0.5s ease-out';
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    </script>

</body>

</html>
