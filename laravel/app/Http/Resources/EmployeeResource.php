<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
       return [
           'id' => $this->id,
           'parentId' => $this->parent_id,
           'firstName' => $this->first_name,
           'lastName' => $this->last_name,
           'email' => $this->email,
           'phone' => $this->phone,
           'position' => $this->position,
           'note' => $this->note,
           'hasChildren' => $this->children->isNotEmpty(),
       ];
    }
}
