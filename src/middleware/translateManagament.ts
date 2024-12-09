import config from '../config.json';

interface Config {
  currencyUpdateTimeInSeconds: number;
  requestTimeOutInSeconds: number;
  translate: {
    message_aboutUs: Array<{
      PL: string;
      EN: string;
    }>,
    message_needHelp: Array<{
      PL: string;
      EN: string;
    }>;
  };
}

const TranslateProcess = (name: keyof Config['translate'], language: string): string => {
  const appConfig: Config = config as Config;
  const translation = appConfig.translate[name]?.[0];

  if (!translation) return '';

  if (language === 'PL') {
    return translation['PL'];  
  } else {
    return translation['EN']; 
  }
};

export default TranslateProcess;
