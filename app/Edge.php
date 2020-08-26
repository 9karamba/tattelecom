<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Edge extends Model
{
    protected $table = 'edges';

    /* Add the fillable property */
    protected $fillable = [
        'weight', 'vertex_id_from', 'vertex_id_to'
    ];
}
