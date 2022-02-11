[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "idPic",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "idBid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "rating",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "action",
				"type": "string"
			}
		],
		"name": "PictureBid",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "creatorfee",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "action",
				"type": "string"
			}
		],
		"name": "PictureDeal",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "posx",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "posy",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "formerOwner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newPrice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "coinToken",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newColor",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newUrl",
				"type": "string"
			}
		],
		"name": "PixTransfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "agreeMaxBid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "agreeWantedPrice",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bids",
		"outputs": [
			{
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "picture",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "stake",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_xs",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_ys",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_xe",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_ye",
				"type": "uint256"
			}
		],
		"name": "createPicture",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "depos",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getAllo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "_xpos",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_ypos",
				"type": "uint256[]"
			}
		],
		"name": "getPayment",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getPicture",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "xStart",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "yStart",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "xSize",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ySize",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "lastPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "maxPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "wantedPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "creationCost",
						"type": "uint256"
					}
				],
				"internalType": "struct theboard.Picture",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_x",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_y",
				"type": "uint256"
			}
		],
		"name": "getPicturePixel",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "xpos",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ypos",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "color",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "url",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					}
				],
				"internalType": "struct theboard.Pixel",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_x",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_y",
				"type": "uint256"
			}
		],
		"name": "getPix",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "xpos",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ypos",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "color",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "url",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					}
				],
				"internalType": "struct theboard.Pixel",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_xs",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_ys",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_xe",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_ye",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "isOwnedBlock",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pictureBids",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "picturePixels",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "xpos",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ypos",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "color",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "url",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pictures",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "xStart",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "yStart",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "xSize",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ySize",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "lastPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "wantedPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "creationCost",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pixels",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "xpos",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ypos",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "color",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "url",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "_xpos",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_ypos",
				"type": "uint256[]"
			},
			{
				"internalType": "string[]",
				"name": "_color",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "_url",
				"type": "string[]"
			}
		],
		"name": "purchaseWithCoin",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "_xpos",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_ypos",
				"type": "uint256[]"
			},
			{
				"internalType": "string[]",
				"name": "_color",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "_url",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "_maxPayment",
				"type": "uint256"
			}
		],
		"name": "purchaseWithToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_bidSumm",
				"type": "uint256"
			}
		],
		"name": "setBid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_wanted",
				"type": "uint256"
			}
		],
		"name": "setWantedPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idBid",
				"type": "uint256"
			}
		],
		"name": "unsetBid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]