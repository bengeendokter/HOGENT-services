# Het project opstarten

## Online versie
Deze web applicatie is online te vinden op [online te vinden op Netlify](https://aanwezigheden.netlify.app/).

De inlog gegevens voor de authenticatie zijn:
```
ben.arts@hogent.be
12345678
```

## Lokale versie

Om een lokale versie van de applicatie voert men na het clonen van de repository eerst volgend commando uit om alle packages te intaleren:
```
yarn install
```

Ook zal men een mySQL server nodig hebben en een `.env` file die er als volgt moet uitzien:

```
NODE_ENV=development
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
DATABASE_NAME=aanwezigheden
JWT_SECRET=ditisnogeenveeltemoeilijkteradensecretdushopelijkisdesitenuveilig
```


Indien de vorige stappen goed uitgevoert zijn kan men een lokale versie draaien via:
```
yarn start
```

De web app draait nu op [http://localhost:3000](http://localhost:3000) en kan in de browser bekeken worden.

### Lokale PWA
Om het PWA aspect van de web app lokaal te testen moet er een build worden gemaakt, dit kan via:
```
yarn build
```

Een lokale versie kan dan opgestart worden via:
```
yarn serve build
```
### Testen
De testen kunnen uitgevoert worden via:
```
yarn test
```