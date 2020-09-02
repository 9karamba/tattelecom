<?php

namespace App\Http\Controllers;

use App\Edge;
use App\Vertex;
use Illuminate\Http\Request;

class EdgesController extends Controller
{
    public function index(Request $request)
    {
        $vertices = json_decode($request->vertices);
        $vertices_id = [];

        foreach ($vertices as $vertex) {
            $vertices_id[] = $vertex->id;
        }

        return Edge::whereIn('vertex_id_from', $vertices_id)->get();
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'weight' => 'required|integer|min:0',
            'vertex_id_from' => 'required|integer',
            'vertex_id_to' => 'required|integer'
        ]);

        if($request['vertex_id_from'] !== $request['vertex_id_to']) {
            Edge::firstOrCreate($request->all());
        }
        return response()->json(Edge::all(), 201);
    }

    public function delete(Edge $edge)
    {
        $edge->delete();

        return response()->json(Edge::all(), 204);
    }

}
