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
            'title' => 'required|unique:products|max:255',
            'description' => 'required',
            'price' => 'integer',
            'availability' => 'boolean',
        ]);

        $graph = Graph::create($request->all());
        return response()->json($graph, 201);
    }

    public function update(Request $request, Graph $graph)
    {
        $graph->update($request->all());

        return response()->json($graph, 200);
    }

    public function delete(Graph $graph)
    {
        $graph->delete();

        return response()->json(null, 204);
    }
}
