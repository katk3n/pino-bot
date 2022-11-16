# pino-bot

pino-bot is a LINE bot that communicates with simple text messages.
The name "pino" derives from the name of my friends' cat.

## Technologies

- Azure
  - Azure functions
- LINE
  - LINE bot SDK

## Development Tips

### Developing TimerTrigger functions under local environment

AzureWebStorage is required to run TimerTrigger functions.
In local environment, you can use [Azurite](https://learn.microsoft.com/ja-jp/azure/storage/common/storage-use-azurite?tabs=visual-studio) for Azure Storage Emulator.

#### Install Azurite

```
$ npm install -g azurite
```

### Run Azurite

```
$ azurite --silent
```

### Setting for using Azurite

Add `AzureWebJobsStorage` property to `local.settings.json`

```json:local.settings.json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true"
  }
}
```
