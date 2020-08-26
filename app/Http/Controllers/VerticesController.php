<?php

namespace App\Http\Controllers;

use App\Vertex;
use Illuminate\Http\Request;

class VerticesController extends Controller
{
    public function index()
    {
        return Vertex::all();
    }

    public function show(Vertex $vertex)
    {
        return $vertex;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:graphs|max:100'
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
