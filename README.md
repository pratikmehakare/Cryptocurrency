# Cryptocurrency

Build an interactive cryptocurrency dashboard that displays real-time data using the
CoinGecko API. The dashboard include the following components:
1. Cryptocurrency Detailed Analysis Panel
2. Top Gainers and Losers Panel
3. Backend APIs built in node.js that the frontend application interacts
with. These backend APIs WRAP CoinGecko APIs.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Contact](#contact)

## Features

1. Cryptocurrency Detailed Analysis Panel
2. Top Gainers and Losers Panel
3. Backend APIs built in node.js that the frontend application interacts
with. These backend APIs WRAP CoinGecko APIs. content visibility.

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js
- **Deployment:** Vercel, Render
- **Other Tools:** Tailwind CSS

## Installation

### Prerequisites

- Node.js (v14 or higher recommended)
- Git

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/pratikmehakare/Cryptocurrency.git
   cd Cryptocurrency
2. **Install Frontend Dependencies:**

   ```bash
   npm install
3. **Install Backend Dependencies:**

   ```bash
    cd backend
    npm install
4. **Configure Environment Variables:**

    Create a .env file in the backend and add the necessary configurations:

        PORT= 4000
        BASE_URL = https://api.coingecko.com/api/v3

    Create a .env file in the project root and add the necessary configurations: 

        REACT_APP_API_URL  = YOUR_BACKEND_URL/api

6. **Run the Application:**

    For backend:

        node index.js

    For frontend:

        npm start

## Contact
For questions or support, please contact:

    Maintainer: Pratik Mehakare
    GitHub Repository: https://github.com/pratikmehakare
