# Queue Buddy

Welcome to **Queue Buddy**, your ultimate solution for managing online queues and securing product drops with ease. Whether you're aiming to score concert tickets that release while you're asleep or grab the latest must-have item, Queue Buddy is here to stand in line for you. Say goodbye to long, stressful hours in front of your computer, endlessly clicking refresh.

## Getting Started

Follow the steps below to set up Queue Buddy:

1. **Fork and Clone the Repository:**
   - Fork the repository and clone it to your local machine.

2. **Install Dependencies:**
   - Navigate to the root directory and run:
     ```bash
     npm install
     ```

3. **Set Up the Backend Server:**
   - Change directory to `my-server` and install dependencies:
     ```bash
     cd my-server
     npm install
     ```
   - Start the server:
     ```bash
     npm start
     ```
   - Verify that the backend server is running at `http://localhost:8080`.

4. **Set Up the Frontend:**
   - Open a new terminal and navigate to `project3`:
     ```bash
     cd project3
     ```
   - Install dependencies and start the development server:
     ```bash
     npm install
     npm run dev
     ```
   - Ensure the application is running at `http://localhost:5173`.

5. **Database Setup:**
   - Open a new terminal and start Docker:
     ```bash
     docker run --rm --name pg-docker -e POSTGRES_PASSWORD=yourpassword -d postgres
     ```
   - Access PostgreSQL:
     ```bash
     psql -U postgres
     ```
   - Create the database:
     ```sql
     CREATE DATABASE quebuddy;
     ```

6. **Run Migrations and Seed the Database:**
   - Navigate back to `my-server` and execute the following commands:
     ```bash
     npx knex migrate:latest
     npx knex seed:run
     ```

## Usage

Once setup is complete, visit `http://localhost:5173` to access Queue Buddy. You can explore events, add your own events, and queue yourself automatically to secure your chance to purchase tickets.

Enjoy seamless queue management with Queue Buddy!
