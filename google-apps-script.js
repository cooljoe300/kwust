/**
 * Google Apps Script for KWUSO Voting Form
 * This script receives form submissions and writes them to Google Sheets
 * and sends email notifications when submissions are received
 * 
 * SETUP INSTRUCTIONS:
 * 1. Replace 'YOUR_SHEET_ID_HERE' below with your actual Google Sheet ID
 * 2. Update NOTIFICATION_EMAIL if you want to change the email address
 * 3. Deploy this script as a Web App (Deploy → New deployment → Web app)
 * 4. Set "Who has access" to "Anyone"
 * 5. Authorize email permissions when prompted
 * 6. Copy the Web App URL and use it in your index.html file
 */

// ============================================
// CONFIGURATION - UPDATE THIS!
// ============================================
const SHEET_ID = '1143CqTT_kET1iB09qkNL7YXkEi-ggUCrOgDIr4xLJVA'; // Replace with your Google Sheet ID
const SHEET_NAME = 'Sheet1'; // Change if your sheet tab has a different name
const NOTIFICATION_EMAIL = 'jonmuhoro@gmail.com'; // Email to receive submission notifications

// ============================================
// MAIN FUNCTION - DO NOT EDIT BELOW
// ============================================

/**
 * Main function that handles POST requests from the voting form
 */
