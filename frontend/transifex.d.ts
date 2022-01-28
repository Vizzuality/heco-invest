interface Window {
  // Types copied from:
  // https://docs.transifex.com/live/api#transifex-live-javascript-code
  liveSettings: {
    /** Transifex' API key */
    api_key: string;
    /**
     * Enable the auto-detection of the user's language or provide a custom method that returns
     * the language code
     */
    detectlang?: boolean | (() => string);
    /**
     * Position of the language selector or ID of the container (e.g. `#container`). To disable,
     * update Transifex' settings on the online platform.
     */
    picker?: string;
    /** Version of the content */
    version?: string;
    autocollect?: boolean;
    dynamic?: boolean;
    /** Mark this server as being a staging one */
    staging?: boolean;
    /** Enable additional XSS protection */
    xss_protect?: boolean;
    parse_attr?: string[];
    ignore_tags?: string[];
    ignore_class?: string[];
  };
  Transifex: {
    live: {
      /** Check if a language code exists */
      hasLanguageCode: (lang_code: string) => boolean;
      /** Check if the target language code exists */
      hasTargetLanguage: (lang_code: string) => boolean;
      /** Get the source language */
      getSourceLanguage: () => { name: string; code: string; source?: boolean };
      /** Get the name of a language based on its code */
      getLanguageName: (lang_code: string) => string;
      /** Get the list of languages supported by the site */
      getAllLanguages: () => { name: string; code: string; source?: boolean }[];
      /** Check if a language code has a fuzzy match (e.g. `de` and `de_DE` will be the same) */
      matchLanguageCode: (lang_code: string) => string;
      /** Normalize language code to match the `xx_YY@ZZ` pattern */
      normalizeLangCode: (lang_code: string) => string;
      /** Get the guessed language code of the user */
      detectLanguage: () => string;
      /** Get the currectly selected language code */
      getSelectedLanguageCode: () => string;
      /** Translate the page to the target language code */
      translateTo: (lang_code: string) => void;
      /** Manually translate a specific DOM element */
      translateNode: (node: HTMLElement) => void;
      /** Manually translate a list of DOM elements */
      translateNodes: (nodes: HTMLElement[]) => void;
      /** Manually translate a text fragment */
      translateText: (text: string, variables?: Record<string, string>) => string;
      /**
       * Unbind a callback
       */
      unBind: (cb: () => void) => void;
      /**
       * Handler executed when Transifex Live has loaded. `load_msec` contains the time in milliseconds
       * it took to initialize.
       */
      onReady: (cb: (load_msec: number) => void) => void;
      /**
       * Handler triggered when the available languages have been downloaded. The callback receives the
       * list of languages supported by the site.
       */
      onFetchLanguages: (
        cb: (languages: { name: string; code: string; source?: boolean }[]) => void
      ) => void;
      /**
       * Handler executed when the page has been translated. `language_code` is the language code the
       * page has been translated into.
       */
      onTranslatePage: (language_code: string) => void;
      /**
       * Handler executed when the Transifex has detected some dynamic content or when
       * `Transifex.live.translateNode` or `Transifex.live.translateNodes` have been called.
       */
      onDynamicContent: (new_strings: any) => void;
      /**
       * Handler executed when an error has occured.
       */
      onError: (err: any) => void;
    };
  };
}
