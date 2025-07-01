import { ToolConfig } from "./allTools";
import { createViemWalletClient } from "../viem/createViemWalletClient";
import { parseAbi } from "viem";

interface MintNftArgs {
  contractAddress: string;
  recipient: string;
  tokenId: number;
  tokenUri: string;
}

export const mintNftTool: ToolConfig<MintNftArgs> = {
  definition: {
    type: "function",
    function: {
      name: "mint_nft",
      description: "Mint an NFT to a recipient",
      parameters: {
        type: "object",
        properties: {
          contractAddress: {
            type: "string",
            pattern: "^0x[a-fA-F0-9]{40}$"
          },
          recipient: {
            type: "string",
            pattern: "^0x[a-fA-F0-9]{40}$"
          },
          tokenId: { type: "number" },
          tokenUri: { type: "string" }
        },
        required: ["contractAddress", "recipient", "tokenId", "tokenUri"]
      }
    }
  },

  handler: async ({ contractAddress, recipient, tokenId, tokenUri }) => {
    const client = createViemWalletClient();

    // Minimal ABI with minting method: `mint(address to, uint256 tokenId, string memory tokenUri)`
    const abi = parseAbi([
      "function mint(address to, uint256 tokenId, string memory uri) public"
    ]);

    const hash = await client.writeContract({
      address: contractAddress as `0x${string}`,
      abi,
      functionName: "mint",
      args: [recipient, BigInt(tokenId), tokenUri],
    });

    return {
      transactionHash: hash,
      message: `NFT minted to ${recipient} with tokenId ${tokenId}`,
    };
  }
};
