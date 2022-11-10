/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query Ownership {\n    wallets {\n      address\n      roots {\n        id\n      }\n      ice64Originals {\n        id\n      }\n      ice64Editions {\n        id\n      }\n    }\n  }\n": types.OwnershipDocument,
};

export function graphql(source: "\n  query Ownership {\n    wallets {\n      address\n      roots {\n        id\n      }\n      ice64Originals {\n        id\n      }\n      ice64Editions {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query Ownership {\n    wallets {\n      address\n      roots {\n        id\n      }\n      ice64Originals {\n        id\n      }\n      ice64Editions {\n        id\n      }\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;