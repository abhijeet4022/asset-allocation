# Asset Allocation Application

This document provides instructions for deploying the Asset Allocation Application on a Linux server.

## Deployment Instructions

To deploy the Asset Allocation Application, follow the steps below:

### Prerequisites

- Ensure you have `sudo` privileges on the server.

### Steps to Deploy the Application

1. **Clone the Repository**
   ```bash
   git clone https://github.com/abhijeet4022/asset-allocation.git /App/asset-allocation
   ```

2. **Navigate to Application Directory**
   ```bash
   cd /App/asset-allocation
   ```

3. **Execute Deployment Script**
   ```bash
   sudo bash deploy.sh
   ```

This script will handle all necessary deployment steps, including setting up the application, configuring the environment, and starting services.