# bridge deposit script
deposit on ropsten, rinkeby, or kovan and get a withdraw on goerli :) our goerli bridge contract is at `0xa8485dc30d88296010a5b06f28bfbb7e22071023`

### use
you will need nodejs and npm
```
git clone https://github.com/goerli/bridge-deposit.git
cd bridge-deposit
npm i
```

now, open index.js in your favourite text editor. specify the network you like on line 12. paste your private key containing ether on this network into "yourprivatekey" on line 39. lines 44-46 are the address of the contracts on each of the testnets. uncomment out the one you'd like.
change the value of wei on line 54 to your preferred amount. `10 ** 18 = 1 ether`
 now, simply `node deposit.js` and you should see the tx being sent.

the bridge is currently running on a server, it will pick up on your deposit, and will send you goeth from the goerli bridge contract. check it out at https://explorer.goerli.net/account/0xa8485dc30d88296010a5b06f28bfbb7e22071023
