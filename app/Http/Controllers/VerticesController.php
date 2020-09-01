<?php

namespace App\Http\Controllers;

use App\Vertex;
use Illuminate\Http\Request;

class VerticesController extends Controller
{
    public function index(Request $request)
    {
        $this->validate($request, [
            'graph_id' => 'required'
        ]);

        return Vertex::where('graph_id', $request['graph_id'])->get();
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:vertices|max:100',
            'graph_id' => 'required'
        ]);

        $vertex = Vertex::create($request->all());
        return response()->json($vertex, 201);
    }

    public function delete(Vertex $vertex)
    {
        $vertex->delete();

        return response()->json(null, 204);
    }
}
