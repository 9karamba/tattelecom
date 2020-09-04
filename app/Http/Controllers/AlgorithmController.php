<?php

namespace App\Http\Controllers;

use App\Edge;
use App\Vertex;
use Illuminate\Http\Request;

class AlgorithmController extends Controller
{
    public function index(Request $request)
    {
        $this->validate($request, [
            'vertex_id_from' => 'required|integer',
            'vertex_id_to' => 'required|integer'
        ]);

        $graph_id = Vertex::where('id', $request->vertex_id_from)->get();
        $vertices_all = Vertex::where('graph_id', $graph_id[0]->graph_id)->get();
        $vertices_id = [];

        foreach ($vertices_all as $vertex) {
            $vertices_id[] = $vertex->id;
        }

        $edges = Edge::whereIn('vertex_id_from', $vertices_id)->get();

        $minIndex = 0;
        $minDistance = 0;
        $start = (int)$request->vertex_id_from;
        $end = (int)$request->vertex_id_to;
        $vertices = [];

        foreach ($vertices_all as $vertex){
            $vertices[$vertex->id] = [
                    'name' => $vertex->name,
                    'distance' => $vertex->id === $start ? 0 : 10000,
                    'visit' => 0
                ];
        }

        //алгоритм Дейкстры
        do {
            $minIndex = 10000;
            $minDistance = 10000;

            foreach ($vertices as $key => $vertex){
                if (($vertex['visit'] === 0) && ($vertex['distance'] < $minDistance)) {
                    $minDistance = $vertex['distance'];
                    $minIndex = $key;

                    if($key === $start) {
                        $vertices[$key]['visit'] = 1;
                    }
                }
            }
            // Если соседних вершин нет
            if ($minIndex !== 10000)
            {
                for ($i = 0, $iMax = count($edges); $i < $iMax; $i++) {
                    $id_from = $edges[$i]->vertex_id_from;
                    $id_to = $edges[$i]->vertex_id_to;

                    if ($id_from === $minIndex) {
                        $weight = $minDistance + $edges[$i]->weight;

                        if ($weight < $vertices[$id_to]['distance']) {
                            $vertices[$id_to]['distance'] = $weight;
                        }
                    }
                }
                $vertices[$minIndex]['visit'] = 1;
            }
        } while ($minIndex < 10000);

        $result = [ $vertices[$end]['name'] ];
        $weight = $vertices[$end]['distance'];
        $end_index = $end;

        while ($end_index !== $start && $weight !== 10000) {
            //получаем вершины в обратном порядке
            for ($i = 0, $iMax = count($edges); $i < $iMax; $i++) {
                $id_from = $edges[$i]->vertex_id_from;
                $id_to = $edges[$i]->vertex_id_to;

                if ($id_to === $end_index) {
                    $temp = $weight - $edges[$i]->weight;

                    if ($temp === $vertices[$id_from]['distance']) {
                        $weight = $temp;
                        $end_index = $id_from;
                        $result[] = $vertices[$id_from]['name'];
                    }
                }
            }
        }

        if ($vertices[$end]['distance'] !== 10000) {
            $result = implode(' -> ', array_reverse($result)) . '; Расстояние=' . $vertices[$end]['distance'];
        }
        else {
            $result = 'Кратчайшего пути нет.';
        }

        return json_encode($result);
    }
}
