export type SourceTreeNode<Id extends string> =
  | { kind: 'folder'; label: string; defaultOpen?: boolean; children: SourceTreeNode<Id>[] }
  | { kind: 'file'; id: Id; label: string };

