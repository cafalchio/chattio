# Chattio

Chattio is a simple chat application built with Tauri and React. 
This is a toy app to chat with my nephew.

<img src="https://github.com/cafalchio/chattio/blob/main/public/dev_screenshot.png" alt="Chattio Screenshot" height="300"/>

## Features

- Real-time messaging
- WebSocket connection handling
- Simple and clean UI

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22 or higher)
- [Rust](https://www.rust-lang.org/tools/install)
- [Tauri v2](https://v2.tauri.app/start/prerequisites/)

### Installation

1. Clone the repository:

```sh
    git clone https://github.com/cafalchio/chattio.git
    cd chattio

    npm install
    npm run build:css
    # Compile and run for dev with
    npm run tauri dev
```
### Missing functionalities

    There are many features and functionalities missing in the app, 
    currently I am implementing the login page. Because it is a app that runs locally, 
    the secrets cannot be hidden, I am looking for a solution.

    <b>Missing features</b>
    - Login page
    - Multiple users
    - User profile
    - Encription


Currently, websockets are being used. But I am considering WebRTC.
There are many advantages to use WebRTC, including video and p2p encription. It is in the future work list.




