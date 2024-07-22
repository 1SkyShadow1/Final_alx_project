const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to the database.');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user'
      );
    `);
    console.log('Users table created or already exists.');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS skills(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT
      );
    `);
    console.log('Skills table created or already exists.');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS gigs(
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        skills_required JSON,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
    console.log('Gigs table created or already exists.');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS user_skills(
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        skill_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (skill_id) REFERENCES skills(id)
      );
    `);
    console.log('User_skills table created or already exists.');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS gig_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        gig_id INT NOT NULL,
        user_Id INT NOT NULL,
        application_text TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'pending',
        FOREIGN KEY (gig_id) REFERENCES gigs(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
    console.log('Gig_applications table created or already exists.');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sender_id INT NOT NULL,
        receiver_id INT NOT NULL,
        message_text TEXT NOT NULL,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES users(id),
        FOREIGN KEY (receiver_id) REFERENCES users(id)
      );
    `);
    console.log('Message table created or already exists.');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS notifications(
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        notification_type VARCHAR(50) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
    console.log('Notifications table created or already exists.');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS reviews(
        id INT AUTO_INCREMENT PRIMARY KEY,
        gig_id INT NOT NULL,
        reviewer_id INT NOT NULL,
        reviewee_id INT NOT NULL,
        rating INT NOT NULL,
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (gig_id) REFERENCES gigs(id),
        FOREIGN KEY (reviewer_id) REFERENCES users(id),
        FOREIGN KEY (reviewee_id) REFERENCES users(id),
        is_flagged BOOLEAN DEFAULT FALSE
      );
    `);
    console.log('Reviews table created or already exists.');

    connection.release();
  } catch (err) {
    console.error('Error connecting to database:', err);
  }
})();

module.exports = pool;
