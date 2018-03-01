<!doctype html>
<html lang="en">
<html class=" js cssanimations csstransitions">
<head>
    <meta name="copyright" content="&copy; Msatecnology &eacute; marca registrada da Msatecnology Inform&aacute;tica S.A." />
    <meta name="description" content="Msatecnology - Conectando experi&ecirc;ncias transformando neg&oacute;cios em sistemas
    de todas as complexidades." />
    <meta name="author" content="Visionnaire Inform&aacute;tica" />

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Cache-Control" content="max-age=3200" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="Keywords" content="desenvolvimento de software, desenvolvimento de sistemas, mundo digital, outsourcing, outsourcing de aplicacoes, aplicacoes,
    aplicativos, sistemas corporativos, cms, sitema de gestao de conteudo, terceirização de profissionais de ti," />
    <meta name="robots" content="ALL" />
    <meta property="og:url" content="http://www.msatecnology.com.br/" />
    <meta property="og:image" content="http://www.msatecnology.com.br/dbimages/msa_img.png" />
    <meta property="og:title" content="Msatecnology | Mundo digital" />
    <meta property="og:description" content="Para transformar negócios em realidade e seus sistemas de total qualidade."/>

    <title>@yield('title')</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossorigin="anonymous">
<link rel="shortcut icon" href="assets/images/favicon.png">
<link rel="apple-touch-icon" href="assets/images/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="72x72" href="assets/images/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="114x114" href="assets/images/apple-touch-icon-114x114.png">

<link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">

<link href="{{ url('css/font-awesome.min.css') }}" rel="stylesheet">
<link href="{{ url('css/simple-line-icons.css') }}" rel="stylesheet">

<link href="{{ url('css/magnific-popup.css') }}" rel="stylesheet">
<link href="{{ url('css/owl.carousel.css') }}" rel="stylesheet">
<link href="{{ url('css/flexslider.css') }}" rel="stylesheet">
<link href="{{ url('css/animate.min.css') }}" rel="stylesheet">

<link href="{{ url('css/vertical.min.css') }}" rel="stylesheet">
<link href="{{ url('css/template.min.css') }}" rel="stylesheet">



<link rel="stylesheet" href="{{ url('custom/css/fancybox.css') }}" />

<link rel="stylesheet" href="{{ url('css/custom.css') }}" />
<script type="text/javascript" src="{{ url('custom/js/jquery-1.8.2.min.js') }}"></script>
<script type="text/javascript" src="{{ url('custom/js/fancybox.js') }}"></script>
</head>
<body class="">

    @include('templates.header')

    @yield('content')
    @include('templates.footer')
        <script src="{{ asset('js/jquery-2.2.3.min.js') }}"></script>
            <script>
                $.noConflict();
            		// Code that uses other library's $ can follow here.
            </script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3"></script>
        <script src="{{ asset('bootstrap/js/bootstrap.min.js') }}"></script>
        <script src="{{ asset('js/plugins.js') }}"></script>
        <script src="{{ asset('js/custom.min.js') }}"></script>
        <script type="text/javascript" src="{{ asset('custom/js/script.js') }}"></script>

        <script type="text/javascript" src="{{ asset('custom/js/app.js') }}"></script>
        <script type="text/javascript" src="{{ asset('custom/js/pages/index.js') }}"></script>
        <script type="text/javascript" src="{{ asset('plugins/recaptcha_ajax.js') }}"></script>
</body>
</html>
