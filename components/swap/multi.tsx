import React, { useEffect, useState } from "react";
import { useConnect } from "@stacks/connect-react";
import { StacksMainnet } from "@stacks/network";
import {
  AnchorMode,
  Pc,
  PostConditionMode,
  principalCV,
  uintCV,
} from "@stacks/transactions";
import ConnectWallet, { userSession } from "../stacks-session/connect";
import { Button } from "@components/ui/button";

const MultiSwap = ({ data, lp = false }: any) => {
  const { doContractCall } = useConnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true) }, []);

  const amountIn = Number(data.steps[0].fromAmount * 1000000)
  const royalties = Number(data.options.communityRoyality) + Number(data.options.creatorRoyality)

  console.log(data.steps[0])

  let ft = ''
  let sendingContract = ''
  const contractAddress = data.steps[0].fromToken
  const firstAction = data.steps[0].action
  if (contractAddress === "SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS.wrapped-charisma") {
    ft = 'index-token'
    sendingContract = 'SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS.liquid-staked-charisma'
  } else if (contractAddress === "SP3NE50GEXFG9SZGTT51P40X2CKYSZ5CC4ZTZ7A2G.welshcorgicoin-token") {
    ft = 'welshcorgicoin'
    sendingContract = 'SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS.liquid-staked-welsh-v2'
  }

  function swap() {
    const sender = userSession.loadUserData().profile.stxAddress.mainnet
    doContractCall({
      network: new StacksMainnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS",
      contractName: 'arb-cha-launch-1',//firstAction === 'SWAP' ? 'arb-cha-launch-1' : 'arb-cha-launch-2', //lp ? "arb-and-micro-lp-add-test-2" : "arbitrage-w-s-sw-w-zf",
      functionName: "execute-strategy",
      functionArgs: [uintCV(amountIn)], //uintCV(1000000), uintCV(9070017), uintCV(960000), uintCV(8707216)
      postConditionMode: PostConditionMode.Allow,
      postConditions: [
        // Pc.principal(sender).willSendEq(amountIn).ft(contractAddress, ft),
        // Pc.principal('SP1Y5YSTAHZ88XYK1VPDH24GY0HPX5J4JECTMY4A1.univ2-core').willSendGte(1).ustx(),
        // Pc.principal(sender).willSendGte(1).ustx(),
        // Pc.principal('SP1Y5YSTAHZ88XYK1VPDH24GY0HPX5J4JECTMY4A1.univ2-core').willSendGte(amountIn).ft("SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS.liquid-staked-welsh-v2", 'liquid-staked-token'),
        // Pc.principal(sender).willSendEq(amountIn).ft("SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS.liquid-staked-welsh-v2", 'liquid-staked-token'),
        // Pc.principal(sendingContract).willSendGte(amountIn).ft(contractAddress, ft),
      ],
      onFinish: (data) => {
        console.log("onFinish:", data);
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  if (!mounted || !userSession.isUserSignedIn()) {
    return <ConnectWallet />;
  }

  return (
    <Button variant="ghost" className='text-primary hover:bg-white hover:text-primary z-30' onClick={swap}>Execute Strategy</Button>
  );
};

export default MultiSwap;
