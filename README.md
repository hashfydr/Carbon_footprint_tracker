# Carbon Footprint Tracker

A React-based web application to track daily carbon footprint across transportation, food choices, and shopping habits.

## Features

- **Daily Activity Tracking**: Log transport, food, and shopping activities
- **Real-time Carbon Calculation**: Instant CO2 emissions calculation
- **Progress Visualization**: Weekly charts and trends
- **Personalized Tips**: Daily recommendations to reduce carbon footprint
- **Activity History**: View all logged activities with timestamps
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **Frontend**: React 18
- **Charts**: Recharts
- **Icons**: Lucide React
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## Carbon Calculation Methodology

### Transport Emissions (kg CO2 per km)
- Car: 0.21 kg CO2/km
- Bus: 0.089 kg CO2/km
- Walking/Biking: 0 kg CO2/km

### Food Emissions (kg CO2 per meal)
- Meat meal: 4.5 kg CO2
- Vegetarian meal: 1.2 kg CO2
- Vegan meal: 0.8 kg CO2
- Fast food: 6.2 kg CO2

### Shopping Emissions (kg CO2 per item/trip)
- Clothes: 8.5 kg CO2/item
- Electronics: 25.0 kg CO2/item
- Groceries: 2.3 kg CO2/trip
- Online order: 1.8 kg CO2/order

## Installation

1. Clone the repository:
```bash
git clone https://github.com/hashfydr/Carbon_footprint_tracker.git
cd carbon-footprint-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Home Screen**: View your daily carbon score and access different tracking categories
2. **Log Activities**: Click on Transport, Food, or Shopping to log activities
3. **View Progress**: Check your weekly trends and statistics
4. **Activity History**: Review all your logged activities

## Future Enhancements

- User authentication and data persistence
- Social sharing and challenges
- Integration with real-time carbon intensity APIs
- Custom emission factors based on location
- Goal setting and achievement badges
- Export data to CSV/PDF reports

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## Acknowledgments

- Carbon emission factors based on EPA and scientific research
- Built for GitHub Hackathon 2025
- Inspired by the need for personal carbon awareness


**Built with 🌱 for a sustainable future**
