<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
/**
 * HomeController class
 */
class HomeController extends Controller
{
    /**
     * index carrega - pagina inicial
     *
     * @return void
     */
    public function index()
    {
        return view('index');
    }
    /**
     * quem-somos - pagina quem somos
     *
     * @return void
     */
    public function getQuemsomos()
    {
        return view('quemsomos.quem-somos');
    }
    /**
     * produtos - pagina dos produtos
     *
     * @return void
     */
    public function getProdutos()
    {
        return view('produtos.produto');
    }
}
