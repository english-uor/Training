// gasApi.js  — drop-in replacement for google.script.run
// ─────────────────────────────────────────────────────────────────────────────
// REPLACE THIS URL with your actual deployed Web App URL from Step 2:
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbzUmepfvfHulf5LdZlhMhtNLWye1cu1i-1LAuRrHfG_EaIpeTByp8k7UdLl9kzSY8BT/exec";
// ─────────────────────────────────────────────────────────────────────────────

async function gasCall(action, params = {}) {
  const response = await fetch(GAS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },  // Must be text/plain to avoid CORS preflight
    body: JSON.stringify({ action, ...params })
  });
  if (!response.ok) throw new Error("Network error: " + response.status);
  const json = await response.json();
  if (!json.success) throw new Error(json.error || "API error");
  return json.data;
}

// Convenience wrappers — same names as your original google.script.run calls:
const GasAPI = {
  verifyAdminCode:           (code)                         => gasCall("verifyAdminCode",           { code }),
  getAdminSettings:          ()                             => gasCall("getAdminSettings"),
  toggleAdminSetting:        (settingType, status)          => gasCall("toggleAdminSetting",         { settingType, status }),
  updateAppIcon:             (url)                          => gasCall("updateAppIcon",              { url }),
  getModulesList:            (shift)                        => gasCall("getModulesList",             { shift }),
  authenticateTeacher:       (shift, code)                  => gasCall("authenticateTeacher",        { shift, code }),
  getRoster:                 (shift, year, group, moduleName) => gasCall("getRoster",               { shift, year, group, moduleName }),
  submitAttendance:          (payload)                      => gasCall("submitAttendance",           payload),
  calculateAbsenceMetrics:   (shift)                        => gasCall("calculateAbsenceMetrics",    { shift }),
  addPermittedStudent:       (payload)                      => gasCall("addPermittedStudent",        payload),
  getPermittedStudents:      (shift)                        => gasCall("getPermittedStudents",       { shift }),
  getAbsenceSummary:         (shift)                        => gasCall("getAbsenceSummary",          { shift }),
  submitSystemEntity:        (shift, sheetName, rowData)    => gasCall("submitSystemEntity",         { shift, sheetName, rowData }),
  runTeacherAudit:           (shift)                        => gasCall("runTeacherAudit",            { shift }),
  runMissingSubmissionsAudit:(shift, targetDateStr)         => gasCall("runMissingSubmissionsAudit", { shift, targetDateStr }),
};
