<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/*
 *  Routes for Graph
 */
Route::get('graphs', 'GraphsController@index');
Route::post('graphs','GraphsController@store');
Route::delete('graphs/{graph}', 'GraphsController@delete');

/*
 *  Routes for Vertex
 */
Route::get('vertices', 'VerticesController@index');
Route::post('vertices','VerticesController@store');
Route::delete('vertices/{vertex}', 'VerticesController@delete');

/*
 *  Routes for Edge
 */
Route::get('edges', 'EdgesController@index');
Route::post('edges','EdgesController@store');
Route::delete('edges/{edge}', 'EdgesController@delete');

Route::get('algorithm', 'AlgorithmController@index');
