
# Playwright Test Suite

This repository contains a Playwright test suite for testing various aspects of a web application, including navigation, UI elements, responsiveness, and accessibility.

## How to Run the Tests

1. **Clone the repository**  
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**  
   ```bash
   cd <repository-folder>
   ```

3. **Install the dependencies**  
   ```bash
   npm install
   ```

4. **Run the tests**  
   ```bash
   npx playwright test
   ```

5. **(Optional) View the test report**  
   ```bash
   npx playwright show-report
   ```

> **Note:** Make sure your local server is running (e.g., at `http://localhost:3000`) if the tests depend on it.

## Test Descriptions

### Index Page Tests

- **Navbar exists**: Verifies the presence of a visible navbar.
- **Correct navbar links**: Ensures the navbar contains the correct links.
- **Shopping cart sidebar**: Tests opening and closing the shopping cart sidebar.
- **Home section**: Checks for the presence of welcome text in the home section.
- **Menu navigation**: Verifies navigation to the menu section when "Start Ordering" is clicked.
- **Login form**: Ensures the login form is displayed when the login button is clicked.
- **Footer**: Checks for the presence of contact information in the footer.
- **Responsive design**: Tests layout adjustments for mobile screen sizes.
- **Broken links**: Ensures navbar links navigate to the correct pages.
- **Accessibility**: Verifies all images have alt attributes.
- **404 handling**: Confirms a 404 page is displayed for non-existent routes.

### Reservation Page Tests

- **Page title**: Verifies the reservation page title.
- **Page load**: Ensures the reservation page loads correctly.
- **Calendar heading**: Checks the reservation calendar heading.
- **Guest dropdown**: Tests the visibility and functionality of the guest dropdown.
- **Date and time selection**: Verifies date and time selection functionality.
- **Form submission**: Tests the reservation form submission process.

### Announcement Page Tests

- **Header and search bar**: Verifies the visibility of the header and search bar.
- **Loading text**: Ensures loading text is displayed initially.
- **Dynamic announcements**: Confirms announcements are loaded dynamically.
- **Search functionality**: Tests filtering announcements using the search bar.

## Notes

Replace `<repository-url>` and `<repository-folder>` with the actual repository URL and folder name.  
Ensure your local server is running on `http://localhost:3000` or update the URLs in the tests accordingly.
