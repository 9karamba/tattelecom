<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Graph extends Model
{
    protected $table = 'graphs';

    /* Add the fillable property */
    protected $fillable = [
        'name'
    ];

    public function vertex(){
        return $this->hasMany(Vertex::class);
    }
}
