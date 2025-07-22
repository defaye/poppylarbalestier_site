<?php
try {
    $pdo = DB::connection()->getPdo();
    echo 'Database connection successful!' . PHP_EOL;
    echo 'Database name: ' . DB::connection()->getDatabaseName() . PHP_EOL;
    echo 'Driver: ' . DB::connection()->getDriverName() . PHP_EOL;
    
    // Test if we can query the database
    $tables = DB::select('SHOW TABLES');
    echo 'Number of tables: ' . count($tables) . PHP_EOL;
    
    if (count($tables) > 0) {
        echo 'Sample tables: ' . PHP_EOL;
        foreach (array_slice($tables, 0, 5) as $table) {
            $tableName = array_values((array)$table)[0];
            echo '  - ' . $tableName . PHP_EOL;
        }
    }
    
} catch (Exception $e) {
    echo 'Database connection failed: ' . $e->getMessage() . PHP_EOL;
    echo 'Error code: ' . $e->getCode() . PHP_EOL;
}