function doPost(e) {
  try {
    // Check if SHEET_ID is configured
    if (!SHEET_ID || SHEET_ID === 'YOUR_SHEET_ID_HERE') {
      throw new Error('SHEET_ID is not configured. Please update the SHEET_ID constant in the script with your actual Google Sheet ID.');
    }
    
    // Check if data was received
    if (!e) {
      throw new Error('Request object (e) is undefined. This might be a GET request - use POST to submit votes.');
    }
    
    // Log request details for debugging
    Logger.log('=== Request Debug Info ===');
    Logger.log('Request object exists: ' + (e ? 'yes' : 'no'));
    Logger.log('postData exists: ' + (e.postData ? 'yes' : 'no'));
    Logger.log('parameter exists: ' + (e.parameter ? 'yes' : 'no'));
    
    if (e.postData) {
      Logger.log('postData.type: ' + e.postData.type);
      Logger.log('postData.contents exists: ' + (e.postData.contents ? 'yes' : 'no'));
      Logger.log('postData.contents length: ' + (e.postData.contents ? e.postData.contents.length : 0));
      if (e.postData.contents && e.postData.contents.length > 0) {
        Logger.log('postData.contents preview: ' + e.postData.contents.substring(0, 200));
      }
    }
    
    // Check for data in postData.contents (standard POST)
    let requestData = null;
    if (e.postData && e.postData.contents) {
      requestData = e.postData.contents;
    } else if (e.parameter && Object.keys(e.parameter).length > 0) {
      // Sometimes data comes as parameters (form-encoded)
      requestData = JSON.stringify(e.parameter);
      Logger.log('Using parameter data instead of postData');
    } else {
      // Return a helpful error message
      Logger.log('ERROR: No data found in request');
      return ContentService
        .createTextOutput(JSON.stringify({
          'status': 'error',
          'message': 'No data received in the request. Make sure you are sending a POST request with JSON data.',
          'help': 'This endpoint requires a POST request with JSON body. If testing in browser, use the form on your website.',
          'debug': {
            'hasPostData': !!e.postData,
            'hasParameter': !!e.parameter,
            'postDataType': e.postData ? e.postData.type : 'none'
          }
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parse the incoming data
    let data;
    try {
      data = JSON.parse(requestData);
      Logger.log('Successfully parsed JSON data');
      Logger.log('Data keys: ' + Object.keys(data).join(', '));
    } catch (parseError) {
      Logger.log('JSON parse error: ' + parseError.toString());
      Logger.log('Raw data: ' + requestData);
      throw new Error('Invalid JSON data received: ' + parseError.toString() + '. Raw data: ' + requestData.substring(0, 200));
    }
    
    // Open the Google Sheet
    let sheet;
    try {
      const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
      sheet = spreadsheet.getSheetByName(SHEET_NAME);
      if (!sheet) {
        throw new Error('Sheet "' + SHEET_NAME + '" not found. Please check that the sheet tab name matches SHEET_NAME constant.');
      }
    } catch (sheetError) {
      if (sheetError.toString().includes('Cannot find')) {
        throw new Error('Cannot find Google Sheet with ID: ' + SHEET_ID + '. Please verify the Sheet ID is correct.');
      }
      throw new Error('Error accessing Google Sheet: ' + sheetError.toString());
    }
    
    // Prepare the row data in the correct order
    // Handle both old and new category name formats for backward compatibility
    const leaderVote = data['Best Student Leader KWUSO 24/25'] || 
                       data['Best Student Leader 24/25'] || 
                       '';
    
    const rowData = [
      new Date(), // Timestamp
      leaderVote,
      data['Best Captain Sports'] || '',
      data['Best Sports Team'] || '',
      data['Best Influencer'] || '',
      data['Miss Popularity 25/26'] || '',
      data['User Agent'] || ''
    ];
    
    // Append the row to the sheet
    try {
      sheet.appendRow(rowData);
    } catch (appendError) {
      throw new Error('Error writing to sheet: ' + appendError.toString() + '. Please check sheet permissions.');
    }
    
    // Send email notification
    try {
      sendEmailNotification(data, rowData);
    } catch (emailError) {
      // Log email error but don't fail the submission
      console.error('Email notification failed:', emailError);
      // Note: We continue even if email fails
    }
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Vote submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging in Apps Script
    console.error('doPost error:', error);
    Logger.log('Error details: ' + JSON.stringify({
      message: error.message,
      stack: error.stack,
      toString: error.toString()
    }));
    
    // Return detailed error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString(),
        'errorDetails': error.message || error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Sends email notification when a new submission is received
 */
function sendEmailNotification(data, rowData) {
  const timestamp = rowData[0];
  const leaderVote = rowData[1];
  const captainVote = rowData[2];
  const teamVote = rowData[3];
  const influencerVote = rowData[4];
  const popularityVote = rowData[5];
  const userAgent = rowData[6] || 'Not provided';
  
  const subject = 'New KWUSO Voting Submission Received';
  
  const htmlBody = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2c3e50;">New Voting Submission</h2>
        <p>A new vote has been submitted to your KWUSO Voting Form.</p>
        
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c3e50;">Submission Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 200px;">Timestamp:</td>
              <td style="padding: 8px;">${timestamp}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Best Student Leader KWUSO 24/25:</td>
              <td style="padding: 8px;">${leaderVote || 'Not selected'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Best Captain Sports:</td>
              <td style="padding: 8px;">${captainVote || 'Not selected'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Best Sports Team:</td>
              <td style="padding: 8px;">${teamVote || 'Not selected'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Best Influencer:</td>
              <td style="padding: 8px;">${influencerVote || 'Not selected'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Miss Popularity 25/26:</td>
              <td style="padding: 8px;">${popularityVote || 'Not selected'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">User Agent:</td>
              <td style="padding: 8px; font-size: 0.9em;">${userAgent}</td>
            </tr>
          </table>
        </div>
        
        <p style="color: #7f8c8d; font-size: 0.9em;">
          This is an automated notification from your KWUSO Voting Form.
        </p>
      </body>
    </html>
  `;
  
  const plainBody = `
New KWUSO Voting Submission Received

A new vote has been submitted to your KWUSO Voting Form.

Submission Details:
- Timestamp: ${timestamp}
- Best Student Leader KWUSO 24/25: ${leaderVote || 'Not selected'}
- Best Captain Sports: ${captainVote || 'Not selected'}
- Best Sports Team: ${teamVote || 'Not selected'}
- Best Influencer: ${influencerVote || 'Not selected'}
- Miss Popularity 25/26: ${popularityVote || 'Not selected'}
- User Agent: ${userAgent}

This is an automated notification from your KWUSO Voting Form.
  `;
  
  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: subject,
    htmlBody: htmlBody,
    body: plainBody
  });
}

/**
 * Test function - you can run this to verify the script works
 * Run this from Apps Script editor: Run → doGet
 * Or visit the script URL directly in browser (sends GET request)
 */
function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'diagnostics';
  
  try {
    if (action === 'stats') {
      const stats = getVoteStatistics();
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'success',
          updatedAt: new Date().toISOString(),
          data: stats
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Default: diagnostics text output
    const diagnostics = runDiagnostics();
    
    let output = 'KWUSO Voting Form Handler is active!\n\n';
    output += '=== DIAGNOSTICS ===\n';
    output += diagnostics;
    output += '\n\n=== NOTE ===\n';
    output += 'Use action=stats (e.g., ?action=stats) to fetch live vote totals as JSON.\n';
    output += 'To record votes, send a POST request with JSON data from the voting form.';
    
    return ContentService
      .createTextOutput(output)
      .setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    if (action === 'stats') {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: error.toString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService
      .createTextOutput('Handler is active but diagnostics failed: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

/**
 * Returns aggregated vote counts for all categories
 */
function getVoteStatistics() {
  if (!SHEET_ID || SHEET_ID === 'YOUR_SHEET_ID_HERE') {
    throw new Error('SHEET_ID is not configured. Update the SHEET_ID constant to use stats.');
  }
  
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    throw new Error('Sheet "' + SHEET_NAME + '" not found. Please verify SHEET_NAME constant.');
  }
  
  const values = sheet.getDataRange().getValues();
  const categories = {
    leader: {},
    captain: {},
    team: {},
    influencer: {},
    popularity: {}
  };
  
  let totalVotes = 0;
  
  if (values.length > 1) {
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      if (!row || row.length < 6) {
        continue;
      }
      
      const leader = row[1];
      const captain = row[2];
      const team = row[3];
      const influencer = row[4];
      const popularity = row[5];
      
      const hasAnyVote = [leader, captain, team, influencer, popularity].some(value => value && value.toString().trim() !== '');
      if (!hasAnyVote) {
        continue;
      }
      
      totalVotes++;
      incrementVoteCount(categories.leader, leader);
      incrementVoteCount(categories.captain, captain);
      incrementVoteCount(categories.team, team);
      incrementVoteCount(categories.influencer, influencer);
      incrementVoteCount(categories.popularity, popularity);
    }
  }
  
  return {
    totalVotes: totalVotes,
    categories: categories
  };
}

function incrementVoteCount(categoryMap, value) {
  if (!value || typeof value !== 'string') {
    return;
  }
  
  const key = value.trim();
  if (!key) {
    return;
  }
  
  categoryMap[key] = (categoryMap[key] || 0) + 1;
}

/**
 * Diagnostic function to check script configuration
 * Run this manually from Apps Script editor to troubleshoot issues
 */
function runDiagnostics() {
  let results = [];
  
  // Check SHEET_ID
  if (!SHEET_ID || SHEET_ID === 'YOUR_SHEET_ID_HERE') {
    results.push('❌ SHEET_ID: Not configured (still set to placeholder)');
  } else {
    try {
      const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
      results.push('✅ SHEET_ID: Valid and accessible');
      
      // Check sheet name
      const sheet = spreadsheet.getSheetByName(SHEET_NAME);
      if (sheet) {
        results.push('✅ SHEET_NAME: "' + SHEET_NAME + '" found');
      } else {
        results.push('❌ SHEET_NAME: "' + SHEET_NAME + '" not found');
        const sheetNames = spreadsheet.getSheets().map(s => s.getName());
        results.push('   Available sheets: ' + sheetNames.join(', '));
      }
    } catch (error) {
      results.push('❌ SHEET_ID: Cannot access sheet - ' + error.toString());
    }
  }
  
  // Check email configuration
  if (NOTIFICATION_EMAIL && NOTIFICATION_EMAIL.includes('@')) {
    results.push('✅ NOTIFICATION_EMAIL: Configured (' + NOTIFICATION_EMAIL + ')');
  } else {
    results.push('⚠️ NOTIFICATION_EMAIL: May not be configured correctly');
  }
  
  // Check MailApp permissions (try to get quota)
  try {
    const remainingQuota = MailApp.getRemainingDailyQuota();
    results.push('✅ Email permissions: Authorized (Remaining quota: ' + remainingQuota + ')');
  } catch (error) {
    results.push('❌ Email permissions: Not authorized - ' + error.toString());
    results.push('   → Run any function and authorize permissions');
  }
  
  return results.join('\n');
}

/**
 * SETUP FUNCTION - Run this once to create/configure your Google Sheet
 * 
 * INSTRUCTIONS:
 * 1. Make sure SHEET_ID is set correctly above
 * 2. In Apps Script editor, click "Run" → Select "setupGoogleSheet"
 * 3. Authorize permissions if prompted
 * 4. Check your Google Sheet - headers should be created in Row 1
 */
function setupGoogleSheet() {
  try {
    // Check if SHEET_ID is configured
    if (!SHEET_ID || SHEET_ID === 'YOUR_SHEET_ID_HERE') {
      throw new Error('Please set SHEET_ID first (line 18)');
    }
    
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    
    // Get or create the sheet
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      // Create the sheet if it doesn't exist
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      Logger.log('Created new sheet: ' + SHEET_NAME);
    } else {
      Logger.log('Using existing sheet: ' + SHEET_NAME);
    }
    
    // Clear existing data in Row 1 (if any)
    sheet.getRange(1, 1, 1, 7).clear();
    
    // Set up headers in Row 1
    const headers = [
      'Timestamp',
      'Best Student Leader KWUSO 24/25',
      'Best Captain Sports',
      'Best Sports Team',
      'Best Influencer',
      'Miss Popularity 25/26',
      'User Agent'
    ];
    
    // Write headers to Row 1
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format header row (make it bold and add background color)
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4'); // Google blue
    headerRange.setFontColor('#ffffff'); // White text
    headerRange.setHorizontalAlignment('center');
    
    // Auto-resize columns to fit content
    sheet.autoResizeColumns(1, headers.length);
    
    // Freeze header row
    sheet.setFrozenRows(1);
    
    // Set data validation for timestamp column (optional - ensures proper date format)
    const timestampRange = sheet.getRange(2, 1, 1000, 1);
    // No validation needed - we'll use Date objects
    
    Logger.log('✅ Google Sheet setup complete!');
    Logger.log('Headers created in Row 1:');
    headers.forEach((header, index) => {
      Logger.log('  ' + String.fromCharCode(65 + index) + '1: ' + header);
    });
    
    return 'Sheet setup complete! Headers created in Row 1.';
    
  } catch (error) {
    Logger.log('❌ Error setting up sheet: ' + error.toString());
    throw error;
  }
}

/**
 * VERIFY SETUP - Run this to check if your sheet is configured correctly
 */
function verifySheetSetup() {
  try {
    if (!SHEET_ID || SHEET_ID === 'YOUR_SHEET_ID_HERE') {
      return '❌ SHEET_ID is not configured';
    }
    
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return '❌ Sheet "' + SHEET_NAME + '" not found';
    }
    
    // Check headers
    const headers = sheet.getRange(1, 1, 1, 7).getValues()[0];
    const expectedHeaders = [
      'Timestamp',
      'Best Student Leader KWUSO 24/25',
      'Best Captain Sports',
      'Best Sports Team',
      'Best Influencer',
      'Miss Popularity 25/26',
      'User Agent'
    ];
    
    let results = [];
    results.push('✅ Sheet found: ' + SHEET_NAME);
    results.push('✅ Sheet ID: ' + SHEET_ID);
    results.push('');
    results.push('Header Check:');
    
    let allCorrect = true;
    for (let i = 0; i < expectedHeaders.length; i++) {
      const cell = String.fromCharCode(65 + i) + '1';
      const expected = expectedHeaders[i];
      const actual = headers[i] || '(empty)';
      
      if (actual === expected) {
        results.push('  ✅ ' + cell + ': ' + actual);
      } else {
        results.push('  ❌ ' + cell + ': Expected "' + expected + '", found "' + actual + '"');
        allCorrect = false;
      }
    }
    
    if (allCorrect) {
      results.push('');
      results.push('✅ All headers are correct!');
    } else {
      results.push('');
      results.push('⚠️ Some headers are incorrect. Run setupGoogleSheet() to fix.');
    }
    
    return results.join('\n');
    
  } catch (error) {
    return '❌ Error: ' + error.toString();
  }
}

