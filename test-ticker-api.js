const fs = require('fs').promises;
const path = require('path');

const testTickerAPI = async () => {
  try {
    // Test reading the file first
    const filePath = path.join(__dirname, 'src/data/tickerMessages.json');
    console.log('Testing file access...');
    
    // Test reading
    const data = await fs.readFile(filePath, 'utf8');
    console.log('✅ Successfully read tickerMessages.json');
    
    // Test writing
    await fs.writeFile(filePath, data, 'utf8');
    console.log('✅ Successfully wrote to tickerMessages.json');
    
    console.log('\nFile permissions appear to be correct.');
    console.log('If you\'re still having issues, please check:');
    console.log('1. The Next.js server has write permissions to the file');
    console.log('2. The file is not locked by another process');
    console.log('3. The file path is correct and accessible');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nPossible solutions:');
    console.log('1. Make sure the file exists at the specified path');
    console.log('2. Check file permissions (run as administrator if needed)');
    console.log('3. Ensure no other program is using the file');
  }
};

testTickerAPI();
