# Weather Pro App

Weather Pro App is a simple web application built with React that enables users to check real-time weather conditions for locations around the world.

## Features

- **Search Functionality**: Users can input the name of a location and search for its weather information.
- **Real-time Data**: The app fetches real-time weather data from the OpenWeatherMap API.
- **Dynamic Image Display**: Weather conditions are visually represented with corresponding images.
- **Error Handling**: Graceful handling of errors such as invalid locations or failed data fetching.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **OpenWeatherMap API**: Provides access to weather data.
- **Material-UI Icons**: Icon library for enhancing the UI.
- **CSS**: Styling for the application components.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/anas-makhool/weather-app.git
   ```
   
2. Navigate to the project directory:
   ```
   cd weather-pro-app
   ```
   
3. Install dependencies:
   ```
   npm install
   ```
   
  4. Obtain an API key from [OpenWeatherMap](https://openweathermap.org/) and replace "e7e1a37606465a6edb07c73c38ec905d" with your API key in the `Weather.js` file. 

5. Start the development server:
   ```
   npm start
   ```

6. Open your browser and visit `http://localhost:3000` to view the application.:

 ## Usage

 1. Enter the name of a location in the search input field.
 1. Click the search icon or press Enter to fetch weather data for the specified location.
 1. View the weather information displayed, including temperature, humidity, and wind speed.
 1. Depending on the weather condition, an appropriate weather image is shown.
 1. If there's an error, such as an invalid location, an error message is displayed.

## Credits

This project was created by [anas-makhool](https://github.com/anas-makhool).

## License

This project is licensed under the [MIT Liscense](LICENSE)
