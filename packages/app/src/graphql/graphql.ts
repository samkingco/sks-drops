/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type EditionPhoto = {
  __typename?: 'EditionPhoto';
  currentOwners: Array<Wallet>;
  id: Scalars['ID'];
  maxEditions: Scalars['BigInt'];
  originalId: Scalars['BigInt'];
  purchasedBy: Array<Wallet>;
  totalPurchased: Scalars['BigInt'];
  uri?: Maybe<Scalars['String']>;
};


export type EditionPhotoCurrentOwnersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Wallet_Filter>;
};


export type EditionPhotoPurchasedByArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Wallet_Filter>;
};

export type EditionPhoto_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  currentOwners?: InputMaybe<Array<Scalars['String']>>;
  currentOwners_?: InputMaybe<Wallet_Filter>;
  currentOwners_contains?: InputMaybe<Array<Scalars['String']>>;
  currentOwners_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  currentOwners_not?: InputMaybe<Array<Scalars['String']>>;
  currentOwners_not_contains?: InputMaybe<Array<Scalars['String']>>;
  currentOwners_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  maxEditions?: InputMaybe<Scalars['BigInt']>;
  maxEditions_gt?: InputMaybe<Scalars['BigInt']>;
  maxEditions_gte?: InputMaybe<Scalars['BigInt']>;
  maxEditions_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxEditions_lt?: InputMaybe<Scalars['BigInt']>;
  maxEditions_lte?: InputMaybe<Scalars['BigInt']>;
  maxEditions_not?: InputMaybe<Scalars['BigInt']>;
  maxEditions_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originalId?: InputMaybe<Scalars['BigInt']>;
  originalId_gt?: InputMaybe<Scalars['BigInt']>;
  originalId_gte?: InputMaybe<Scalars['BigInt']>;
  originalId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originalId_lt?: InputMaybe<Scalars['BigInt']>;
  originalId_lte?: InputMaybe<Scalars['BigInt']>;
  originalId_not?: InputMaybe<Scalars['BigInt']>;
  originalId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  purchasedBy?: InputMaybe<Array<Scalars['String']>>;
  purchasedBy_?: InputMaybe<Wallet_Filter>;
  purchasedBy_contains?: InputMaybe<Array<Scalars['String']>>;
  purchasedBy_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  purchasedBy_not?: InputMaybe<Array<Scalars['String']>>;
  purchasedBy_not_contains?: InputMaybe<Array<Scalars['String']>>;
  purchasedBy_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  totalPurchased?: InputMaybe<Scalars['BigInt']>;
  totalPurchased_gt?: InputMaybe<Scalars['BigInt']>;
  totalPurchased_gte?: InputMaybe<Scalars['BigInt']>;
  totalPurchased_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalPurchased_lt?: InputMaybe<Scalars['BigInt']>;
  totalPurchased_lte?: InputMaybe<Scalars['BigInt']>;
  totalPurchased_not?: InputMaybe<Scalars['BigInt']>;
  totalPurchased_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  uri?: InputMaybe<Scalars['String']>;
  uri_contains?: InputMaybe<Scalars['String']>;
  uri_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_ends_with?: InputMaybe<Scalars['String']>;
  uri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  uri_gt?: InputMaybe<Scalars['String']>;
  uri_gte?: InputMaybe<Scalars['String']>;
  uri_in?: InputMaybe<Array<Scalars['String']>>;
  uri_lt?: InputMaybe<Scalars['String']>;
  uri_lte?: InputMaybe<Scalars['String']>;
  uri_not?: InputMaybe<Scalars['String']>;
  uri_not_contains?: InputMaybe<Scalars['String']>;
  uri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  uri_not_in?: InputMaybe<Array<Scalars['String']>>;
  uri_not_starts_with?: InputMaybe<Scalars['String']>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  uri_starts_with?: InputMaybe<Scalars['String']>;
  uri_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum EditionPhoto_OrderBy {
  CurrentOwners = 'currentOwners',
  Id = 'id',
  MaxEditions = 'maxEditions',
  OriginalId = 'originalId',
  PurchasedBy = 'purchasedBy',
  TotalPurchased = 'totalPurchased',
  Uri = 'uri'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type OriginalPhoto = {
  __typename?: 'OriginalPhoto';
  currentOwner?: Maybe<Wallet>;
  editionId: Scalars['BigInt'];
  id: Scalars['ID'];
  purchasedAt?: Maybe<Scalars['BigInt']>;
  purchasedBy?: Maybe<Wallet>;
  uri?: Maybe<Scalars['String']>;
};

export type OriginalPhoto_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  currentOwner?: InputMaybe<Scalars['String']>;
  currentOwner_?: InputMaybe<Wallet_Filter>;
  currentOwner_contains?: InputMaybe<Scalars['String']>;
  currentOwner_contains_nocase?: InputMaybe<Scalars['String']>;
  currentOwner_ends_with?: InputMaybe<Scalars['String']>;
  currentOwner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentOwner_gt?: InputMaybe<Scalars['String']>;
  currentOwner_gte?: InputMaybe<Scalars['String']>;
  currentOwner_in?: InputMaybe<Array<Scalars['String']>>;
  currentOwner_lt?: InputMaybe<Scalars['String']>;
  currentOwner_lte?: InputMaybe<Scalars['String']>;
  currentOwner_not?: InputMaybe<Scalars['String']>;
  currentOwner_not_contains?: InputMaybe<Scalars['String']>;
  currentOwner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currentOwner_not_ends_with?: InputMaybe<Scalars['String']>;
  currentOwner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentOwner_not_in?: InputMaybe<Array<Scalars['String']>>;
  currentOwner_not_starts_with?: InputMaybe<Scalars['String']>;
  currentOwner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentOwner_starts_with?: InputMaybe<Scalars['String']>;
  currentOwner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  editionId?: InputMaybe<Scalars['BigInt']>;
  editionId_gt?: InputMaybe<Scalars['BigInt']>;
  editionId_gte?: InputMaybe<Scalars['BigInt']>;
  editionId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  editionId_lt?: InputMaybe<Scalars['BigInt']>;
  editionId_lte?: InputMaybe<Scalars['BigInt']>;
  editionId_not?: InputMaybe<Scalars['BigInt']>;
  editionId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  purchasedAt?: InputMaybe<Scalars['BigInt']>;
  purchasedAt_gt?: InputMaybe<Scalars['BigInt']>;
  purchasedAt_gte?: InputMaybe<Scalars['BigInt']>;
  purchasedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  purchasedAt_lt?: InputMaybe<Scalars['BigInt']>;
  purchasedAt_lte?: InputMaybe<Scalars['BigInt']>;
  purchasedAt_not?: InputMaybe<Scalars['BigInt']>;
  purchasedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  purchasedBy?: InputMaybe<Scalars['String']>;
  purchasedBy_?: InputMaybe<Wallet_Filter>;
  purchasedBy_contains?: InputMaybe<Scalars['String']>;
  purchasedBy_contains_nocase?: InputMaybe<Scalars['String']>;
  purchasedBy_ends_with?: InputMaybe<Scalars['String']>;
  purchasedBy_ends_with_nocase?: InputMaybe<Scalars['String']>;
  purchasedBy_gt?: InputMaybe<Scalars['String']>;
  purchasedBy_gte?: InputMaybe<Scalars['String']>;
  purchasedBy_in?: InputMaybe<Array<Scalars['String']>>;
  purchasedBy_lt?: InputMaybe<Scalars['String']>;
  purchasedBy_lte?: InputMaybe<Scalars['String']>;
  purchasedBy_not?: InputMaybe<Scalars['String']>;
  purchasedBy_not_contains?: InputMaybe<Scalars['String']>;
  purchasedBy_not_contains_nocase?: InputMaybe<Scalars['String']>;
  purchasedBy_not_ends_with?: InputMaybe<Scalars['String']>;
  purchasedBy_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  purchasedBy_not_in?: InputMaybe<Array<Scalars['String']>>;
  purchasedBy_not_starts_with?: InputMaybe<Scalars['String']>;
  purchasedBy_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  purchasedBy_starts_with?: InputMaybe<Scalars['String']>;
  purchasedBy_starts_with_nocase?: InputMaybe<Scalars['String']>;
  uri?: InputMaybe<Scalars['String']>;
  uri_contains?: InputMaybe<Scalars['String']>;
  uri_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_ends_with?: InputMaybe<Scalars['String']>;
  uri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  uri_gt?: InputMaybe<Scalars['String']>;
  uri_gte?: InputMaybe<Scalars['String']>;
  uri_in?: InputMaybe<Array<Scalars['String']>>;
  uri_lt?: InputMaybe<Scalars['String']>;
  uri_lte?: InputMaybe<Scalars['String']>;
  uri_not?: InputMaybe<Scalars['String']>;
  uri_not_contains?: InputMaybe<Scalars['String']>;
  uri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  uri_not_in?: InputMaybe<Array<Scalars['String']>>;
  uri_not_starts_with?: InputMaybe<Scalars['String']>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  uri_starts_with?: InputMaybe<Scalars['String']>;
  uri_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum OriginalPhoto_OrderBy {
  CurrentOwner = 'currentOwner',
  EditionId = 'editionId',
  Id = 'id',
  PurchasedAt = 'purchasedAt',
  PurchasedBy = 'purchasedBy',
  Uri = 'uri'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  editionPhoto?: Maybe<EditionPhoto>;
  editionPhotos: Array<EditionPhoto>;
  originalPhoto?: Maybe<OriginalPhoto>;
  originalPhotos: Array<OriginalPhoto>;
  rootsPhoto?: Maybe<RootsPhoto>;
  rootsPhotos: Array<RootsPhoto>;
  settings: Array<Settings>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  wallet?: Maybe<Wallet>;
  wallets: Array<Wallet>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryEditionPhotoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEditionPhotosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EditionPhoto_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EditionPhoto_Filter>;
};


export type QueryOriginalPhotoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOriginalPhotosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OriginalPhoto_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OriginalPhoto_Filter>;
};


