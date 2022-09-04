<p align="center">
  <a href="https://decent.land">
    <img src="./img/new-logo.png" height="200">
  </a>
  <h3 align="center"><code>@decentdotland/gate-resolver</code></h3>
  <p align="center">Tickets for Tribuses</p>
</p>

## Synopsis
Gate Resolvers are "tickets" with pre-defined logic to validate the user's ability to join a new Tribus. Gate resolvers make easier to deploy 
new Tribuses (or scale existing Tribuses) with new ticketing logics without changing the Tribus' smart contract code.

## Build and Run

```console
git pull https://github.com/decentldotland/gate-resolver.git

cd gate-resolver

npm install && npm start

```

## Deployed Gate Resolvers
All of the Gate Resolvers are deployed on NEAR testnet

| Name  | About | Source Code |
| ------------- |-------------| -------------|
| `Gate Resolver 1`     | ticketing measured by user's ERC20s balances | [./contracts/gate-resolver-1.js](./contracts/gate-resolver-1.js) |

## License
This project is licensed under the [MIT license](./LICENSE)
