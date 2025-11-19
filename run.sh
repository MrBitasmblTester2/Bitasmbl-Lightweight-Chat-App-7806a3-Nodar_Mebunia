#!/bin/sh
# Start backend, signalr server and frontend (adjust paths as needed)
cd backend-laravel && php artisan serve &
cd ../signalr-server && dotnet run &
cd ../frontend && npm start