export type QueryRootsPhotoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRootsPhotosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RootsPhoto_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RootsPhoto_Filter>;
};


export type QuerySettingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Settings_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Settings_Filter>;
};


export type QueryTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transfer_Filter>;
};


export type QueryWalletArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWalletsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wallet_Filter>;
};

export type RootsPhoto = {
  __typename?: 'RootsPhoto';
  currentOwner: Wallet;
  hasClaimedEdition: Scalars['Boolean'];
  id: Scalars['ID'];
  tokenURI: Scalars['String'];
};

export type RootsPhoto_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  currentOwner?: InputMaybe<Scalars['String']>;
  currentOwner_?: InputMaybe<Wallet_Filter>;
  currentOwner_contains?: InputMaybe<Scalars['String']>;
  currentOwner_contains_nocase?: InputMaybe<Scalars['String']>;
  currentOwner_ends_with?: InputMaybe<Scalars['String']>;
  currentOwner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentOwner_gt?: InputMaybe<Scalars['String']>;
  currentOwner_gte?: InputMaybe<Scalars['String']>;
  currentOwner_in?: InputMaybe<Array<Scalars['String']>>;
  currentOwner_lt?: InputMaybe<Scalars['String']>;
  currentOwner_lte?: InputMaybe<Scalars['String']>;
  currentOwner_not?: InputMaybe<Scalars['String']>;
  currentOwner_not_contains?: InputMaybe<Scalars['String']>;
  currentOwner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currentOwner_not_ends_with?: InputMaybe<Scalars['String']>;
  currentOwner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentOwner_not_in?: InputMaybe<Array<Scalars['String']>>;
  currentOwner_not_starts_with?: InputMaybe<Scalars['String']>;
  currentOwner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentOwner_starts_with?: InputMaybe<Scalars['String']>;
  currentOwner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hasClaimedEdition?: InputMaybe<Scalars['Boolean']>;
  hasClaimedEdition_in?: InputMaybe<Array<Scalars['Boolean']>>;
  hasClaimedEdition_not?: InputMaybe<Scalars['Boolean']>;
  hasClaimedEdition_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  tokenURI?: InputMaybe<Scalars['String']>;
  tokenURI_contains?: InputMaybe<Scalars['String']>;
  tokenURI_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_ends_with?: InputMaybe<Scalars['String']>;
  tokenURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_gt?: InputMaybe<Scalars['String']>;
  tokenURI_gte?: InputMaybe<Scalars['String']>;
  tokenURI_in?: InputMaybe<Array<Scalars['String']>>;
  tokenURI_lt?: InputMaybe<Scalars['String']>;
  tokenURI_lte?: InputMaybe<Scalars['String']>;
  tokenURI_not?: InputMaybe<Scalars['String']>;
  tokenURI_not_contains?: InputMaybe<Scalars['String']>;
  tokenURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenURI_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_starts_with?: InputMaybe<Scalars['String']>;
  tokenURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum RootsPhoto_OrderBy {
  CurrentOwner = 'currentOwner',
  HasClaimedEdition = 'hasClaimedEdition',
  Id = 'id',
  TokenUri = 'tokenURI'
}

