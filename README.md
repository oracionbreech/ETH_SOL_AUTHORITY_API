# NOTED API

## Environment Config

In local development, create a `.env` file and add values accordingly

## Install all dependencies

### `npm install`

## Start Development Mode - Make sure your aws credentials are configured for noted aws account

### `npm run start:dev`

## Run test

### `npm run test`

## Run lint

### `npm run lint`

## Run lint fix

### `npm run lint:fix`

## Run ES management script (Should be included in the CI/CD for managing ES domains. This will do for now.)

### `npm run esService`

- `List entities` - List all indeces with alias in a table
- `Add new Index` - Adds new index base on the file (used as alias as well) mapping specified.
- `Delete Index` - Removed index and alias associated with the deleted index.
- `Update Index Mappings (New fields only)` - Update current mapping index if the change will be adding new fields.
- `Migrate To New Index Mappings` - Migrate the old index (e.g. vendor_v1) to the new index (e.g. vendor_v2). Use this if the index mapping changes will not succeed using update index command.

## Run vendor keyword checking to make sure vendor will be unique for each parsed email body

### `npm run esCheckVendorKeywords`

## Updating email templates should be done in email_templates directory and it will automatically build and deployed in our CI/CD

## Email template conditional

https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-personalized-email-advanced.html
