<?php

namespace App\Providers;

use Illuminate\Support\Arr;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Arr::macro('snakeKeys', function (array $array) {
            return collect($array)->flatMap(function ($value, $key) {
                return [Str::snake($key) => $value];
            })->toArray();
        });
    }
}