export type Settings = {
  __typename?: 'Settings';
  id: Scalars['ID'];
  maxEditions: Scalars['BigInt'];
  priceEdition: Scalars['BigInt'];
  priceOriginal: Scalars['BigInt'];
};

export type Settings_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  maxEditions?: InputMaybe<Scalars['BigInt']>;
  maxEditions_gt?: InputMaybe<Scalars['BigInt']>;
  maxEditions_gte?: InputMaybe<Scalars['BigInt']>;
  maxEditions_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxEditions_lt?: InputMaybe<Scalars['BigInt']>;
  maxEditions_lte?: InputMaybe<Scalars['BigInt']>;
  maxEditions_not?: InputMaybe<Scalars['BigInt']>;
  maxEditions_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  priceEdition?: InputMaybe<Scalars['BigInt']>;
  priceEdition_gt?: InputMaybe<Scalars['BigInt']>;
  priceEdition_gte?: InputMaybe<Scalars['BigInt']>;
  priceEdition_in?: InputMaybe<Array<Scalars['BigInt']>>;
  priceEdition_lt?: InputMaybe<Scalars['BigInt']>;
  priceEdition_lte?: InputMaybe<Scalars['BigInt']>;
  priceEdition_not?: InputMaybe<Scalars['BigInt']>;
  priceEdition_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  priceOriginal?: InputMaybe<Scalars['BigInt']>;
  priceOriginal_gt?: InputMaybe<Scalars['BigInt']>;
  priceOriginal_gte?: InputMaybe<Scalars['BigInt']>;
  priceOriginal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  priceOriginal_lt?: InputMaybe<Scalars['BigInt']>;
  priceOriginal_lte?: InputMaybe<Scalars['BigInt']>;
  priceOriginal_not?: InputMaybe<Scalars['BigInt']>;
  priceOriginal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Settings_OrderBy {
  Id = 'id',
  MaxEditions = 'maxEditions',
  PriceEdition = 'priceEdition',
  PriceOriginal = 'priceOriginal'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  editionPhoto?: Maybe<EditionPhoto>;
  editionPhotos: Array<EditionPhoto>;
  originalPhoto?: Maybe<OriginalPhoto>;
  originalPhotos: Array<OriginalPhoto>;
  rootsPhoto?: Maybe<RootsPhoto>;
  rootsPhotos: Array<RootsPhoto>;
  settings: Array<Settings>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  wallet?: Maybe<Wallet>;
  wallets: Array<Wallet>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionEditionPhotoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEditionPhotosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EditionPhoto_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EditionPhoto_Filter>;
};


export type SubscriptionOriginalPhotoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionOriginalPhotosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OriginalPhoto_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OriginalPhoto_Filter>;
};


export type SubscriptionRootsPhotoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRootsPhotosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RootsPhoto_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RootsPhoto_Filter>;
};


export type SubscriptionSettingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Settings_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Settings_Filter>;
};


export type SubscriptionTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transfer_Filter>;
};


export type SubscriptionWalletArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWalletsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wallet_Filter>;
};

export type Transfer = {
  __typename?: 'Transfer';
  from: Wallet;
  id: Scalars['ID'];
  rootsId?: Maybe<Scalars['BigInt']>;
  timestamp: Scalars['BigInt'];
  to: Wallet;
  tokenId: Scalars['BigInt'];
  txHash: Scalars['Bytes'];
  txType: TransferType;
};

export enum TransferType {
  Burn = 'Burn',
  Purchase = 'Purchase',
  RootsClaim = 'RootsClaim',
  Transfer = 'Transfer'
}

export type Transfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  from?: InputMaybe<Scalars['String']>;
  from_?: InputMaybe<Wallet_Filter>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  rootsId?: InputMaybe<Scalars['BigInt']>;
  rootsId_gt?: InputMaybe<Scalars['BigInt']>;
  rootsId_gte?: InputMaybe<Scalars['BigInt']>;
  rootsId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rootsId_lt?: InputMaybe<Scalars['BigInt']>;
  rootsId_lte?: InputMaybe<Scalars['BigInt']>;
  rootsId_not?: InputMaybe<Scalars['BigInt']>;
  rootsId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['String']>;
  to_?: InputMaybe<Wallet_Filter>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txType?: InputMaybe<TransferType>;
  txType_in?: InputMaybe<Array<TransferType>>;
  txType_not?: InputMaybe<TransferType>;
  txType_not_in?: InputMaybe<Array<TransferType>>;
};

