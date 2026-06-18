/**
 * OptionScore — Masterclass funnel sheet endpoint.
 *
 * Deploy as a Web App (Deploy ▸ New deployment ▸ Web app):
 *   - Execute as:  Me
 *   - Who has access:  Anyone
 * Copy the resulting /exec URL into APPS_SCRIPT_URL in your env.
 *
 * Set SHARED_TOKEN below to the same value as APPS_SCRIPT_TOKEN in your env.
 *
 * Handles two POST actions (JSON body):
 *   { action: "reserve", token, name, mobile, email, experience, source }
 *   { action: "paid",    token, mobile, paymentId, amount, emailSent }
 *
 * One row per person, keyed by mobile (upsert). Stage goes Reserved -> Paid.
 */

var SHARED_TOKEN = "osmc_cc6f342607ce4bd7bc316b1d61cb9d89487f3442d126"; // must match APPS_SCRIPT_TOKEN
var SHEET_NAME = "Leads";

var HEADERS = [
  "Timestamp",
  "Name",
  "Mobile",
  "Email",
  "Experience",
  "Stage",
  "Razorpay Payment ID",
  "Amount",
  "Source",
  "Email Sent",
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var body = JSON.parse(e.postData.contents);

    if (body.token !== SHARED_TOKEN) {
      return json({ ok: false, error: "unauthorized" });
    }

    var sheet = getSheet();

    if (body.action === "reserve") {
      return json(handleReserve(sheet, body));
    }
    if (body.action === "paid") {
      return json(handlePaid(sheet, body));
    }
    return json({ ok: false, error: "unknown action" });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function handleReserve(sheet, body) {
  var mobile = normalizeMobile(body.mobile);
  var rowIndex = findRowByMobile(sheet, mobile);

  if (rowIndex === -1) {
    sheet.appendRow([
      new Date(),
      body.name || "",
      mobile,
      body.email || "",
      body.experience || "",
      "Reserved",
      "",
      "",
      body.source || "",
      "",
    ]);
  } else {
    // Already exists — refresh details but keep Stage if already Paid.
    var stageCell = sheet.getRange(rowIndex, 6);
    if (stageCell.getValue() !== "Paid") stageCell.setValue("Reserved");
    sheet.getRange(rowIndex, 2).setValue(body.name || "");
    sheet.getRange(rowIndex, 4).setValue(body.email || "");
    sheet.getRange(rowIndex, 5).setValue(body.experience || "");
    if (body.source) sheet.getRange(rowIndex, 9).setValue(body.source);
  }
  return { ok: true };
}

function handlePaid(sheet, body) {
  var mobile = normalizeMobile(body.mobile);
  var rowIndex = findRowByMobile(sheet, mobile);

  if (rowIndex === -1) {
    // No reserve row (edge case) — create a Paid row directly.
    sheet.appendRow([
      new Date(),
      body.name || "",
      mobile,
      body.email || "",
      body.experience || "",
      "Paid",
      body.paymentId || "",
      body.amount || "",
      body.source || "",
      body.emailSent ? "Yes" : "",
    ]);
    return { ok: true, created: true };
  }

  sheet.getRange(rowIndex, 6).setValue("Paid");
  sheet.getRange(rowIndex, 7).setValue(body.paymentId || "");
  sheet.getRange(rowIndex, 8).setValue(body.amount || "");
  if (body.emailSent) sheet.getRange(rowIndex, 10).setValue("Yes");
  return { ok: true };
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

function findRowByMobile(sheet, mobile) {
  var last = sheet.getLastRow();
  if (last < 2) return -1;
  var values = sheet.getRange(2, 3, last - 1, 1).getValues(); // column C = Mobile
  for (var i = 0; i < values.length; i++) {
    if (normalizeMobile(values[i][0]) === mobile) return i + 2;
  }
  return -1;
}

function normalizeMobile(m) {
  return String(m || "").replace(/\D/g, "").slice(-10);
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
