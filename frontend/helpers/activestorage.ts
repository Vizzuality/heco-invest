const activeStorage = {
  DirectUpload: typeof window !== 'undefined' ? require('activestorage') : null,
};

export default activeStorage;
