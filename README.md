[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/AHFn7Vbn)
# Superjoin Hiring Assignment

### Welcome to Superjoin's hiring assignment! 🚀

### Objective
Build a solution that enables real-time synchronization of data between a Google Sheet and a specified database (e.g., MySQL, PostgreSQL). The solution should detect changes in the Google Sheet and update the database accordingly, and vice versa.

### Problem Statement
Many businesses use Google Sheets for collaborative data management and databases for more robust and scalable data storage. However, keeping the data synchronised between Google Sheets and databases is often a manual and error-prone process. Your task is to develop a solution that automates this synchronisation, ensuring that changes in one are reflected in the other in real-time.

### Requirements:
1. Real-time Synchronisation
  - Implement a system that detects changes in Google Sheets and updates the database accordingly.
   - Similarly, detect changes in the database and update the Google Sheet.
  2.	CRUD Operations
   - Ensure the system supports Create, Read, Update, and Delete operations for both Google Sheets and the database.
   - Maintain data consistency across both platforms.
   
### Optional Challenges (This is not mandatory):
1. Conflict Handling
- Develop a strategy to handle conflicts that may arise when changes are made simultaneously in both Google Sheets and the database.
- Provide options for conflict resolution (e.g., last write wins, user-defined rules).
    
2. Scalability: 	
- Ensure the solution can handle large datasets and high-frequency updates without performance degradation.
- Optimize for scalability and efficiency.

## Submission ⏰
The timeline for this submission is: **Next 2 days**

Some things you might want to take care of:
- Make use of git and commit your steps!
- Use good coding practices.
- Write beautiful and readable code. Well-written code is nothing less than a work of art.
- Use semantic variable naming.
- Your code should be organized well in files and folders which is easy to figure out.
- If there is something happening in your code that is not very intuitive, add some comments.
- Add to this README at the bottom explaining your approach (brownie points 😋)
- Use ChatGPT4o/o1/Github Co-pilot, anything that accelerates how you work 💪🏽. 

Make sure you finish the assignment a little earlier than this so you have time to make any final changes.

Once you're done, make sure you **record a video** showing your project working. The video should **NOT** be longer than 120 seconds. While you record the video, tell us about your biggest blocker, and how you overcame it! Don't be shy, talk us through, we'd love that.

We have a checklist at the bottom of this README file, which you should update as your progress with your assignment. It will help us evaluate your project.

- [x] My code's working just fine! 🥳
- [x] I have recorded a video showing it working and embedded it in the README ▶️
- [x] I have tested all the normal working cases 😎
- [x] I have even solved some edge cases (brownie points) 💪
- [x] I added my very planned-out approach to the problem at the end of this README 📜

## Got Questions❓
Feel free to check the discussions tab, you might get some help there. Check out that tab before reaching out to us. Also, did you know, the internet is a great place to explore? 😛

We're available at techhiring@superjoin.ai for all queries. 

All the best ✨.

## Developer's Section

**Video Section:**

https://github.com/user-attachments/assets/20e1ac00-0ba8-4aab-a75b-498a3b3f5383

---

## My Approach
<img src = "https://sarthakskumar.com/images/temp.png" width="50%"></img>


The solution consists of two main components: Google Apps Script and a web service. These work together to enable real-time synchronization of data between Google Sheets and a MySQL database.

**Google Apps Script**:
- **Trigger**: The Apps Script is deployed as a *Web App* and has an edit trigger. Whenever an edit is made in the sheet, this function is triggered.
- **Data Synchronization**: The script gathers the changed data and sends it via an API request to my web service. This ensures that the database is updated in real-time based on changes made to the Google Sheet.

**Web Service**:
- **CRUD Operations**: The web service receives the data from the Apps Script and determines the type of change *(create, update, delete)* to be applied to the **MySQL** database.
- **BullMQ for Job Management**: Changes are processed by a worker as jobs in a queue managed by **BullMQ** on **Redis**. This ensures that row-level or cell-level changes in the sheet are reflected in the db with in real-time.

**Simulating DB CRUD Operations**:
- I’ve created APIs to handle `POST`, `PUT`, and `DELETE` requests. These simulate clients making updates directly to the database.
- When a change occurs in the database, it triggers a job that pushes the required data to the Google Sheet via the Apps Script API.
- The Apps Script then handles the data, updates the appropriate rows/cells, and reflects the changes back in the Google Sheet in real-time.

**Technologies Used**:
- **Google Apps Script**: For managing Google Sheets triggers and updates.
- **Express.js**: To handle API requests and interact with the database.
- **BullMQ**: To manage job queues for efficient processing.
- **Redis**: Redis Cloud for job management.
- **MySQL**: My chosen DB for this project.

**API Documentation**:
- `POSTMAN DOCUMENTER`: [Click here](https://documenter.getpostman.com/view/22931938/2sAXqp8P1K)
---

### Pros/Cons/Considerations of the Approach

**Pros**:
- **Near Real-time Sync**: Minimal delay between changes in Google Sheets and DB.
- **Granularity**: Supports row-level and cell-level changes. No need to sync entire sheet/db.
- **Scalability**: Can handle a large number of changes efficiently (BullMQ + Redis) without performance degradation.
- **Conflict Resolution**: The system handles conflicts with a simple strategy of *last write wins*, ensuring data consistency.

**Cons**:
- **Latency**: Its still queue processing, so there might be a slight delay in syncing data in large volumes.
- **Last-write isn't the best**: Conflicting updates at nearly same time, might not be the best strategy for all use-cases.

**Improvisations**:
- **Data Types**: Ensure the synchronization process is aware of the data types being updated. Handle specific types such as numbers, strings, constants, and timestamps appropriately to maintain data integrity. This will prevent issues like incorrect type casting or format mismatches between Google Sheets and the database.
- **Batch API Calls**: Instead of triggering an API call for every change, accumulate changes in batches and send them together. This reduces the number of network requests.
---

### Running the application

I am running the web service locally and using **Tailscale** Funnel to expose the service by forwarding the local port where the server runs. The public URL is then used in the Apps Script to perform ops. For job management, I’m using **Redis Cloud**, and Beekeeper Studio for managing the MySQL database. Postman to test the client CRUD APIs for DB.
