import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQueryClient } from "@tanstack/react-query";
import { FC, FormEvent, useState } from "react";
// Internal assets
import Copy from "@/assets/icons/copy.svg";
import ExternalLink from "@/assets/icons/external-link.svg";
import Paper from "@/assets/placeholders/paper.png";
// Internal utils
import { aptosClient } from "@/utils/aptosClient";
import { truncateAddress } from "@/utils/truncateAddress";
// Internal hooks
import { useGetCollectionData } from "@/hooks/useGetCollectionData";
import { useGetMintFee } from "@/hooks/useGetMintFee";
import { useGetAccountBalance } from "@/hooks/useGetAccountBalance";
// Internal components
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { toast } from "@/components/ui/use-toast";
import { Socials } from "@/pages/Mint/components/Socials";
// Internal constants
import { NETWORK } from "@/constants";
// Internal config
import { config } from "@/config";
// Internal enrty functions
import { mintNFT } from "@/entry-functions/mint_nft";

interface HeroSectionProps {}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const { data } = useGetCollectionData();
  const { data: mintFee = 0 } = useGetMintFee();
  const queryClient = useQueryClient();
  const { account, signAndSubmitTransaction } = useWallet();
  const { data: accountBalance } = useGetAccountBalance(account?.address);

  const { collection } = data ?? {};

  const mintNft = async (e: FormEvent) => {
    e.preventDefault();
    if (!collection?.collection_id) return;
    if (!account) {
      toast({ variant: "destructive", title: "Error", description: "You must connect a wallet before minting" });
      return;
    }
    if (accountBalance !== undefined && accountBalance < mintFee) {
      toast({ variant: "destructive", title: "Error", description: "You do not have enough funds to mint" });
      return;
    }

    const response = await signAndSubmitTransaction(
      mintNFT({ collectionId: collection.collection_id, amount: 1 }),
    );
    await aptosClient().waitForTransaction({ transactionHash: response.hash });
    queryClient.invalidateQueries();
  };

  return (
    <section className="hero-container flex flex-col md:flex-row gap-4 md:gap-6 px-3 md:px-4 max-w-screen-xl mx-auto w-full bg-white bg-opacity-90 backdrop-blur-sm p-3 md:p-4 rounded-lg border-2 border-black shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300">
      <div className="w-full md:basis-2/5 relative">
        <Image
          src={collection?.cdn_asset_uris.cdn_image_uri ?? collection?.cdn_asset_uris.cdn_animation_uri ?? Paper}
          rounded
          className="w-full aspect-square object-cover self-center filter brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button 
            className="h-12 md:h-16 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 border-black" 
            variant="secondary"
            onClick={() => toast({ title: "Coming Soon", description: "The drawing feature will be available soon!" })}
          >
            Tear a page from the 📒
          </Button>
        </div>
      </div>
      <div className="basis-full md:basis-3/5 flex flex-col gap-3 md:gap-4">
        <h1 className="title-md">{collection?.collection_name ?? config.defaultCollection?.name}</h1>
        <Socials />
        <p className="body-sm">{collection?.description ?? config.defaultCollection?.description}</p>

        <Card className="shadow-[0_4px_15px_rgb(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgb(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300">
          <CardContent
            fullPadding
            className="flex flex-col md:flex-row gap-3 md:gap-4 md:justify-between items-start md:items-center flex-wrap p-3 md:p-4"
          >
            <form onSubmit={mintNft} className="flex flex-col md:flex-row gap-3 md:gap-4 w-full">
              <Button className="h-12 md:h-16 w-full text-base md:text-lg" type="submit">
                Mint my Page
              </Button>
              {!!mintFee && (
                <span className="whitespace-nowrap text-secondary-text body-sm self-center">{mintFee} APT</span>
              )}
            </form>
          </CardContent>
        </Card>
        
        <div className="flex flex-col gap-3 md:gap-4 mt-1 md:mt-2">
          <p className="body-sm text-secondary-text">{config.defaultCollection?.subDescription}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:gap-x-2 items-start md:items-center flex-wrap justify-between">
          <p className="whitespace-nowrap body-sm-semibold">Collection Address</p>

          <div className="flex flex-wrap gap-2">
            <AddressButton address={collection?.collection_id ?? ""} />
            <a
              className={buttonVariants({ variant: "link", className: "text-sm md:text-base" })}
              target="_blank"
              href={`https://explorer.aptoslabs.com/account/${collection?.collection_id}?network=${NETWORK}`}
            >
              View on Explorer <Image src={ExternalLink} className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const AddressButton: FC<{ address: string }> = ({ address }) => {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    if (copied) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <Button onClick={onCopy} className="whitespace-nowrap flex gap-1 px-0 py-0" variant="link">
      {copied ? (
        "Copied!"
      ) : (
        <>
          {truncateAddress(address)}
          <Image src={Copy} className="dark:invert" />
        </>
      )}
    </Button>
  );
};
