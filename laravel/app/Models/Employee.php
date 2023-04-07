<?php

namespace App\Models;

use App\Enums\EmployeePositionEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model implements
    EmployeePositionEnum
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'parent_id',
        'first_name',
        'last_name',
        'position',
        'email',
        'phone',
        'note',
    ];

    public function parent(): HasOne
    {
        return $this->hasOne(Employee::class, 'id', 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Employee::class, 'parent_id', 'id');
    }
}
