# Logistics-Routing-System
The project aims to develop a web app for route planning, allowing users to input origin and destination addresses. It utilizes route optimization algorithms, validates addresses, and stores data in a MySQL database. Admins can manage user addresses. Technologies: Node.js, Express.js, MySQL.

#####
A web application that facilitates route planning for users by allowing them to input their origin and destination addresses. The application finds the best possible route to travel to all the selected locations and provide optimized directions. The project involves a combination of web development, data storage using a MySQL database, and integration of route optimization algorithms.

Key Features:
1. User Input: Users can input their origin and destination addresses through a user-friendly interface.
2. Address Validation: The application will validate the addresses provided by users to ensure they are valid and formatted correctly.
3. Route Optimization: The system will employ route optimization algorithms to calculate the best possible route that visits all selected locations efficiently.
4. Directions and Distance: The application will provide step-by-step directions and distance calculations for the optimized route.
5. Database Storage: User-submitted origin and destination addresses will be stored in a MySQL database for future reference.
6. User Roles: The application will differentiate between regular users and administrators. Regular users can input their addresses, while administrators can access all user-submitted addresses for analysis or management purposes.
7. Responsive Design: The web application will be designed to be responsive, ensuring optimal user experience across different devices and screen sizes.
8. Error Handling: Proper error handling will be implemented to handle any issues that may arise during address validation, route optimization, or database operations.

Technologies:
- Front-end: HTML, CSS, JavaScript
- Back-end: Node.js, Express.js
- Database: MySQL
- API Integration: MapQuest for search box suggestions, Mapbox Geocoding API for Location name to coordinates conversion, Mapbox distance matrix api for calculating the distances between every location.
