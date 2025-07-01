

import { getBalanceTool } from "./getBalance";

export interface ToolConfig<T = any> {
  definition: {
    type: "function";
    function: {
      name: string;
      description: string;
      parameters: {
        type: "object";
        properties: Record<string, unknown>;
        required: string[];
      };
    };
  };
  handler: (args: T) => Promise<any>;
}

export const tools: Record<string, ToolConfig> = {
  // == READ == \\
  get_balance: getBalanceTool,
  get_wallet_address: getWalletAddressTool,
  get_contract_abi: getContractAbiTool,
  read_contract: readContractTool,
  get_transaction_receipt: getTransactionReceiptTool,
  get_token_balance: getTokenBalanceTool,
  get_contract_bytecode: getContractBytecodeTool,


  // == WRITE == \\
  deploy_erc20: deployErc20Tool,
  deploy_erc721: deployErc721Tool,
  mint_nft: mintNftTool,
  swap_tokens: swapTokensTool,
  get_token_price: getTokenPriceTool,
  get_market_trends: getMarketTrendsTool,
  approve_token: approveTokenTool,
  airdrop_token: airdropTokenTool,

  // Add more tools here...
};
