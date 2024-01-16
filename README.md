## launch project

!Warning
create database in /database/database.sqlite
change .env
DB_CONNECTION=sqlite
php artisan migrate

php artisan serve

npm run dev

## create table

php artisan make:migration name
or
php artisan make:migration name --table=tablename
in the migration add the data model

```php
 $table->string('nom');
```

php artisan migrate

## create model

php artisan make:model User
add data and relation
exemple :

```php
protected $fillable = ['nom', 'description', 'posologie', 'photo'];

public function prisesDeMedicaments()
    {
        return $this->hasMany(PriseDeMedicament::class);
    }
```

## create controller

php artisan make:controller AuthController --resource
or
php artisan make:controller UserController --model=User --resource --requests --api

php artisan make:request LoginRequest

in request add rules exemple :

```php
    'name' => ['required', 'string'],
    'email' => ['required', 'email', 'unique:users,email'],
    'password' => [
        'required',
        'confirmed',
        Password::min(8)
            ->letters()
            ->symbols()
            ->numbers()
```

## ressource (return info you want in JSON)

php artisan make:resource UserRessource

## add react to project with Vite

npm create vite
