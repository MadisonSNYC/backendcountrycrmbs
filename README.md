# Country Crmb Backend

This is the backend service for Country Crmb, handling waitlist signups and other backend functionality.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```
Then edit `.env` with your actual configuration values.

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Waitlist

- **POST** `/api/waitlist`
  - Add an email to the waitlist
  - Body: `{ "email": "user@example.com" }`
  - Returns: 
    - Success (201): `{ "message": "Successfully added to the waitlist", "data": { ... } }`
    - Error (409): `{ "message": "This email is already on the waitlist" }`

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

## Integration with V0

To integrate this backend with your V0 coming soon page:

1. Deploy this backend to your preferred hosting service
2. Update your V0 page to point to your deployed backend URL
3. Use the `/api/waitlist` endpoint for collecting email signups

## Security

The API includes:
- Rate limiting
- CORS protection
- Input validation
- MongoDB injection protection
- Helmet security headers 