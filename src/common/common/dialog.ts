export type dialogCallback = {
  title?: string;
  callback?: Function;
  isHidden?: boolean;
  type?: string;
};

export type dialogOptions = {
  title: string;
  description?: string;
  onConfirm?: dialogCallback;
  onDecline?: dialogCallback;
  additionalActions?: dialogCallback[];
};
