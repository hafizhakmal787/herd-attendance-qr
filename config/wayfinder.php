<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Wayfinder Configuration
    |--------------------------------------------------------------------------
    */
    'paths' => [
        app_path('Http/Controllers'),
    ],

    'output' => [
        // Ini lokasi file JS/TS yang dicari-cari Vite mas tadi
        'actions' => resource_path('js/actions'),
        'routes' => resource_path('js/routes'),
        'models' => resource_path('js/models'),
    ],
];