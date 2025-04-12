# Healthcare Chatbot

## Project Overview
A full-stack healthcare chatbot application with doctor and patient interfaces. The backend is built with Node.js/Express and MongoDB, while the frontend uses Next.js.

## Features
- Doctor authentication and profile management
- Appointment scheduling system
- Chat functionality between doctors and patients
- Hospital information directory

## Installation
### Backend
1. Navigate to `backend` directory
2. Run `npm install`
3. Create `.env` file with required environment variables (see `.env.example`)
4. Run `npm run dev` for development server

### Frontend
1. Navigate to `healthcare-chatbot` directory
2. Run `pnpm install`
3. Run `pnpm dev` for development server

## API Documentation
### Authentication
- `POST /api/v1/doctors/signup` - Doctor registration
- `POST /api/v1/doctors/login` - Doctor login

### Doctor Routes
- `GET /api/v1/doctors/me` - Get current doctor profile
- `PATCH /api/v1/doctors/updateMe` - Update doctor profile
- `PATCH /api/v1/doctors/updateMyPassword` - Update password

## Contribution Guidelines
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License
ISC