export enum Transfer_OrderBy {
  From = 'from',
  Id = 'id',
  RootsId = 'rootsId',
  Timestamp = 'timestamp',
  To = 'to',
  TokenId = 'tokenId',
  TxHash = 'txHash',
  TxType = 'txType'
}

export type Wallet = {
  __typename?: 'Wallet';
  address: Scalars['Bytes'];
  editions: Array<EditionPhoto>;
  editionsCount: Scalars['BigInt'];
  id: Scalars['ID'];
  originals: Array<OriginalPhoto>;
  originalsCount: Scalars['BigInt'];
  roots: Array<RootsPhoto>;
};


export type WalletEditionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EditionPhoto_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EditionPhoto_Filter>;
};


export type WalletOriginalsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OriginalPhoto_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OriginalPhoto_Filter>;
};


export type WalletRootsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RootsPhoto_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RootsPhoto_Filter>;
};

export type Wallet_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  editionsCount?: InputMaybe<Scalars['BigInt']>;
  editionsCount_gt?: InputMaybe<Scalars['BigInt']>;
  editionsCount_gte?: InputMaybe<Scalars['BigInt']>;
  editionsCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  editionsCount_lt?: InputMaybe<Scalars['BigInt']>;
  editionsCount_lte?: InputMaybe<Scalars['BigInt']>;
  editionsCount_not?: InputMaybe<Scalars['BigInt']>;
  editionsCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  editions_?: InputMaybe<EditionPhoto_Filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  originalsCount?: InputMaybe<Scalars['BigInt']>;
  originalsCount_gt?: InputMaybe<Scalars['BigInt']>;
  originalsCount_gte?: InputMaybe<Scalars['BigInt']>;
  originalsCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originalsCount_lt?: InputMaybe<Scalars['BigInt']>;
  originalsCount_lte?: InputMaybe<Scalars['BigInt']>;
  originalsCount_not?: InputMaybe<Scalars['BigInt']>;
  originalsCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originals_?: InputMaybe<OriginalPhoto_Filter>;
  roots_?: InputMaybe<RootsPhoto_Filter>;
};

export enum Wallet_OrderBy {
  Address = 'address',
  Editions = 'editions',
  EditionsCount = 'editionsCount',
  Id = 'id',
  Originals = 'originals',
  OriginalsCount = 'originalsCount',
  Roots = 'roots'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type OwnershipQueryVariables = Exact<{ [key: string]: never; }>;


export type OwnershipQuery = { __typename?: 'Query', wallets: Array<{ __typename?: 'Wallet', address: any, editionsCount: any, originalsCount: any, roots: Array<{ __typename?: 'RootsPhoto', id: string }> }> };


export const OwnershipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Ownership"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"editionsCount"}},{"kind":"Field","name":{"kind":"Name","value":"originalsCount"}},{"kind":"Field","name":{"kind":"Name","value":"roots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<OwnershipQuery, OwnershipQueryVariables>;