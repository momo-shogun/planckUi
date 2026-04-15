import type { TextInputProps, TextStyle, ViewStyle } from 'react-native';

export type ComposerChip = {
  id: string;
  label: string;
  count?: number;
};

export interface ComposerInputProps
  extends Pick<TextInputProps, 'testID' | 'accessibilityLabel' | 'keyboardType' | 'returnKeyType'> {
  value?: string;
  defaultValue?: string;
  onChangeText?: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;

  chips?: ComposerChip[];
  onPressAdd?: () => void;
  onPressChip?: (chipId: string) => void;
  onPressMic?: () => void;
  onPressSend?: (text: string) => void;

  /**
   * When true, hides the mic button.
   */
  hideMic?: boolean;

  /**
   * Override send enabled state. By default it's enabled when text is non-empty.
   */
  sendEnabled?: boolean;

  slots?: {
    root?: ViewStyle;
    input?: ViewStyle & TextStyle;
    chip?: ViewStyle;
    chipText?: TextStyle;
    chipCountText?: TextStyle;
  };
}

