<?php

namespace App\Http\Controllers;

use App\Graph;
use Illuminate\Http\Request;

class GraphsController extends Controller
{
    public function index()
    {
        return Graph::all();
    }

    public function show(Graph $graph)
    {
        return $graph;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:graphs|max:100'
        ]);

        $graph = Graph::create($request->all());
        return response()->json($graph, 201);
    }

    public function delete(Graph $graph)
    {
        $graph->delete();

        return response()->json(null, 204);
    }
}
