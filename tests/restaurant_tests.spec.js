// @ts-check
import { test, expect } from '@playwright/test';

// Index page tests
test.describe('Index Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000'); // Replace with your local server URL
  });

  test('navbar exists', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Expects the main page to have a navbar.
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();
  });

  test('should display the navbar with correct links', async ({ page }) => {
    const navbarLinks = await page.locator('.navbar-link a');
    await expect(navbarLinks).toHaveCount(5);
    await expect(navbarLinks.nth(0)).toHaveText('Home');
    await expect(navbarLinks.nth(1)).toHaveText('Menu');
    await expect(navbarLinks.nth(2)).toHaveText('About Us');
    await expect(navbarLinks.nth(3)).toHaveText('Reservation');
    await expect(navbarLinks.nth(4)).toHaveText('Announcements');
  });

  test('should open and close the shopping cart sidebar', async ({ page }) => {
    const cartIcon = page.locator('.navbar-shopping-cart');
    await cartIcon.click();
    const cartSidebar = page.locator('#shopping-cart');
    await expect(cartSidebar).toBeVisible();

    const closeButton = page.locator('#x-close-cart');
    await closeButton.click();
    await expect(cartSidebar).not.toBeVisible();
  });

  test('should display the home section with welcome text', async ({ page }) => {
    const homeHeader = page.locator('.content-section-header h1');
    await expect(homeHeader).toContainText('Welcome!');
  });

  test('should navigate to the menu section when "Start Ordering" is clicked', async ({ page }) => {
    const startOrderingButton = page.locator('.content-section-button');
    await startOrderingButton.click();
    const menuSection = page.locator('#menu');
    await expect(menuSection).toBeVisible();
  });

  test('should display the login form when login button is clicked', async ({ page }) => {
    const loginButton = page.locator('#navbar-login');
    await loginButton.click();
    const loginForm = page.locator('#login-form');
    await expect(loginForm).toBeVisible();
  });

  test('should display the footer with contact information', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('Burgerhelsinki@gmail.com');
    await expect(footer).toContainText('Myllypurontie 1, 00920 Helsinki');
  });

  // Responsive Design Test
  test('should adjust layout for mobile screen size', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone 6/7/8 dimensions
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();
    const mobileMenuButton = page.locator('.mobile-menu-button');
    await expect(mobileMenuButton).toBeVisible();
  });

  // Broken Links Test
  test('should navigate to correct pages from navbar links', async ({ page }) => {
    const navbarLinks = page.locator('.navbar-link a');
    for (let i = 0; i < await navbarLinks.count(); i++) {
      const link = navbarLinks.nth(i);
      const href = await link.getAttribute('href');
      await link.click();
      await expect(page).toHaveURL(`http://localhost:3000${href}`);
      await page.goBack();
    }
  });

  // Accessibility Test
  test('should have alt attributes for all images', async ({ page }) => {
    const images = page.locator('img');
    for (let i = 0; i < await images.count(); i++) {
      const altText = await images.nth(i).getAttribute('alt');
      await expect(altText).not.toBeNull();
    }
  });

  // 404 Handling Test
  test('should display 404 page for non-existent routes', async ({ page }) => {
    await page.goto('http://localhost:3000/non-existent-page');
    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toContainText('404');
  });
});



// Reservation page tests
test.describe('Reservation Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/reservation/index.html');
  });

  test('reservation has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Reservation Calendar/);
  });

  test('should load the reservation page', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Reservation Calendar');
  });

  test('should load the reservation calendar with correct heading', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Reservation Calendar');
  });

  test('should display guest dropdown with options', async ({ page }) => {
    const guestDropdown = page.locator('#guest');
    await expect(guestDropdown).toBeVisible();
    await guestDropdown.selectOption({ value: '2' }); // Assuming options are dynamically added
  });

  test('should allow selecting a date and proceed to time selection', async ({ page }) => {
    // Simulate selecting a guest
    const guestDropdown = page.locator('#guest');
    await guestDropdown.selectOption({ value: '2' });

    // Click on a day in the calendar (assumes day buttons have been populated in <ul class="days">)
    const days = page.locator('.days li:not(.prev-date):not(.next-date)'); // Adjust selector if needed
    await days.first().click();

    // Wait for time input to be visible
    await expect(page.locator('#time-input')).toBeVisible();
  });

  test('should allow time input and show proceed button', async ({ page }) => {
    await page.locator('#guest').selectOption({ value: '2' });
    await page.locator('.days li').nth(5).click(); // Arbitrary day
    await page.locator('#time').fill('18:30');
    await expect(page.locator('#process-btn')).toBeVisible();
  });

  test('should proceed to form and submit reservation', async ({ page }) => {
    await page.locator('#guest').selectOption({ value: '2' });
    await page.locator('.days li').nth(5).click();
    await page.locator('#time').fill('18:30');
    await page.locator('#process-btn').click();

    // Fill in reservation form
    await page.fill('#name', 'John Doe');
    await page.fill('#phone', '1234567890');
    await page.fill('#email', 'john@example.com');
    await page.fill('#notes', 'Window seat, please.');

    const submitBtn = page.locator('#submit-btn');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // Optional: check for a success message
    const formMessage = page.locator('#form-message');
    await expect(formMessage).toBeVisible();
  });
});

test('should display the header and search bar', async ({ page }) => {
  await page.goto('http://localhost:3000/annoucement/index.html');

  // Check if the header is visible
  const header = page.locator('#header-h1');
  await expect(header).toBeVisible();
  await expect(header).toHaveText('Latest Announcements');

  // Check if the search bar is visible
  const searchBar = page.locator('#search-bar');
  await expect(searchBar).toBeVisible();
  await expect(searchBar).toHaveAttribute('placeholder', 'Search announcements...');
});

test('should display loading text initially', async ({ page }) => {
  await page.goto('http://localhost:3000/announcement/index.html');

  // Check if the loading text is visible
  const loadingText = page.locator('.loading-text');
  await expect(loadingText).toBeVisible();
  await expect(loadingText).toHaveText('Loading Announcements...');
});

test('should display announcements dynamically', async ({ page }) => {
  await page.goto('http://localhost:3000/announcement/index.html');

  // Wait for announcements to load
  const announcements = page.locator('.announcements-container .search-results-item');
  await expect(announcements).toHaveCountGreaterThan(0);

  // Verify the first announcement's content
  const firstAnnouncement = announcements.first();
  await expect(firstAnnouncement).toBeVisible();
  await expect(firstAnnouncement).toHaveText(/Announcement/i);
});

test('should filter announcements using the search bar', async ({ page }) => {
  await page.goto('http://localhost:3000/announcement/index.html');

  // Type a query into the search bar
  const searchBar = page.locator('#search-bar');
  await searchBar.fill('Test Announcement');

  // Verify filtered results
  const filteredAnnouncements = page.locator('.announcements-container .search-results-item');
  await expect(filteredAnnouncements).toHaveCountGreaterThan(0);

  // Ensure the results match the query
  await expect(filteredAnnouncements.first()).toHaveText(/Test Announcement/i);
});