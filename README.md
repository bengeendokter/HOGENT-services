# Het project opstarten

## Online versie
Deze API draait online via heroku op `https://aanwezigheden.herokuapp.com/api/`

Voor een JWT token te ontvangen stuurt men een `POST` inlog request naar `https://aanwezigheden.herokuapp.com/api/users/login` met volgende body:
```
{"email":"ben.arts@hogent.be", "password":"12345678"}
```

Ook kan de online versie geraadpleegt worden via de [frontend op Netlify](https://aanwezigheden.netlify.app/).
## Lokale versie

Voor een lokale versie van de API voert men na het clonen van de repository eerst volgend commando uit om alle packages te intaleren:
```
yarn install
```

Ook zal men een `mySQL database` nodig hebben en een `.env` file die er als volgt moet uitzien:

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

De API draait nu op [http://localhost:9000](http://localhost:9000) en kan in de browser bekeken worden.

Ook hier kan men toegang krijgen via dezelfde inlog gegevens als de online versie.

### Testen
De testen kunnen uitgevoert worden via:
```
yarn test
```
