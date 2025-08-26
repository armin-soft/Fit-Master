
console.log('Clearing all login data manually...');
async function clearAll() {
  try {
    const { removeStorageItem } = await import('./src/utils/databaseStorage.js');
    await removeStorageItem('loginStep');
    await removeStorageItem('isLoggedIn');
    await removeStorageItem('rememberMeExpiry');
    console.log('All login data cleared!');
    window.location.reload();
  } catch (e) {
    console.error('Error:', e);
  }
}
clearAll();

