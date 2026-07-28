<?php

// Jangan load config Scribe kalau package tidak ter-install (production)
if (! class_exists(\Knuckles\Scribe\ScribeServiceProvider::class)) {
    return [];
}

// Config asli Scribe hanya load kalau package ada
return require __DIR__.'/scribe.original.php';