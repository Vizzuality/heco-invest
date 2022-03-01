import fs from 'fs/promises';
import path from 'path';

type LoadI18nMessagesProps = {
  locale: string;
};

type MessageConfig = { [key: string]: string };

export async function loadI18nMessages({ locale }: LoadI18nMessagesProps): Promise<MessageConfig> {
  const languagePath = path.join(process.cwd(), `lang/compiled/${locale}.json`);
  try {
    const contents = await fs.readFile(languagePath, 'utf-8');
    return JSON.parse(contents);
  } catch (error) {
    console.info('Could not load the language files. Please run "yarn i18n:compile" first"');
    console.error(error);
  }
}
