import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Car, Bus, Footprints, Utensils, ShoppingBag, TrendingDown, Leaf, Target, Award } from 'lucide-react';

const CarbonFootprintTracker = () => {
  const [currentView, setCurrentView] = useState('home');
  const [dailyScore, setDailyScore] = useState(0);
  const [weeklyData, setWeeklyData] = useState([
    { day: 'Mon', carbon: 8.5 },
    { day: 'Tue', carbon: 12.3 },
    { day: 'Wed', carbon: 9.7 },
    { day: 'Thu', carbon: 11.2 },
    { day: 'Fri', carbon: 15.8 },
    { day: 'Sat', carbon: 7.3 },
    { day: 'Sun', carbon: 6.9 }
  ]);
  const [activities, setActivities] = useState([]);

  // Carbon emission factors (kg CO2)
  const emissionFactors = {
    transport: {
      car: 0.21, // per km
      bus: 0.089, // per km
      walk: 0,
      bike: 0
    },
    food: {
      meat: 4.5, // per meal
      vegetarian: 1.2, // per meal
      vegan: 0.8, // per meal
      fastfood: 6.2 // per meal
    },
    shopping: {
      clothes: 8.5, // per item
      electronics: 25.0, // per item
      groceries: 2.3, // per trip
      online: 1.8 // per order
    }
  };

  const tips = [
    "Walk or bike for trips under 2km to save 0.5kg CO2",
    "Choose vegetarian meals to reduce carbon by 3.3kg per meal",
    "Buy local groceries to cut transport emissions by 40%",
    "Use public transport to save 2.6kg CO2 per 10km trip",
    "Reduce meat consumption by 50% to save 15kg CO2 per week"
  ];

  const logActivity = (category, type, amount = 1) => {
    let emissions = 0;
    
    if (category === 'transport') {
      const distance = type === 'car' ? 10 : type === 'bus' ? 15 : 5; // default distances
      emissions = emissionFactors.transport[type] * distance;
    } else if (category === 'food') {
      emissions = emissionFactors.food[type] * amount;
    } else if (category === 'shopping') {
      emissions = emissionFactors.shopping[type] * amount;
    }

    const newActivity = {
      id: Date.now(),
      category,
      type,
      amount,
      emissions: parseFloat(emissions.toFixed(2)),
      time: new Date().toLocaleTimeString()
    };

    setActivities(prev => [...prev, newActivity]);
    setDailyScore(prev => parseFloat((prev + emissions).toFixed(2)));
  };

  const getScoreColor = (score) => {
    if (score < 8) return 'text-green-500';
    if (score < 15) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score) => {
    if (score < 8) return 'Excellent';
    if (score < 15) return 'Good';
    return 'Needs Improvement';
  };

  const HomeScreen = () => (
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Leaf className="text-green-500" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">Carbon Tracker</h1>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl mb-6">
          <p className="text-gray-600 mb-2">Today's Carbon Score</p>
          <p className={`text-4xl font-bold ${getScoreColor(dailyScore)}`}>
            {dailyScore} kg CO2
          </p>
          <p className={`text-sm mt-2 ${getScoreColor(dailyScore)}`}>
            {getScoreLabel(dailyScore)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-8">
        <button
          onClick={() => setCurrentView('transport')}
          className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <Car className="text-blue-600" size={24} />
          <span className="text-blue-800 font-medium">Log Transport</span>
        </button>
        
        <button
          onClick={() => setCurrentView('food')}
          className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
        >
          <Utensils className="text-green-600" size={24} />
          <span className="text-green-800 font-medium">Log Food</span>
        </button>
        
        <button
          onClick={() => setCurrentView('shopping')}
          className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
        >
          <ShoppingBag className="text-purple-600" size={24} />
          <span className="text-purple-800 font-medium">Log Shopping</span>
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Target className="text-orange-500" size={20} />
          Today's Tip
        </h3>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-orange-800 text-sm">
            💡 {tips[Math.floor(Math.random() * tips.length)]}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setCurrentView('progress')}
          className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <TrendingDown className="text-gray-600" size={20} />
          <span className="text-gray-800 text-sm">Progress</span>
        </button>
        
        <button
          onClick={() => setCurrentView('activities')}
          className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Award className="text-gray-600" size={20} />
          <span className="text-gray-800 text-sm">Activities</span>
        </button>
      </div>
    </div>
  );

  const TransportScreen = () => (
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen">
      <button
        onClick={() => setCurrentView('home')}
        className="mb-6 text-blue-600 hover:text-blue-800"
      >
        ← Back to Home
      </button>
      
      <h2 className="text-2xl font-bold mb-6 text-center">How did you travel?</h2>
      
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => logActivity('transport', 'car')}
          className="flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        >
          <Car className="text-red-600" size={24} />
          <div className="text-left">
            <p className="text-red-800 font-medium">Car (10km)</p>
            <p className="text-red-600 text-sm">~2.1 kg CO2</p>
          </div>
        </button>
        
        <button
          onClick={() => logActivity('transport', 'bus')}
          className="flex items-center gap-3 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
        >
          <Bus className="text-yellow-600" size={24} />
          <div className="text-left">
            <p className="text-yellow-800 font-medium">Bus (15km)</p>
            <p className="text-yellow-600 text-sm">~1.3 kg CO2</p>
          </div>
        </button>
        
        <button
          onClick={() => logActivity('transport', 'walk')}
          className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
        >
          <Footprints className="text-green-600" size={24} />
          <div className="text-left">
            <p className="text-green-800 font-medium">Walking (5km)</p>
            <p className="text-green-600 text-sm">0 kg CO2 🌱</p>
          </div>
        </button>
      </div>
    </div>
  );

  const FoodScreen = () => (
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen">
      <button
        onClick={() => setCurrentView('home')}
        className="mb-6 text-blue-600 hover:text-blue-800"
      >
        ← Back to Home
      </button>
      
      <h2 className="text-2xl font-bold mb-6 text-center">What did you eat?</h2>
      
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => logActivity('food', 'meat')}
          className="flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        >
          <Utensils className="text-red-600" size={24} />
          <div className="text-left">
            <p className="text-red-800 font-medium">Meat Meal</p>
            <p className="text-red-600 text-sm">~4.5 kg CO2</p>
          </div>
        </button>
        
        <button
          onClick={() => logActivity('food', 'vegetarian')}
          className="flex items-center gap-3 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
        >
          <Utensils className="text-yellow-600" size={24} />
          <div className="text-left">
            <p className="text-yellow-800 font-medium">Vegetarian Meal</p>
            <p className="text-yellow-600 text-sm">~1.2 kg CO2</p>
          </div>
        </button>
        
        <button
          onClick={() => logActivity('food', 'vegan')}
          className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
        >
          <Utensils className="text-green-600" size={24} />
          <div className="text-left">
            <p className="text-green-800 font-medium">Vegan Meal</p>
            <p className="text-green-600 text-sm">~0.8 kg CO2</p>
          </div>
        </button>
        
        <button
          onClick={() => logActivity('food', 'fastfood')}
          className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
        >
          <Utensils className="text-orange-600" size={24} />
          <div className="text-left">
            <p className="text-orange-800 font-medium">Fast Food</p>
            <p className="text-orange-600 text-sm">~6.2 kg CO2</p>
          </div>
        </button>
      </div>
    </div>
  );

  const ShoppingScreen = () => (
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen">
      <button
        onClick={() => setCurrentView('home')}
        className="mb-6 text-blue-600 hover:text-blue-800"
      >
        ← Back to Home
      </button>
      
      <h2 className="text-2xl font-bold mb-6 text-center">What did you buy?</h2>
      
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => logActivity('shopping', 'clothes')}
          className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
        >
          <ShoppingBag className="text-purple-600" size={24} />
          <div className="text-left">
            <p className="text-purple-800 font-medium">Clothes</p>
            <p className="text-purple-600 text-sm">~8.5 kg CO2</p>
          </div>
        </button>
        
        <button
          onClick={() => logActivity('shopping', 'electronics')}
          className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <ShoppingBag className="text-blue-600" size={24} />
          <div className="text-left">
            <p className="text-blue-800 font-medium">Electronics</p>
            <p className="text-blue-600 text-sm">~25.0 kg CO2</p>
          </div>
        </button>
        
        <button
          onClick={() => logActivity('shopping', 'groceries')}
          className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
        >
          <ShoppingBag className="text-green-600" size={24} />
          <div className="text-left">
            <p className="text-green-800 font-medium">Groceries</p>
            <p className="text-green-600 text-sm">~2.3 kg CO2</p>
          </div>
        </button>
        
        <button
          onClick={() => logActivity('shopping', 'online')}
          className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
        >
          <ShoppingBag className="text-orange-600" size={24} />
          <div className="text-left">
            <p className="text-orange-800 font-medium">Online Order</p>
            <p className="text-orange-600 text-sm">~1.8 kg CO2</p>
          </div>
        </button>
      </div>
    </div>
  );

  const ProgressScreen = () => (
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen">
      <button
        onClick={() => setCurrentView('home')}
        className="mb-6 text-blue-600 hover:text-blue-800"
      >
        ← Back to Home
      </button>
      
      <h2 className="text-2xl font-bold mb-6 text-center">Your Progress</h2>
      
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-green-800 mb-2">Weekly Average</h3>
        <p className="text-2xl font-bold text-green-600">
          {(weeklyData.reduce((sum, day) => sum + day.carbon, 0) / 7).toFixed(1)} kg CO2/day
        </p>
        <p className="text-sm text-green-600 mt-1">
          📈 You're doing better than last week!
        </p>
      </div>
      
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="carbon" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-blue-800 font-semibold">Best Day</p>
          <p className="text-blue-600">Sunday</p>
          <p className="text-blue-600 text-sm">6.9 kg CO2</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <p className="text-orange-800 font-semibold">Worst Day</p>
          <p className="text-orange-600">Friday</p>
          <p className="text-orange-600 text-sm">15.8 kg CO2</p>
        </div>
      </div>
    </div>
  );

  const ActivitiesScreen = () => (
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen">
      <button
        onClick={() => setCurrentView('home')}
        className="mb-6 text-blue-600 hover:text-blue-800"
      >
        ← Back to Home
      </button>
      
      <h2 className="text-2xl font-bold mb-6 text-center">Today's Activities</h2>
      
      {activities.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p>No activities logged yet!</p>
          <p className="text-sm mt-2">Start tracking your carbon footprint</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium capitalize">
                    {activity.category} - {activity.type}
                  </p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${getScoreColor(activity.emissions)}`}>
                    {activity.emissions} kg CO2
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'transport':
        return <TransportScreen />;
      case 'food':
        return <FoodScreen />;
      case 'shopping':
        return <ShoppingScreen />;
      case 'progress':
        return <ProgressScreen />;
      case 'activities':
        return <ActivitiesScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {renderCurrentView()}
    </div>
  );
};

export default CarbonFootprintTracker;
