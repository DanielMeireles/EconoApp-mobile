import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      background: string;

      headerBackground: string;
      headerPrimaryText: string;
      headerSecondaryText: string;
      headerElement: string;

      inputBackground: string;
      inputText: string;
      inputPlaceholder: string;
      inputIcon: string;
      inputFocused: string;
      inputError: string;

      cardBackground: string;
      cardTitle: string;
      cardText: string;
      cardElement: string;

      primaryText: string;
      secondaryText: string;
      tertiaryText: string;

      buttonBackground: string;
      buttonText: string;
      buttonIcon: string;

      calendarPrimary: string;
      calendarSecondary: string;
      calendarSelected: string;
      calendarTextPrimary: string;
      calendarTextSecondary: string;
      calendarTextSelected: string;
    };

    fonts: {
      regular: string;
      medium: string;
    };
  }
}
