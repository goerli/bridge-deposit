const ethers = require("ethers")
const Wallet = ethers.Wallet
const providers = ethers.providers
const path = require("path")
const fs = require("fs")

let bridge
let wallet 
let provider

// specify network
let network = 'kovan' // 'ropsten', 'rinkeby'

const sendTx = async(data, value) => {
    let nonce = await wallet.getTransactionCount("pending")
    let transaction = {
        nonce: nonce,
        gasLimit: 6700000,
        gasPrice: ethers.utils.bigNumberify("20902747399"),
        to: bridge.address,
        value: value,
        data: data
    }

    let signedTransaction = wallet.sign(transaction)
    try {
        let tx = await provider.sendTransaction(signedTransaction)
 		console.log(`sending ${tx.hash} to ${network}...`)
        return tx
    } catch (e) {
        console.error(e)
    }
}

const deposit = async() => {
	provider = ethers.getDefaultProvider(network)

	// paste your private key that contains ether on `network` that you want to bridge
	wallet = new Wallet("yourprivatekey", provider)

	let fp = path.resolve("./abi/Foreign.abi")
	let bridgeAbi = fs.readFileSync(fp, 'utf8')

	let address = "0x39ba0e94e9105ad6340819429bee2ddc09ff8201"

	bridge = (new ethers.Contract(address, bridgeAbi, provider)).connect(wallet)

	let abi = new ethers.utils.AbiCoder()
	let args = abi.encode(["address", "uint256"], [wallet.address, 6284]).slice(2)
	let data = `0x47e7ef24${args}`

	let value = 33 * 10
	let tx = await sendTx(data, value)
	let txDone = await provider.waitForTransaction(tx.hash)
	let receipt = await provider.getTransactionReceipt(tx.hash)

	if(receipt.status == 1) console.log("success!\n", receipt.logs[0].topics)
	else console.error("could not send tx")
}

deposit()