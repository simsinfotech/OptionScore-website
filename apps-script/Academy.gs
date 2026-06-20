/**
 * OptionScore Academy — enquiry sheet endpoint.
 *
 * Deploy this bound to the Academy enquiries spreadsheet:
 *   https://docs.google.com/spreadsheets/d/1YUMlqAMlG7t--I7gi-lalpL-u49w8dUgRmmToRdCQLQ/edit
 *   Open that sheet ▸ Extensions ▸ Apps Script ▸ paste this file ▸
 *   Deploy ▸ New deployment ▸ Web app:
 *     - Execute as:  Me
 *     - Who has access:  Anyone
 *   Copy the resulting /exec URL into APPS_SCRIPT_URL_ACADEMY in your env
 *   (locally in .env.local and in Vercel project settings).
 *
 * SHARED_TOKEN below must match APPS_SCRIPT_TOKEN in your env (same value the
 * masterclass/workshop scripts use — one token across all deployments).
 *
 * Handles one POST action (JSON body):
 *   { action: "enquiry", token, name, mobile, email, course, format, query, source }
 *
 * Append-only: one row per enquiry submission.
 */

var SHARED_TOKEN = "osmc_cc6f342607ce4bd7bc316b1d61cb9d89487f3442d126"; // must match APPS_SCRIPT_TOKEN
var SHEET_NAME = "Enquiries";

var HEADERS = [
  "Timestamp",
  "Name",
  "Mobile",
  "Email",
  "Course Interest",
  "Preferred Format",
  "Query",
  "Source",
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var body = JSON.parse(e.postData.contents);

    if (body.token !== SHARED_TOKEN) {
      return json({ ok: false, error: "unauthorized" });
    }
    if (body.action !== "enquiry") {
      return json({ ok: false, error: "unknown action" });
    }

    var sheet = getSheet();
    sheet.appendRow([
      new Date(),
      body.name || "",
      normalizeMobile(body.mobile),
      body.email || "",
      body.course || "",
      body.format || "",
      body.query || "",
      body.source || "",
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function normalizeMobile(m) {
  return String(m || "").replace(/\D/g, "").slice(-10);
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
