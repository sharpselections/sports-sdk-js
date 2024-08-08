# `@sports-sdk/rotowire`

This package provides clients for interacting with the RotoWire API with typed request parameters and responses.

### Install
```shell
npm i @sports-sdk/rotowire
```

#### Feeds Included
**You will need a RW API key to interact with this API** 

The sports
and endpoints supported in this package align with use cases needed at the time of writing.

| Sport | Players            | News               | Injuries           | Lineups            |
|-------|--------------------|--------------------|--------------------|--------------------|
| EPL   | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| MLB   | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| NBA   | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| NCAAF | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | N/A                |
| NFL   | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | N/A                |
| NHL   | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | N/A                |


### Usage
#### Creating clients
```typescript
import {RotowireClient} from "@sports-sdk/rotowire";
import {Sport} from "@sports-sdk/core";

// client with RW API token retrieved from environment variable ROTOWIRE_TOKEN
const client = new RotowireClient(Sport.NFL);

// client with RW API token passed into constructor
const clientWithToken = new RotowireClient(Sport.NFL, "rotowire-api-token");
```
#### Retrieving data
````typescript
const news = client.getNews();
// date parameter
const newsOnDate = client.getNews({
    date: "2024-07-04"
});

const injuries = client.getInjuries();

const lineups = client.getLineups();
// date parameter
const lineupsOnDate = client.getLineups({
    date: "2024-07-04"
});
````
#### Have additional fields? No problem
```typescript
import {RotowireClient, MLBNewsResponse, MLBPlayer, MLBUpdates} from "@sports-sdk/rotowire";

interface MyMLBPlayer extends MLBPlayer {
    SomeOtherId: string;
}
interface MyMLBUpdates extends Omit<MLBUpdates, "Player"> {
    Player: MyMLBPlayer;
}

interface MyMLBNewsResponse extends Omit<MLBNewsResponse, "Updates">{
    Updates: Array<MyMLBUpdates>;
} 
const client = new RotowireClient(Sport.MLB);
const myNews = client.getNews<MyMLBNewsResponse>();
```
