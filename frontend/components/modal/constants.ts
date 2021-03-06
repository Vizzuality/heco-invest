export const COMMON_CONTENT_CLASSES =
  'absolute top-1/2 inset-x-4 sm:left-1/2 transform -translate-y-1/2 sm:-translate-x-1/2 outline-none bg-white flex flex-col flex-grow overflow-hidden rounded-lg shadow-2xl';

export const CONTENT_CLASSES = {
  narrow: `sm:w-4/6 md:w-1/2 lg:w-5/12 xl:w-1/3 ${COMMON_CONTENT_CLASSES}`,
  default: `sm:w-4/5 md:w-2/3 lg:1/2 xl:w-5/12 ${COMMON_CONTENT_CLASSES}`,
  wide: `sm:w-10/12 md:w-10/12 lg:w-10/12 xl:w-8/12 ${COMMON_CONTENT_CLASSES}`,
};

export const THEME_CLASSES = {
  default: 'pt-12 md:pt-14 pb-8 px-4 md:px-10',
  naked: '',
};

export const OVERLAY_CLASSES = 'z-50 fixed inset-0 bg-black bg-blur';
