// lib/ipfs/pinata.ts
// Pinata IPFS integration for uploading metadata

import { PinataSDK } from "pinata-web3";

let pinataClient: PinataSDK | null = null;

/**
 * Initialize Pinata client with JWT
 */
export function initPinata(jwt?: string): PinataSDK {
    if (!pinataClient) {
        const pinataJwt = jwt || process.env.PINATA_JWT || process.env.NEXT_PUBLIC_PINATA_JWT;

        if (!pinataJwt) {
            throw new Error("Pinata JWT not configured. Please set PINATA_JWT or NEXT_PUBLIC_PINATA_JWT environment variable.");
        }

        pinataClient = new PinataSDK({
            pinataJwt: pinataJwt,
        });
    }
    return pinataClient;
}

/**
 * Upload JSON metadata to IPFS via Pinata
 */
export async function uploadJSONToIPFS(jsonMetadata: any): Promise<{
    success: boolean;
    ipfsHash?: string;
    ipfsUrl?: string;
    error?: string;
}> {
    try {
        const pinata = initPinata();
        const { IpfsHash } = await pinata.upload.json(jsonMetadata);

        return {
            success: true,
            ipfsHash: IpfsHash,
            ipfsUrl: `https://ipfs.io/ipfs/${IpfsHash}`,
        };
    } catch (error: any) {
        console.error("Failed to upload to IPFS:", error);
        return {
            success: false,
            error: error.message || "Failed to upload to IPFS",
        };
    }
}

/**
 * Upload file/image to IPFS via Pinata
 */
export async function uploadFileToIPFS(file: File): Promise<{
    success: boolean;
    ipfsHash?: string;
    ipfsUrl?: string;
    error?: string;
}> {
    try {
        const pinata = initPinata();
        const { IpfsHash } = await pinata.upload.file(file);

        return {
            success: true,
            ipfsHash: IpfsHash,
            ipfsUrl: `https://ipfs.io/ipfs/${IpfsHash}`,
        };
    } catch (error: any) {
        console.error("Failed to upload file to IPFS:", error);
        return {
            success: false,
            error: error.message || "Failed to upload file to IPFS",
        };
    }
}

/**
 * Upload image from URL to IPFS
 */
export async function uploadImageFromURLToIPFS(imageUrl: string): Promise<{
    success: boolean;
    ipfsHash?: string;
    ipfsUrl?: string;
    error?: string;
}> {
    try {
        // Fetch the image
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const blob = await response.blob();
        const file = new File([blob], "image", { type: blob.type });

        return await uploadFileToIPFS(file);
    } catch (error: any) {
        console.error("Failed to upload image from URL to IPFS:", error);
        return {
            success: false,
            error: error.message || "Failed to upload image from URL to IPFS",
        };
    }
}

export default { uploadJSONToIPFS, uploadFileToIPFS, uploadImageFromURLToIPFS, initPinata };
