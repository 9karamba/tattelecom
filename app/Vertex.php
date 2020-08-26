<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vertex extends Model
{
    protected $table = 'vertices';

    /* Add the fillable property */
    protected $fillable = [
        'name'
    ];

    public function graph(){
        return $this->belongsTo(Graph::class);
    }

}
