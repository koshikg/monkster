# Monkster Chatbot

A fun "reluctant monk" chatbot that provides insightful wisdom with a grumpy attitude.

## Overview

This project implements a simple chatbot with a humorous "grumpy monk" persona. Monkster is a brutally honest chatbot guru who's been cursed with eternal wisdom and reluctantly helps users with their questions, offering accurate information but with a consistently annoyed, philosophical tone.

## Features

- Web-based mobile phone chat interface
- Integration with Azure OpenAI Service
- Humorously grumpy monk persona
- Zen-inspired wisdom delivery
- Fallback mock responses for development

## Prerequisites

- Node.js (version 14 or higher)
- An Azure account with access to Azure AI Foundry
- Azure OpenAI Service deployment
- GitHub account (for deployment)

## Deployment to Azure

### Option 1: Deploy via Azure Portal

1. Create a Static Web App resource in the Azure Portal
   - Go to the [Azure Portal](https://portal.azure.com)
   - Click "Create a resource" > "Static Web App"
   - Fill in the required details:
     - Resource Group: Create new or use existing
     - Name: "monkster-chatbot" (or your preferred name)
     - Hosting Plan: Free
     - Region: Choose the closest to your users
   - Source: GitHub
   - Sign in to your GitHub account and select:
     - Organization: Your GitHub organization
     - Repository: The repository you pushed this code to
     - Branch: main

2. Configure build settings
   - Build Presets: Custom
   - App location: "/"
   - Api location: "api"
   - Output location: "public"

3. Configure environment variables
   - After deployment, go to your Static Web App resource
   - Navigate to "Configuration" in the left sidebar
   - Add these application settings:
     - AZURE_OPENAI_ENDPOINT: Your Azure OpenAI endpoint
     - AZURE_OPENAI_KEY: Your Azure OpenAI API key
     - AZURE_OPENAI_DEPLOYMENT_ID: Your deployment ID (e.g., "gpt-4")

### Option 2: Deploy via Azure CLI

1. Log in to Azure CLI:
   ```powershell
   az login
   ```

2. Create a resource group (if needed):
   ```powershell
   az group create --name monkster-rg --location eastus
   ```

3. Create a Static Web App:
   ```powershell
   az staticwebapp create --name "monkster-chatbot" --resource-group "monkster-rg" --source https://github.com/YOUR_USERNAME/YOUR_REPO --branch main --app-location "/" --api-location "api" --output-location "public"
   ```

4. Configure environment variables:
   ```powershell
   az staticwebapp appsettings set --name "monkster-chatbot" --resource-group "monkster-rg" --setting-names AZURE_OPENAI_ENDPOINT="your-endpoint" AZURE_OPENAI_KEY="your-key" AZURE_OPENAI_DEPLOYMENT_ID="your-deployment-id"
   ```

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Update the `.env` file with your Azure OpenAI credentials:
   ```
   AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
   AZURE_OPENAI_KEY=your-azure-openai-api-key
   AZURE_OPENAI_DEPLOYMENT_ID=your-deployment-id
   ```

## Running the application

To start the application, run:

```
npm start
```

Then open your browser to http://localhost:3000

## Development

- The application will run in mock mode if Azure OpenAI credentials are not provided
- The server logs helpful information at startup

## Deployment to Azure

To deploy this application to Azure:

1. Create an Azure Web App
2. Configure application settings with your environment variables
3. Deploy the code using Azure DevOps, GitHub Actions, or the Azure CLI

## Project Structure

- `public/` - Static web assets
- `server.js` - Express.js server implementation
- `.env` - Environment configuration

## Future Enhancements

1. Add conversation history with Azure Cosmos DB
2. Implement authentication
3. Add user feedback mechanism
4. Customize the grumpy persona with more personality traits
5. Integrate with Azure AI Search for domain-specific knowledge
