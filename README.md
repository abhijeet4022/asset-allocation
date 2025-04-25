# Asset Allocation Application

This document provides instructions for deploying the Asset Allocation Application on a Linux server.

## Deployment Instructions

To deploy the Asset Allocation Application, follow the steps below:

### Prerequisites

- Ensure you are in `root` user on the server.
- Port `81` should be open for HTTP traffic and not listening on any other service.

### Steps to Deploy the Application

1. **Clone the Repository**
   ```bash
   git clone https://github.com/abhijeet4022/asset-allocation.git /tmp/asset-allocation
   ```

2. **Navigate to Application Directory**
   ```bash
   cd /tmp/asset-allocation
   ```

3. **Execute Deployment Script**
   ```bash
   sudo bash deploy.sh
   ```

4. **Application is now accessible at:**
   ```bash
   echo "http://$(hostname -I | awk '{print $1}'):81"
   ```

This script will handle all necessary deployment steps, including setting up the application, configuring the environment, and starting services.