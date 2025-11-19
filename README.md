# Bitasmbl-Lightweight-Chat-App-7806a3-Nodar_Mebunia

## Description
Build a web application that allows users to join anonymous chatrooms and exchange messages in real-time using WebSockets. The focus is on fast communication, simple interface, and responsive updates without requiring user registration.

## Tech Stack
- Ember.js
- Laravel
- SignalR

## Requirements
- Allow users to join chatrooms without authentication
- Gracefully handle disconnected users and reconnections
- Handle multiple chatrooms simultaneously
- Display messages with timestamps and user identifiers (anonymous)
- Send and receive messages in real-time using WebSockets

## Installation
Follow these steps to set up the project locally. This repository is expected to contain a Laravel backend and an Ember frontend. Replace values as appropriate for your environment.

1. Clone the repository

   git clone https://github.com/MrBitasmblTester2/Bitasmbl-Lightweight-Chat-App-7806a3-Nodar_Mebunia.git
   cd Bitasmbl-Lightweight-Chat-App-7806a3-Nodar_Mebunia

2. Backend (Laravel)

   - Change to the backend directory (adjust if your repo uses a different folder name):

     cd backend

   - Install PHP dependencies with Composer:

     composer install

   - Copy environment example and generate application key:

     cp .env.example .env
     php artisan key:generate

   - (Optional) If your Laravel setup needs other environment values, set them in .env now. At minimum ensure APP_URL is correct for local testing.

3. Frontend (Ember.js)

   - Change to the frontend directory (adjust if your repo uses a different folder name):

     cd ../frontend

   - Install node dependencies:

     npm install

   - Install SignalR JavaScript client for realtime connectivity:

     npm install @microsoft/signalr --save

   - If you don't have Ember CLI globally and need it for local tooling, install it (optional):

     npm install -g ember-cli

4. Environment configuration for realtime connection

   - Frontend: Ensure the frontend has a configuration value for the SignalR hub URL. For example, set a SIGNALR_HUB_URL environment variable used by the Ember app build/config.

   - Backend: Laravel should be configured to know the public URL of the SignalR hub if the backend will send messages or trigger broadcasts to that hub. Add a SIGNALR_HUB_URL value to .env if applicable.

Note: This project uses SignalR for real-time messaging. Ensure a SignalR-compatible hub (self-hosted or managed) is reachable for client connections and backend broadcasts.

## Usage
Start the backend and frontend locally. The frontend will connect to a SignalR hub URL to send/receive real-time messages.

1. Start Laravel backend

   cd backend
   php artisan serve --host=127.0.0.1 --port=8000

   - The backend will run at http://127.0.0.1:8000 by default. Adjust host/port as needed.

2. Start Ember frontend

   cd ../frontend
   ember serve --port 4200

   - Or use: npm start (if a start script is defined in package.json).
   - The frontend will run at http://localhost:4200 by default.

3. SignalR hub

   - Ensure SIGNALR_HUB_URL (configured in frontend environment) points to a running SignalR hub that clients can connect to.
   - If the backend is responsible for triggering broadcasts, ensure it can reach the same hub (configure SIGNALR_HUB_URL in Laravel .env).

4. Open the frontend in a browser, choose or create an anonymous chatroom name, and join. Messages will be sent and received in real-time via SignalR.

## Implementation Steps
1. Scaffold the Laravel backend and Ember frontend directories (if not already scaffolded in repo).
2. Configure Laravel to expose minimal API endpoints for chatroom listing and message retrieval (no authentication). Keep controllers lightweight and stateless unless persistence is required.
3. Add environment-driven configuration in Laravel (.env) for APP_URL and SIGNALR_HUB_URL. Generate APP_KEY with php artisan key:generate.
4. Implement backend API routes:
   - GET /api/chatrooms — list available chatrooms
   - GET /api/chatrooms/{room}/messages — fetch recent messages for a room
   - POST /api/chatrooms/{room}/messages — accept posted messages and forward to SignalR hub
5. Implement backend logic to forward incoming messages to a SignalR hub endpoint (HTTP call to SIGNALR_HUB_URL) so the hub can broadcast to connected clients. Keep payloads minimal (room id, anonymous identifier, timestamp, message text).
6. In the Ember frontend, install @microsoft/signalr and configure a SignalR connection using SIGNALR_HUB_URL from frontend configuration.
7. Implement Ember routes/components for:
   - Joining a chatroom anonymously (generate a short anonymous identifier per session)
   - Subscribing to a SignalR group or hub method for a selected room
   - Sending messages (POST to backend API and/or invoking SignalR hub method directly depending on architecture)
   - Displaying incoming messages with timestamps and the anonymous identifier
8. Implement connection lifecycle handling in the Ember client:
   - Detect disconnects and attempt reconnection using SignalR's built-in reconnect features
   - On reconnection, re-subscribe to the previously joined chatrooms
   - Gracefully handle transient failures and queue outgoing messages locally until reconnected (optional minimal queue)
9. Support multiple chatrooms by allowing the client to switch subscriptions to different room channels/groups without authentication.
10. Test end-to-end flows: join room, send message, receive message in other browser tab, simulate disconnect and reconnect, verify timestamps and anonymous identifiers are shown correctly.

## API Endpoints (Optional)
- Endpoint: /api/chatrooms
  - Method: GET
  - Description: Return a list of available chatrooms (anonymous access).

- Endpoint: /api/chatrooms/{room}/messages
  - Method: GET
  - Description: Fetch recent messages for the specified chatroom.

- Endpoint: /api/chatrooms/{room}/messages
  - Method: POST
  - Description: Submit a new message to the specified chatroom. The backend should forward the message to the SignalR hub for broadcast to connected clients.