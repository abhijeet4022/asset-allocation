# Asset Allocation Application

This document provides instructions for deploying the Asset Allocation Application on a Linux server.

## Deployment Instructions

To deploy the Asset Allocation Application, follow the steps below:

### Prerequisites

- Ensure you have `sudo` privileges on the server.
- The server must have all required dependencies installed for the application.

### Steps to Deploy the Application

1. **Clone the Repository (if not already done)**

If you haven't cloned the repository, use the following command to do so:

```bash
   git clone https://github.com/abhijeet4022/asset-allocation.git /App/asset-allocation
```
Change into the directory where the deploy.sh script is located:


cd asset-allocation

Execute the deploy.sh script with sudo privileges to deploy the application:


sudo bash deploy.sh

This script will handle all necessary deployment steps, including setting up the application, configuring the environment, and starting services.