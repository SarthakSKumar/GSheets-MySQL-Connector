![Google Sheets/MySQL Connector](https://github.com/user-attachments/assets/e5a43b07-15f0-4b4c-895a-569845c72950)

# Google Sheets/MySQL Connector

### Objective
A solution that enables real-time synchronization of data between a Google Sheet and a MySQL Database. The solution should detect changes in the Google Sheet and update the database accordingly, and vice versa.

### Problem Statement
Many businesses use Google Sheets for collaborative data management and databases for more robust and scalable data storage. However, keeping the data synchronised between Google Sheets and databases is often a manual and error-prone process. Your task is to develop a solution that automates this synchronisation, ensuring that changes in one are reflected in the other in real-time.

### Requirements:
1. Real-time Synchronisation
   - Implement a system that detects changes in Google Sheets and updates the database accordingly.
   - Similarly, detect changes in the database and update the Google Sheet.
2.	CRUD Operations
    - Ensure the system supports Create, Read, Update, and Delete operations for both Google Sheets and the database.
    - Maintain data consistency across both platforms.
3. Conflict Handling
    - Develop a strategy to handle conflicts that may arise when changes are made simultaneously in both Google Sheets and the database.
    - Provide options for conflict resolution (e.g., last write wins, user-defined rules).  
4. Scalability
    - Ensure the solution can handle large datasets and high-frequency updates without performance degradation.
    - Optimize for scalability and efficiency.

## Developer's Section

**Video Section:**

https://github.com/user-attachments/assets/20e1ac00-0ba8-4aab-a75b-498a3b3f5383

---

## The Approach
<img src = "https://github.com/user-attachments/assets/16367b49-e353-444e-8434-1181d4e17696" width="100%"></img>

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
- `POSTMAN DOCUMENTER`: [Click here](https://documenter.getpostman.com/view/22931938/2sAXxJhun3)
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
