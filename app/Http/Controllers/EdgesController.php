<?php

namespace App\Http\Controllers;

use App\Edge;
use Illuminate\Http\Request;

class EdgesController extends Controller
{
    public function index()
    {
        return Edge::all();
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'weight' => 'required|integer',
            'vertex_id_from' => 'required|integer',
            'vertex_id_to' => 'required|integer'
        ]);

        $edge = Edge::create($request->all());
        return response()->json($edge, 201);
    }

    public function delete(Edge $edge)
    {
        $edge->delete();

        return response()->json(null, 204);
    }

}
